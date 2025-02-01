import cv2
import time
import math as m
import mediapipe as mp

def findDistance(x1, y1, x2, y2):
    return m.sqrt((x2 - x1)**2 + (y2 - y1)**2)

def findAngle(x1, y1, x2, y2):
    denominator = m.sqrt((x2 - x1)**2 + (y2 - y1)**2) * y1
    if denominator == 0:
        return 0  # Avoid division by zero
    theta = m.acos((y2 - y1) * (-y1) / denominator)
    return int(180 / m.pi) * theta

import requests

def send_posture_status(status):
    try:
        requests.post('http://localhost:5001/update_posture_status', json={'status': status})
    except requests.exceptions.RequestException as e:
        print(f"Error sending posture status: {e}")

def sendWarning():
    pass  # Implement your alert logic here

# Constants and Initializations
good_frames = 0
bad_frames = 0
font = cv2.FONT_HERSHEY_SIMPLEX
colors = {
    'green': (127, 255, 0),
    'red': (50, 50, 255),
    'yellow': (0, 255, 255),
    'pink': (255, 0, 255)
}

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Webcam Setup
cap = cv2.VideoCapture(0)
prev_time = time.time()

# Video Writer Setup (using estimated FPS)
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
video_output = cv2.VideoWriter('output.mp4', fourcc, 30, (frame_width, frame_height))

while cap.isOpened():
    success, image = cap.read()
    if not success:
        break

    # Calculate manual FPS
    curr_time = time.time()
    fps = 1 / (curr_time - prev_time + 1e-6)  # Add small epsilon to prevent division by zero
    prev_time = curr_time

    # Process frame
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image)
    h, w = image.shape[:2]
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    if results.pose_landmarks:
        lm = results.pose_landmarks

        # Landmark indices
        landmarks = {
            'left_shoulder': (int(lm.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].x * w),
                              int(lm.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].y * h)),
            'right_shoulder': (int(lm.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER].x * w),
                               int(lm.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER].y * h)),
            'left_ear': (int(lm.landmark[mp_pose.PoseLandmark.LEFT_EAR].x * w),
                         int(lm.landmark[mp_pose.PoseLandmark.LEFT_EAR].y * h)),
            'left_hip': (int(lm.landmark[mp_pose.PoseLandmark.LEFT_HIP].x * w),
                         int(lm.landmark[mp_pose.PoseLandmark.LEFT_HIP].y * h))
        }

        # Calculations
        offset = findDistance(*landmarks['left_shoulder'], *landmarks['right_shoulder'])
        neck_angle = findAngle(*landmarks['left_shoulder'], *landmarks['left_ear'])
        torso_angle = findAngle(*landmarks['left_hip'], *landmarks['left_shoulder'])

        # Posture evaluation
        if neck_angle < 40 and torso_angle < 10:
            good_frames += 1
            bad_frames = 0
            posture_color = colors['green']
            send_posture_status('good') # Send 'good' status to backend
        else:
            bad_frames += 1
            good_frames = 0
            posture_color = colors['red']
            send_posture_status('bad') # Send 'bad' status to backend

        # Draw landmarks and angles
        for point in landmarks.values():
            cv2.circle(image, point, 7, colors['yellow'], -1)
        cv2.putText(image, f'Neck: {neck_angle}°  Torso: {torso_angle}°',
                   (10, 30), font, 0.9, posture_color, 2)

        # Time calculations
        posture_time = (good_frames if good_frames > 0 else bad_frames) / max(fps, 1)
        time_label = ('Good' if good_frames > 0 else 'Bad') + f' Posture: {posture_time:.1f}s'
        cv2.putText(image, time_label, (10, h-20), font, 0.9,
                   colors['green'] if good_frames > 0 else colors['red'], 2)
    else:
        good_frames = bad_frames = 0

    # Warning system
    if bad_frames / max(fps, 1) > 5:  # 5 seconds of bad posture
        sendWarning()

    video_output.write(image)
    cv2.imshow('Posture Monitor', image)
    
    if cv2.waitKey(5) & 0xFF == ord('q'):
        break

cap.release()
video_output.release()
cv2.destroyAllWindows()
