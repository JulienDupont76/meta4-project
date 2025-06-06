// ===== INCLUDE E CONFIGURAZIONI =====
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Configurazione WiFi
#define WIFI_SSID "S23 di Marco"
#define WIFI_PASSWORD "password"

// Configurazione Firebase (stesso stile della camera)
const char* FIREBASE_HOST = "esp32device-2fe39-default-rtdb.asia-southeast1.firebasedatabase.app";
const char* FIREBASE_AUTH = ""; // Lascia vuoto per ora (regole aperte)
const char* FIREBASE_PATH_DATA = "/esp32-wroom/data"; // Percorso dati sensori
const char* FIREBASE_PATH_STATUS = "/esp32-wroom/status"; // Stato corrente

// Pin sensori
#define FSR_PIN 34        // Sensore pressione su GPIO34
#define TRIG_PIN 2        // HC-SR04 TRIG su D2
#define ECHO_PIN 4        // HC-SR04 ECHO su D4

// Soglie
#define PRESSURE_THRESHOLD 500   // Soglia per considerare "occupied"
#define DISTANCE_MIN 5           // Distanza minima in cm
#define DISTANCE_MAX 200         // Distanza massima in cm

// Variabili timing
unsigned long lastSensorRead = 0;
unsigned long lastStatusUpdate = 0;
const unsigned long SENSOR_INTERVAL = 30000; // 30 secondi per dati
const unsigned long STATUS_INTERVAL = 15000; // 15 secondi per stato

void setup() {
  Serial.begin(115200);
  Serial.println("=== ESP32 Firebase Sensor Monitor (HTTP) ===");
  
  // Configura pin sensori
  pinMode(FSR_PIN, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  // Connessione WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connessione WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  
  Serial.println();
  Serial.print("Connesso! IP: ");
  Serial.println(WiFi.localIP());
  
  Serial.println("Sistema avviato! Comunicazione HTTP con Firebase.");
  Serial.println("Invio dati ogni 30 secondi...");
  
  // Invia stato iniziale
  sendStatusToFirebase();
}

void loop() {
  unsigned long currentTime = millis();
  
  // Verifica connessione WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Riconnessione WiFi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    delay(5000);
    return;
  }
  
  // Invia dati sensori ogni 30 secondi
  if (currentTime - lastSensorRead >= SENSOR_INTERVAL) {
    Serial.println("Lettura sensori...");
    if (sendSensorDataToFirebase()) {
      lastSensorRead = currentTime;
    } else {
      // Riprova tra 10 secondi se fallisce
      lastSensorRead = currentTime - 20000;
    }
  }
  
  // Aggiorna stato ogni 15 secondi
  if (currentTime - lastStatusUpdate >= STATUS_INTERVAL) {
    sendStatusToFirebase();
    lastStatusUpdate = currentTime;
  }
  
  delay(1000);
}

// ===== FUNZIONE LETTURA DISTANZA HC-SR04 =====
float readDistance() {
  // Pulisce il pin trigger
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  
  // Invia impulso trigger
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  // Legge il tempo di risposta
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // Timeout 30ms
  
  if (duration == 0) {
    return -1; // Errore o fuori range
  }
  
  // Calcola distanza in cm
  float distance = (duration * 0.034) / 2;
  
  // Filtra valori fuori range
  if (distance < DISTANCE_MIN || distance > DISTANCE_MAX) {
    return -1;
  }
  
  return distance;
}

// ===== FUNZIONE TIMESTAMP LEGGIBILE =====
String getCurrentTime() {
  unsigned long currentTime = millis();
  unsigned long seconds = currentTime / 1000;
  unsigned long minutes = seconds / 60;
  unsigned long hours = minutes / 60;
  
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  
  char timeStr[20];
  sprintf(timeStr, "%02lu:%02lu:%02lu", hours, minutes, seconds);
  return String(timeStr);
}

// ===== INVIO DATI SENSORI A FIREBASE (stile Camera) =====
bool sendSensorDataToFirebase() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi non connesso");
    return false;
  }
  
  // === LETTURA SENSORI ===
  int pressureValue = analogRead(FSR_PIN);
  float distance = readDistance();
  bool isOccupied = pressureValue > PRESSURE_THRESHOLD;
  
  // === STAMPA VALORI ===
  Serial.println("--- Lettura Sensori ---");
  Serial.printf("Pressione: %d (Soglia: %d)\n", pressureValue, PRESSURE_THRESHOLD);
  Serial.printf("Distanza: %.1f cm\n", distance);
  Serial.printf("Stato: %s\n", isOccupied ? "OCCUPIED" : "NOT OCCUPIED");
  Serial.println();
  
  HTTPClient http;
  
  // URL Firebase con timestamp come chiave (stesso stile della camera)
  String url = "https://" + String(FIREBASE_HOST) + FIREBASE_PATH_DATA + "/" + String(millis()) + ".json";
  if (strlen(FIREBASE_AUTH) > 0) {
    url += "?auth=" + String(FIREBASE_AUTH);
  }
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  // Crea JSON con tutti i dati (stesso stile della camera)
  DynamicJsonDocument doc(500);
  doc["timestamp"] = millis();
  doc["device_id"] = "ESP32-WROOM-SENSORS";
  doc["readable_time"] = getCurrentTime();
  
  // Dati sensori
  doc["pressure"] = pressureValue;
  doc["distance"] = distance;
  doc["status"] = isOccupied ? "occupied" : "not_occupied";
  doc["is_occupied"] = isOccupied;
  
  // Soglie e configurazione
  doc["pressure_threshold"] = PRESSURE_THRESHOLD;
  doc["distance_min"] = DISTANCE_MIN;
  doc["distance_max"] = DISTANCE_MAX;
  
  // Info sistema
  doc["wifi_rssi"] = WiFi.RSSI();
  doc["free_heap"] = ESP.getFreeHeap();
  doc["uptime_ms"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  int httpResponseCode = http.PUT(jsonString);
  
  bool success = false;
  if (httpResponseCode == 200 || httpResponseCode == 201) {
    Serial.println("✅ Dati sensori inviati!");
    Serial.println("  Pressione: " + String(pressureValue));
    Serial.println("  Distanza: " + String(distance) + " cm");
    Serial.println("  Stato: " + String(isOccupied ? "OCCUPIED" : "NOT OCCUPIED"));
    Serial.println("  Timestamp: " + String(millis()));
    success = true;
  } else {
    Serial.println("❌ Errore invio dati sensori:");
    Serial.println("HTTP Code: " + String(httpResponseCode));
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    }
  }
  
  http.end();
  return success;
}

// ===== INVIO STATO CORRENTE A FIREBASE =====
void sendStatusToFirebase() {
  if (WiFi.status() != WL_CONNECTED) return;
  
  // Lettura veloce per stato corrente
  int pressureValue = analogRead(FSR_PIN);
  float distance = readDistance();
  bool isOccupied = pressureValue > PRESSURE_THRESHOLD;
  
  HTTPClient http;
  String url = "https://" + String(FIREBASE_HOST) + FIREBASE_PATH_STATUS + ".json";
  if (strlen(FIREBASE_AUTH) > 0) {
    url += "?auth=" + String(FIREBASE_AUTH);
  }
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  // JSON stato corrente (stesso stile della camera)
  DynamicJsonDocument doc(400);
  doc["last_seen"] = millis();
  doc["readable_time"] = getCurrentTime();
  doc["ip_address"] = WiFi.localIP().toString();
  doc["wifi_rssi"] = WiFi.RSSI();
  doc["free_heap"] = ESP.getFreeHeap();
  doc["uptime_ms"] = millis();
  doc["device_status"] = "online";
  
  // Stato sensori corrente
  doc["current_pressure"] = pressureValue;
  doc["current_distance"] = distance;
  doc["current_occupancy"] = isOccupied ? "occupied" : "not_occupied";
  doc["is_currently_occupied"] = isOccupied;
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  int httpResponseCode = http.PUT(jsonString);
  if (httpResponseCode == 200 || httpResponseCode == 201) {
    Serial.println("🔄 Stato aggiornato");
  }
  
  http.end();
}

// ===== FUNZIONE TEST SENSORI =====
void testSensors() {
  Serial.println("=== TEST SENSORI ===");
  
  // Test pressione
  int pressure = analogRead(FSR_PIN);
  Serial.printf("Pressione FSR (GPIO34): %d\n", pressure);
  
  // Test distanza
  float dist = readDistance();
  if (dist > 0) {
    Serial.printf("Distanza HC-SR04: %.1f cm\n", dist);
  } else {
    Serial.println("Distanza HC-SR04: Errore lettura");
  }
  
  // Test stato
  bool occupied = pressure > PRESSURE_THRESHOLD;
  Serial.printf("Stato: %s\n", occupied ? "OCCUPIED" : "NOT OCCUPIED");
  
  Serial.println("========================\n");
}
