#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <base64.h>
#include "esp_wpa2.h"

// Camera model selection
#define CAMERA_MODEL_AI_THINKER
#include "camera_pins.h"

// WiFi credentials
const char *ssid = "Welcome_KAIST";
const char *username = "marcomiglio";
const char *password = "QMzfcw3w!";

// Firebase configuration - INSERISCI QUI IL TUO URL
const char* FIREBASE_HOST = "esp32device-2fe39-default-rtdb.asia-southeast1.firebasedatabase.app"; // SOSTITUISCI CON IL TUO URL
const char* FIREBASE_AUTH = ""; // Lascia vuoto per ora (regole aperte)
const char* FIREBASE_PATH = "/esp32-camera/images"; // Percorso nel database

void connectToWPA2Enterprise() {
  WiFi.disconnect(true);
  WiFi.mode(WIFI_STA);
  
  esp_wifi_sta_wpa2_ent_set_identity((uint8_t *)username, strlen(username));
  esp_wifi_sta_wpa2_ent_set_username((uint8_t *)username, strlen(username));
  esp_wifi_sta_wpa2_ent_set_password((uint8_t *)password, strlen(password));
  esp_wifi_sta_wpa2_ent_enable();
  
  WiFi.begin(ssid);
  WiFi.setSleep(false);

  Serial.print("Connection to the WiFi");
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(1000);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nError: Connection WiFi error:");
  }
}

bool sendImageToFirebase() {
  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Error in capture the image");
    return false;
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected");
    esp_camera_fb_return(fb);
    return false;
  }

  HTTPClient http;
  
  // URL Firebase con timestamp come chiave
  String url = "https://" + String(FIREBASE_HOST) + FIREBASE_PATH + "/" + String(millis()) + ".json";
  if (strlen(FIREBASE_AUTH) > 0) {
    url += "?auth=" + String(FIREBASE_AUTH);
  }
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  // Converti immagine in base64
  String imageBase64 = base64::encode(fb->buf, fb->len);
  
  // Crea JSON
  DynamicJsonDocument doc(imageBase64.length() + 500);
  doc["timestamp"] = millis();
  doc["device_id"] = "ESP32-CAM-001";
  doc["image_size"] = fb->len;
  doc["image_format"] = "jpeg";
  doc["image_data"] = imageBase64;
  doc["wifi_rssi"] = WiFi.RSSI();
  doc["free_heap"] = ESP.getFreeHeap();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  int httpResponseCode = http.PUT(jsonString);
  
  bool success = false;
  if (httpResponseCode == 200 || httpResponseCode == 201) {
    Serial.println("Image sent!");
    Serial.println("  Dim: " + String(fb->len) + " bytes");
    Serial.println("  Timestamp: " + String(millis()));
    success = true;
  } else {
    Serial.println("Error in sending the image:");
    Serial.println("HTTP Code: " + String(httpResponseCode));
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    }
  }
  
  http.end();
  esp_camera_fb_return(fb);
  return success;
}

void sendStatusToFirebase() {
  if (WiFi.status() != WL_CONNECTED) return;
  
  HTTPClient http;
  String url = "https://" + String(FIREBASE_HOST) + "/esp32-camera/status.json";
  if (strlen(FIREBASE_AUTH) > 0) {
    url += "?auth=" + String(FIREBASE_AUTH);
  }
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  DynamicJsonDocument doc(300);
  doc["last_seen"] = millis();
  doc["ip_address"] = WiFi.localIP().toString();
  doc["wifi_rssi"] = WiFi.RSSI();
  doc["free_heap"] = ESP.getFreeHeap();
  doc["uptime_ms"] = millis();
  doc["status"] = "online";
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  http.PUT(jsonString);
  http.end();
}

void setup() {
  Serial.begin(115200);
  Serial.println("=== ESP32 Camera + Firebase ===");
  
  // Configurazione camera
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_SVGA; // 800x600
  config.pixel_format = PIXFORMAT_JPEG;
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  if (psramFound()) {
    config.jpeg_quality = 10;
    config.fb_count = 2;
    config.grab_mode = CAMERA_GRAB_LATEST;
  } else {
    config.frame_size = FRAMESIZE_CIF;
    config.fb_location = CAMERA_FB_IN_DRAM;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Error in initializating the camera: 0x%x\n", err);
    return;
  }

  sensor_t *s = esp_camera_sensor_get();
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1);
    s->set_brightness(s, 1);
    s->set_saturation(s, -2);
  }

  Serial.println("Camera initializated");

  // Connessione WiFi
  connectToWPA2Enterprise();
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("System done");
    Serial.println("Check the image on");
    Serial.println("https://console.firebase.google.com/");
    
    // Invia stato iniziale
    sendStatusToFirebase();
  }
}

void loop() {
  static unsigned long lastImageTime = 0;
  static unsigned long lastStatusTime = 0;
  unsigned long currentTime = millis();
  
  // Verifica connessione WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Riconnessione WiFi...");
    connectToWPA2Enterprise();
    delay(5000);
    return;
  }
  
  // Invia immagine ogni 60 secondi
  if (currentTime - lastImageTime >= 60000) {
    Serial.println("Image acquired...");
    if (sendImageToFirebase()) {
      lastImageTime = currentTime;
    } else {
      // Riprova tra 10 secondi se fallisce
      lastImageTime = currentTime - 50000;
    }
  }
  
  // Aggiorna stato ogni 30 secondi
  if (currentTime - lastStatusTime >= 30000) {
    sendStatusToFirebase();
    lastStatusTime = currentTime;
  }
  
  delay(1000);
}