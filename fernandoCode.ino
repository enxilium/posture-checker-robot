#include <Stepper.h>
#include <LiquidCrystal.h>
#include <Servo.h>  // Include the Servo library

// Stepper Motor Setup
#define STEPS_PER_REV 2048 // Steps per revolution for 28BYJ-48 stepper motor
#define MOTOR_SPEED 17 // Speed in RPM

// Define stepper motor pin connections
#define IN1 0
#define IN2 1
#define IN3 2
#define IN4 3

// Initialize the Stepper library with ULN2003AN driver pins
Stepper stepperMotor(STEPS_PER_REV, IN1, IN3, IN2, IN4);

// Buzzer Setup
#define BUZZER_PIN 4 // Define buzzer pin
int E = 329;  // Frequencies for E major chord (E, G#, B, E, G#)

// LCD Setup
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

// Servo Setup
#define SERVO_PIN 6 // Define the pin for the servo motor
Servo servoMotor;  // Create a Servo object

// Custom characters for smiley and sad face (5x8 pixel matrix)

void setup() {
  // Stepper Motor setup
  stepperMotor.setSpeed(MOTOR_SPEED);
  
  // LCD Setup
  lcd.begin(16, 2);  // Initialize the LCD
  lcd.clear();

  // Buzzer Setup
  pinMode(BUZZER_PIN, OUTPUT);

  // Servo Setup
  servoMotor.attach(SERVO_PIN);  // Attach the servo to the specified pin
  servoMotor.write(30);  // Set the servo to horizontal position initially (90 degrees)

  // Start serial communication at 9600 baud rate
  Serial.begin(9600);  
}

void loop() {
  goodPosture();

  if (Serial.available() > 0) {
    char command = Serial.read();  // Read the incoming command

    if (command == 'b') {  // 'b' for bad posture
      badPosture();   // Display sad face for bad posture
      makeSound();    // Play E major chord again
      shakeHead();    // Shake head using stepper motor
      poke();         // Move the servo for the poke action

    }
  }
}

// Function to play E major chord
void makeSound() {
  unsigned long startTime = millis();  // Start time to track duration

  while (millis() - startTime < 700) {
    for (int i = 0; i < 5; i++) {
      tone(BUZZER_PIN, 250);  // Play the note
      delay(80); // Slight overlap between notes (80ms for each)
    }
  }

  // Stop the sound after duration
  noTone(BUZZER_PIN);
}

// Function to display a smiling face for good posture
void goodPosture(){
  lcd.clear();       // Clear any previous data
  lcd.setCursor(4, 1);  // Set cursor to the top-left
  lcd.print(".      .");       // Display a smiley face
  lcd.setCursor(4, 0);  // Set cursor to the top-left
  lcd.print("--------");       // Display a smiley face
}

void badPosture(){
  lcd.clear();       // Clear any previous data
  lcd.setCursor(4, 1);  // Set cursor to the top-left
  lcd.print(".   /\  .");       // Display a sad face
  lcd.setCursor(4, 0);  // Set cursor to the top-left
  lcd.print("\______/");       // Display a sad face
}

// Function to move stepper motor (shake head motion)
void shakeHead() {
  stepperMotor.setSpeed(MOTOR_SPEED);
  stepperMotor.step(-STEPS_PER_REV / 8); // Move 45 degrees CCW
  stepperMotor.step(STEPS_PER_REV / 4);  // Move 90 degrees CW
  stepperMotor.step(-STEPS_PER_REV / 8); // Move 45 degrees CCW
}

// Function to move the servo motor (poke action)
void poke() {
  // Move servo 45 degrees above horizontal (135 degrees)
  servoMotor.write(50);  
  delay(500);  // Wait for servo to move
  
  // Move servo 45 degrees below horizontal (45 degrees)
  servoMotor.write(20);  
  delay(500);  // Wait for servo to move
  
  // Return to horizontal position (90 degrees)
  servoMotor.write(30);  
  delay(500);  // Wait for servo to move
}