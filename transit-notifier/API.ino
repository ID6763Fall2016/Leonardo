//Wifi
#include <ESP8266WiFi.h>
#include <TinyXML.h>
#include <Wire.h>
#include <WiFiClientSecure.h>
//DoStart
#include <Adafruit_DotStar.h>
#include <SPI.h>
//Button
//#include "Adafruit_MQTT.h"
//#include "Adafruit_MQTT_Client.h"

#define Buttons       A0  // analog 0

#define NUMPIXELS 12
#define DATAPIN   13 
#define CLOCKPIN   12
Adafruit_DotStar strip = Adafruit_DotStar(NUMPIXELS, DATAPIN, CLOCKPIN, DOTSTAR_BRG);

// CONFIGURABLE GLOBAL STUFF -----------------------------------------------
char ssid[] = "GTother",     // WiFi network name
pass[] = "GeorgeP@1927", // WiFi network password
//host[] = "webservices.nextbus.com";
host[] = "gtbuses.herokuapp.com";

uint32_t red = 0x00FF00;      //  color (red)
uint32_t blue = 0x0000FF;      //  color (blue)
uint32_t green = 0xFF0000;     //  color(green)
#define POLL_INTERVAL 1 // Time between searches (minutes)
#define MIN_TIME      15 // Skip arrivals sooner than this (minutes)
#define READ_TIMEOUT 15 // Cancel query if no data received (seconds)


struct {
  //const uint8_t     addr;          // I2C address of display
  const char       *agency;        // Get these using routefinder.py script
  const char       *route;
  const char       *stopID;
  uint32_t          lastQueryTime; // Time of last query (millis())
  uint32_t          seconds[2];    // Most recent predictions from server
//  Adafruit_7segment display;       // 7segment initialized at runtime
} 
stops[] = {
  { "Georgia Tech Campu", "blue", "Tech Tower" }, // Ohlone College
  //{ "Georgia Tech Campu", "210", "0702630" }, // Union Landing
  //{ "Georgia Tech Campu", "232", "0704440" }, // Fremont BART
  //{ "Georgia Tech Campu", "232", "0704430" }  // NewPark Mall
};
// For basic use as-is, shouldn't need to edit below this line -------------
#define NUM_STOPS (sizeof(stops) / sizeof(stops[0]))
WiFiClientSecure client;
TinyXML    xml;
uint8_t    buffer[150]; // For XML decoding
uint8_t    s = NUM_STOPS; // Stop # currently being searched
uint32_t   lastConnectTime = -(POLL_INTERVAL * 60000L); // neg on purpose!
uint32_t   seconds[2];

void XML_callback(uint8_t statusflags, char* tagName,
                  uint16_t tagNameLen, char* data, uint16_t dataLen) {
//  Serial.print("tagName:  ");
//  Serial.println(tagName);
//  Serial.println(data);
//  Serial.print("sta:  ");
//  Serial.println(statusflags);
  if ((statusflags & STATUS_ATTR_TEXT) && !strcasecmp(tagName, "minutes")) {
    uint32_t t[5];
    //Serial.println("read!!!");
    
    for(int i=0;i<5;i++){
        t[i]=atoi(data);
      }
     //Serial.println("write");
   // uint32_t t = atoi(data); // Prediction in seconds (0 if gibberish)
    Serial.print(t[0]); 
    Serial.println(" minutes");
    if(t[0]<10){
         for(int i=9;i<NUMPIXELS;i++){
             strip.setPixelColor(i, red);
          }
      }
     else if(t[0]>=10&&t[0]<30){
         for(int i=4;i<NUMPIXELS;i++){
             strip.setPixelColor(i, blue);
          }
      }
      else {
         for(int i=0;i<NUMPIXELS;i++){
             strip.setPixelColor(i, green);
          }
      }
//      for(int i=3;i<NUMPIXELS;i++){
//             strip.setPixelColor(i, red);
//             Serial.println("RED");
//          }
      strip.show();
      
      delay(20);
    /*
    if (t >= (MIN_TIME * 60)) {       // Above our "too soon" threshold?
      if (!seconds[0]) {              //  No predictions yet?
        seconds[0] = t;               //   Save in slot 0, done
      } else {                        //  Else 1-2 existing predictions...
        if (t <= seconds[0]) {        // New time sooner than slot 0?
          seconds[1] = seconds[0];    //  Move 0 up to 1 (old 1 discarded)
          seconds[0] = t;             //  Store new time in 0
        } else if (!seconds[1] ||     // Slot 1 empty?
                   (t <= seconds[1])) { // Or new time sooner than 1?
          seconds[1] = t;             //  Store new time in slot 1
        }                             // Else discard
        if (seconds[0] == seconds[1]) seconds[1] = 0; // If equal, delete 1
      }
    }
    */
  }
}

// ONE-TIME INITIALIZATION -------------------------------------------------
void setup(void) {
  Serial.begin(115200);
  //DoStars
  strip.begin(); 
  strip.show();  
  
  Serial.println("NextBus Tracker");
  //Wire.begin();
  xml.init((uint8_t *)buffer, sizeof(buffer), &XML_callback);
  for (uint8_t i = 0; i < NUM_STOPS; i++) {
    stops[i].lastQueryTime = 0;
    memset(stops[i].seconds, 0, sizeof(stops[i].seconds));
  }
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, pass);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected"); 

  
}
// MAIN LOOP ---------------------------------------------------------------
void loop(void) {
  uint32_t t;
  int      c;
  uint8_t  b = 0;
  boolean  timedOut;
  int num=0;

  lastConnectTime = t;
  //t=lastConnectTime;
//  for(int i=5;i<NUMPIXELS;i++){
//             strip.setPixelColor(i, red);
//             Serial.println("RED");
//          }
//      strip.show();
 
  
  for (s = 0; s < NUM_STOPS; s++) {
    Serial.print("Stop #");
    Serial.println(stops[s].stopID);
    Serial.println("Contacting server...");
    if (!client.connect(host, 443)) {
      Serial.println("connection failed");
      return;
    }
    
    if (client.connect(host, 443)) {
      String url = "/multiPredictions?stops=blue|cherfers";
      client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                   "Host: " + host + "\r\n" +
                   "User-Agent: BuildFailureDetectorESP8266\r\n" +
                   "Connection: close\r\n\r\n");
      //Serial.println("Get");
      xml.reset();
      memset(seconds, 0, sizeof(seconds)); // Clear predictions
      t= millis(); // Start time
      timedOut = false;
      while (client.connected()) {
        //num++;
        if(num>650) break;
        if ((c = client.read()) >= 0) {
          xml.processChar(c);
          num++;
          //Serial.println("XMLRead");
          t = millis(); // Reset timeout clock
        } 
        else if ((millis() - t) >= (READ_TIMEOUT * 1000)) {
          Serial.println("---Timeout---");
          timedOut = true;
          break;
        }
      }
      if (!timedOut && seconds[0]) { // Successful transfer?
        // Copy newly-polled predictions to stops structure:
        memcpy(stops[s].seconds, seconds, sizeof(seconds));
        stops[s].lastQueryTime = millis();
      }
    }
    client.stop();
    Serial.println();
  }
}
