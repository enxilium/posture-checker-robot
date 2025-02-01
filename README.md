# Posture Detection Robot

This project is a posture detection robot that utilizes Firebase for data storage. The system collects and stores posture-related data, helping users monitor and improve their sitting or standing posture over time.

## Firebase Configuration

To connect the posture detection system with your Firebase project, update the `firebaseConfig` object in the code with your Firebase project credentials. These credentials can be found in your Firebase project settings.

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

## Features
- Real-time posture monitoring using sensors
- Data validation to ensure accuracy
- Stores posture data in both local storage and Firebase Realtime Database
- Provides feedback to users based on posture analysis

## Usage

To use the posture detection system, follow these steps:

1. Open the `index.html` file in a web browser.
2. Ensure that the posture detection sensors are correctly set up and connected.
3. The system will continuously monitor and validate posture data.
4. If improper posture is detected, an alert or notification will be displayed.
5. The posture data is stored in both local storage and the Firebase Realtime Database.

## Data Validation

The system validates the following posture-related inputs:
- **Angle Measurements:** Ensures angles fall within an acceptable posture range.
- **Sensor Readings:** Filters out noise and erroneous data from sensors.
- **Timestamp Logging:** Ensures correct time sequencing for posture analysis.

If any validation fails, corrective feedback is provided to the user.

## Database Storage

The posture data is stored in two locations:

1. **Local Storage:** Stores session data locally for quick access and offline monitoring.
2. **Firebase Realtime Database:** Stores data in the "posture-data" node using `database.ref().push()`, enabling long-term tracking and analysis.

## Dependencies

This system relies on Firebase for data storage. Ensure you include the Firebase JavaScript SDK in your project by adding the following script tags in your HTML file:

```html
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

License

Feel free to use and modify the code according to your needs. Contributions are welcome!

Credits

This posture detection robot was developed by [Your Name].

For more projects, visit GitHub.

If you have any questions or suggestions, please feel free to reach out to me at [your.email@example.com].