// ===== INCLUDE E CONFIGURAZIONI =====
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

//  WiFi Configuration
#define WIFI_SSID "S23 di Marco"
#define WIFI_PASSWORD "password"

// Firebase configuration
const char* FIREBASE_HOST = "esp32device-2fe39-default-rtdb.asia-southeast1.firebasedatabase.app";
const char* FIREBASE_AUTH = ""; // Open rules for tesing
const char* FIREBASE_PATH_DATA = "/esp32-wroom/data"; 
const char* FIREBASE_PATH_STATUS = "/esp32-wroom/status"; // Current status of ESP

// Pin sensori
#define FSR_PIN 34        
#define TRIG_PIN 2       
#define ECHO_PIN 4        

// Soglie
#define PRESSURE_THRESHOLD 500   
#define DISTANCE_MIN 5           
#define DISTANCE_MAX 200        

// Variabili timing
unsigned long lastSensorRead = 0;
unsigned long lastStatusUpdate = 0;
const unsigned long SENSOR_INTERVAL = 30000; // 30 seceonds for data
const unsigned long STATUS_INTERVAL = 15000; // 15 seconds for the status

void setup() {
  Serial.begin(115200);
  Serial.println("=== ESP32 Firebase Sensor Monitor (HTTP) ===");
  
  // Configura pin sensori
  pinMode(FSR_PIN, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  // Connessione WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connection to the WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  
  Serial.println();
  Serial.print("Connected! IP: ");
  Serial.println(WiFi.localIP());
  
  Serial.println("Sistem up! HTTP comm to Firebase.");
  Serial.println("Sending data each 30 sec...");
  
  // Invia stato iniziale
  sendStatusToFirebase();
}

void loop() {
  unsigned long currentTime = millis();
  
  // Verifica connessione WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Riconnection to the WiFi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    delay(5000);
    return;
  }
  
  // Invia dati sensori ogni 30 secondi
  if (currentTime - lastSensorRead >= SENSOR_INTERVAL) {
    Serial.println("Reading sensors...");
    if (sendSensorDataToFirebase()) {
      lastSensorRead = currentTime;
    } else {
     
      lastSensorRead = currentTime - 20000;
    }
  }
  
  
  if (currentTime - lastStatusUpdate >= STATUS_INTERVAL) {
    sendStatusToFirebase();
    lastStatusUpdate = currentTime;
  }
  
  delay(1000);
}


float readDistance() {
 
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // Timeout 30ms
  
  if (duration == 0) {
    return -1; // Errore o out of range
  }
  
 
  float distance = (duration * 0.034) / 2;
  

  if (distance < DISTANCE_MIN || distance > DISTANCE_MAX) {
    return -1;
  }
  
  return distance;
}

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

bool sendSensorDataToFirebase() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi non connesso");
    return false;
  }
  
  int pressureValue = analogRead(FSR_PIN);
  float distance = readDistance();
  bool isOccupied = pressureValue > PRESSURE_THRESHOLD;
  
  Serial.println("--- Sensori ---");
  Serial.printf("Pressure: %d (Soglia: %d)\n", pressureValue, PRESSURE_THRESHOLD);
  Serial.printf("Distance: %.1f cm\n", distance);
  Serial.printf("Status: %s\n", isOccupied ? "OCCUPIED" : "NOT OCCUPIED");
  Serial.println();
  
  HTTPClient http;
  
  // URL Firebase con timestamp come chiave (stesso stile della camera)
  String url = "https://" + String(FIREBASE_HOST) + FIREBASE_PATH_DATA + "/" + String(millis()) + ".json";
  if (strlen(FIREBASE_AUTH) > 0) {
    url += "?auth=" + String(FIREBASE_AUTH);
  }
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  // Create JSON as NOSQL
  DynamicJsonDocument doc(500);
  doc["timestamp"] = millis();
  doc["device_id"] = "ESP32-WROOM-SENSORS";
  doc["readable_time"] = getCurrentTime();
  
  // Data sensors
  doc["pressure"] = pressureValue;
  doc["distance"] = distance;
  doc["status"] = isOccupied ? "occupied" : "not_occupied";
  doc["is_occupied"] = isOccupied;
  
  // tresholds and settings
  doc["pressure_threshold"] = PRESSURE_THRESHOLD;
  doc["distance_min"] = DISTANCE_MIN;
  doc["distance_max"] = DISTANCE_MAX;
  
  // Info of the system
  doc["wifi_rssi"] = WiFi.RSSI();
  doc["free_heap"] = ESP.getFreeHeap();
  doc["uptime_ms"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  int httpResponseCode = http.PUT(jsonString);
  
  bool success = false;
  if (httpResponseCode == 200 || httpResponseCode == 201) {
    Serial.println("✅ Data sended!");
    Serial.println("  Pression: " + String(pressureValue));
    Serial.println("  Distance: " + String(distance) + " cm");
    Serial.println("  Status: " + String(isOccupied ? "OCCUPIED" : "NOT OCCUPIED"));
    Serial.println("  Timestamp: " + String(millis()));
    success = true;
  } else {
    Serial.println("Error in sending the data:");
    Serial.println("HTTP Code: " + String(httpResponseCode));
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    }
  }
  
  http.end();
  return success;
}

void sendStatusToFirebase() {
  if (WiFi.status() != WL_CONNECTED) return;
  
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
  

  DynamicJsonDocument doc(400);
  doc["last_seen"] = millis();
  doc["readable_time"] = getCurrentTime();
  doc["ip_address"] = WiFi.localIP().toString();
  doc["wifi_rssi"] = WiFi.RSSI();
  doc["free_heap"] = ESP.getFreeHeap();
  doc["uptime_ms"] = millis();
  doc["device_status"] = "online";

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

void testSensors() {
  Serial.println("=== TEST SENSORI ===");
  
  // Test pressure
  int pressure = analogRead(FSR_PIN);
  Serial.printf(" FSR (GPIO34): %d\n", pressure);
  
  // Test distance
  float dist = readDistance();
  if (dist > 0) {
    Serial.printf("Distance HC-SR04: %.1f cm\n", dist);
  } else {
    Serial.println("Distance HC-SR04: Errore lettura");
  }
  
  // Test stato
  bool occupied = pressure > PRESSURE_THRESHOLD;
  Serial.printf("Status: %s\n", occupied ? "OCCUPIED" : "NOT OCCUPIED");
  
  Serial.println("========================\n");
}
