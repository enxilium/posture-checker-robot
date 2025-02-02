import cv2
import mediapipe as mp
import math as m
import time
import requests
import os
import tempfile
import json

def calculate_angle(hip, shoulder):
    delta_x = hip[0] - shoulder[0]
    delta_y = hip[1] - shoulder[1]
    if delta_y == 0:
        return 0
    return m.degrees(m.atan(abs(delta_x) / delta_y))

def sendWarning():
    print("Warning: Poor posture detected!")
    ser = serial.Serial('COM6', 9600)  # COM6 and baud rate of 9600
    time.sleep(2)  # Wait for the connection to establish

    # Send a character (e.g., 'b') to the Arduino
    ser.write(b'b')  # Send 'b' in byte format

    # Close the serial connection
    ser.close()

# Use the system's temporary folder in a cross-platform manner (works on Windows and Linux)
CACHE_FILE = os.path.join(tempfile.gettempdir(), "cache_user.json")

def read_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r") as f:
            data = json.load(f)
            return data
    else:
        print("Cache file not found.")
        return None

# Read the user ID from the JSON cache file.
cache_data = read_cache()
if cache_data and "userId" in cache_data:
    USER_ID = cache_data["userId"]
else:
    print("User ID not found in cache. Exiting.")
    exit(1)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# Open video capture device (default webcam)
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open video capture")
    exit(1)

prev_time = time.time()

# Constants for API integration
API_URL = "http://localhost:3000/api/posture-records"

# Aggregation counters for posture pings over each minute.
minute_start = time.time()
total_pings = 0
bad_pings = 0

# Variables for continuous bad posture tracking
bad_posture_start = None
last_warning_time = None  # Track time of last warning sent
WARNING_INTERVAL = 3  # seconds

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Flip frame horizontally for a natural selfie-view.
    image = cv2.flip(frame, 1)
    h, w, c = image.shape

    # Convert BGR image to RGB for MediaPipe processing.
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)

    posture_good = True  # Assume good posture by default

    if results.pose_landmarks:
        lm = results.pose_landmarks.landmark

        # Convert normalized coordinates to pixel coordinates for key landmarks.
        nose = (int(lm[mp_pose.PoseLandmark.NOSE].x * w),
                int(lm[mp_pose.PoseLandmark.NOSE].y * h))
        left_shoulder = (int(lm[mp_pose.PoseLandmark.LEFT_SHOULDER].x * w),
                         int(lm[mp_pose.PoseLandmark.LEFT_SHOULDER].y * h))
        right_shoulder = (int(lm[mp_pose.PoseLandmark.RIGHT_SHOULDER].x * w),
                          int(lm[mp_pose.PoseLandmark.RIGHT_SHOULDER].y * h))
        left_ear = (int(lm[mp_pose.PoseLandmark.LEFT_EAR].x * w),
                    int(lm[mp_pose.PoseLandmark.LEFT_EAR].y * h))
        right_ear = (int(lm[mp_pose.PoseLandmark.RIGHT_EAR].x * w),
                     int(lm[mp_pose.PoseLandmark.RIGHT_EAR].y * h))

        # Verify that critical landmarks are visible.
        REQUIRED_VISIBILITY = 0.5
        if (lm[mp_pose.PoseLandmark.NOSE].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.LEFT_SHOULDER].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.RIGHT_SHOULDER].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.LEFT_EAR].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.RIGHT_EAR].visibility < REQUIRED_VISIBILITY):
            posture_good = False
        else:
            # Compute shoulder midpoint and width.
            shoulder_mid = ((left_shoulder[0] + right_shoulder[0]) // 2,
                            (left_shoulder[1] + right_shoulder[1]) // 2)
            shoulder_width = abs(right_shoulder[0] - left_shoulder[0])

            # Vertical distance checks.
            MIN_VERTICAL_DISTANCE = 0.15 * h
            if abs(nose[1] - shoulder_mid[1]) < MIN_VERTICAL_DISTANCE:
                posture_good = False

            MAX_VERTICAL_DISTANCE = 0.45 * h
            if abs(nose[1] - shoulder_mid[1]) > MAX_VERTICAL_DISTANCE:
                posture_good = False

            # Check nearly equilateral triangle condition.
            d_nose_left = m.sqrt((nose[0] - left_shoulder[0]) ** 2 + (nose[1] - left_shoulder[1]) ** 2)
            d_nose_right = m.sqrt((nose[0] - right_shoulder[0]) ** 2 + (nose[1] - right_shoulder[1]) ** 2)
            EQUILATERAL_TOLERANCE = 0.30 * shoulder_width
            if (abs(d_nose_left - shoulder_width) > EQUILATERAL_TOLERANCE or
                abs(d_nose_right - shoulder_width) > EQUILATERAL_TOLERANCE):
                posture_good = False

            # Head forward check.
            horizontal_offset = abs(nose[0] - shoulder_mid[0])
            HEAD_FORWARD_THRESHOLD = 0.25 * shoulder_width
            head_forward = horizontal_offset > HEAD_FORWARD_THRESHOLD

            # Ear alignment check.
            ear_mid = ((left_ear[0] + right_ear[0]) // 2,
                       (left_ear[1] + right_ear[1]) // 2)
            ear_horizontal_offset = abs(ear_mid[0] - shoulder_mid[0])
            EAR_ALIGNMENT_THRESHOLD = 0.25 * shoulder_width
            poor_ear_alignment = ear_horizontal_offset > EAR_ALIGNMENT_THRESHOLD

            if head_forward or poor_ear_alignment:
                posture_good = False

            # Check that landmarks are within image borders.
            if (nose[0] <= 0 or nose[0] >= w or nose[1] <= 0 or nose[1] >= h or
                left_shoulder[0] <= 0 or left_shoulder[0] >= w or left_shoulder[1] <= 0 or left_shoulder[1] >= h or
                right_shoulder[0] <= 0 or right_shoulder[0] >= w or right_shoulder[1] <= 0 or right_shoulder[1] >= h):
                posture_good = False

        # Track continuous bad posture and send repeated warnings every 3 seconds.
        current_time = time.time()
        if not posture_good:
            if bad_posture_start is None:
                bad_posture_start = current_time
                last_warning_time = current_time
                sendWarning()
            elif current_time - last_warning_time >= WARNING_INTERVAL:
                sendWarning()
                last_warning_time = current_time
        else:
            bad_posture_start = None
            last_warning_time = None

        # Visualization of key points.
        color = (0, 255, 0) if posture_good else (0, 0, 255)
        cv2.circle(image, nose, 5, color, -1)
        cv2.circle(image, ((left_shoulder[0] + right_shoulder[0]) // 2,
                           (left_shoulder[1] + right_shoulder[1]) // 2), 5, color, -1)
        cv2.circle(image, left_shoulder, 5, color, -1)
        cv2.circle(image, right_shoulder, 5, color, -1)
        cv2.putText(image,
                    f"Posture: {'Good' if posture_good else 'Bad'}",
                    (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8,
                    color,
                    2)

        # Update aggregation counters.
        total_pings += 1
        if not posture_good:
            bad_pings += 1

    curr_time = time.time()
    fps = 1 / (curr_time - prev_time)
    prev_time = curr_time
    cv2.putText(image, f"FPS: {int(fps)}", (w - 100, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)
    cv2.imshow("Posture Detection", image)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    # Every minute, compute score and post to API.
    if curr_time - minute_start >= 60:
        score = 100 if total_pings == 0 else (1 - (bad_pings / total_pings)) * 100
        endTime_str = time.strftime("%H:%M", time.localtime(curr_time))
        payload = {"userId": USER_ID, "endTime": endTime_str, "score": score}
        try:
            response = requests.post(API_URL, json=payload)
            response.raise_for_status()
            print("Posture record updated:", response.json())
        except Exception as e:
            print("Error posting posture record:", e)
        minute_start = curr_time
        total_pings = 0
        bad_pings = 0

cap.release()
cv2.destroyAllWindows()