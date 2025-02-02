import cv2
import time
import math as m
import mediapipe as mp

def calculate_angle(shoulder, hip):
    delta_x = hip[0] - shoulder[0]
    delta_y = hip[1] - shoulder[1]
    if delta_y == 0:
        return 0
    return m.degrees(m.atan(abs(delta_x)/delta_y))

def sendWarning():
    pass  # Add alerts like sound or notifications here

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# Video Capture
cap = cv2.VideoCapture(0)
prev_time = time.time()

# Posture Thresholds (Adjust based on your setup)
VERTICAL_THRESHOLD_RATIO = 0.25  # Shoulders-hips vertical distance/screen height
HORIZONTAL_THRESHOLD_RATIO = 0.15  # Nose-shoulder horizontal distance/screen width
ANGLE_THRESHOLD = 25  # Degrees

# Colors
COLORS = {
    'good': (0, 255, 0),
    'bad': (0, 0, 255),
    'landmark': (255, 255, 0)
}

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break

    # Calculate FPS
    curr_time = time.time()
    fps = 1/(curr_time - prev_time + 1e-6)
    prev_time = curr_time

    # Process frame
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    h, w = image.shape[:2]

    if results.pose_landmarks:
        lm = results.pose_landmarks.landmark

        # Key landmarks (Normalized to pixel coordinates)
        nose = (int(lm[mp_pose.PoseLandmark.NOSE].x * w), 
                int(lm[mp_pose.PoseLandmark.NOSE].y * h))
        
        shoulders = {
            'left': (int(lm[mp_pose.PoseLandmark.LEFT_SHOULDER].x * w),
                     int(lm[mp_pose.PoseLandmark.LEFT_SHOULDER].y * h)),
            'right': (int(lm[mp_pose.PoseLandmark.RIGHT_SHOULDER].x * w),
                      int(lm[mp_pose.PoseLandmark.RIGHT_SHOULDER].y * h))
        }
        
        hips = {
            'left': (int(lm[mp_pose.PoseLandmark.LEFT_HIP].x * w),
                     int(lm[mp_pose.PoseLandmark.LEFT_HIP].y * h)),
            'right': (int(lm[mp_pose.PoseLandmark.RIGHT_HIP].x * w),
                      int(lm[mp_pose.PoseLandmark.RIGHT_HIP].y * h))
        }

        # Calculate midpoints
        shoulder_mid = ((shoulders['left'][0] + shoulders['right'][0])//2,
                        (shoulders['left'][1] + shoulders['right'][1])//2)
        
        hip_mid = ((hips['left'][0] + hips['right'][0])//2,
                   (hips['left'][1] + hips['right'][1])//2)

        # Posture metrics
        vertical_distance = hip_mid[1] - shoulder_mid[1]
        horizontal_distance = abs(nose[0] - shoulder_mid[0])
        
        # Shoulder angles
        left_angle = calculate_angle(shoulders['left'], hips['left'])
        right_angle = calculate_angle(shoulders['right'], hips['right'])
        avg_angle = (left_angle + right_angle)/2

        # Check posture conditions
        vert_threshold = VERTICAL_THRESHOLD_RATIO * h
        horiz_threshold = HORIZONTAL_THRESHOLD_RATIO * w
        
        posture_good = True
        if (vertical_distance < vert_threshold or
            horizontal_distance > horiz_threshold or
            avg_angle > ANGLE_THRESHOLD):
            posture_good = False

        # Visualization
        color = COLORS['good'] if posture_good else COLORS['bad']
        
        # Draw posture lines
        cv2.line(image, nose, shoulder_mid, color, 2)
        cv2.line(image, shoulders['left'], hips['left'], color, 2)
        cv2.line(image, shoulders['right'], hips['right'], color, 2)
        
        # Draw landmarks
        cv2.circle(image, nose, 7, COLORS['landmark'], -1)
        cv2.circle(image, shoulder_mid, 7, COLORS['landmark'], -1)
        for point in [*shoulders.values(), *hips.values()]:
            cv2.circle(image, point, 5, COLORS['landmark'], -1)

        # Display metrics
        text = f"Posture: {'Good' if posture_good else 'Bad'}"
        cv2.putText(image, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
        cv2.putText(image, f"Vertical: {vertical_distance:.1f}", (10, 60), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 1)
        cv2.putText(image, f"Horizontal: {horizontal_distance:.1f}", (10, 85), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 1)
        cv2.putText(image, f"Angle: {avg_angle:.1f}°", (10, 110), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 1)

    cv2.imshow('Desk Posture Monitor', image)
    if cv2.waitKey(5) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()