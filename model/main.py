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
    print("Warning: Poor posture detected!")
    # Optionally, add alerts like sound or notifications here

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# Video Capture
cap = cv2.VideoCapture(0)
prev_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Flip frame horizontally for a natural selfie-view
    image = cv2.flip(frame, 1)
    h, w, c = image.shape

    # Convert BGR image to RGB for MediaPipe
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)

    posture_good = True  # Assume good posture by default

    if results.pose_landmarks:
        lm = results.pose_landmarks.landmark

        # Convert normalized coordinates to pixel coordinates for upper-body landmarks
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

        # Verify that critical landmarks are visible; otherwise, count as poor posture.
        REQUIRED_VISIBILITY = 0.5
        if (lm[mp_pose.PoseLandmark.NOSE].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.LEFT_SHOULDER].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.RIGHT_SHOULDER].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.LEFT_EAR].visibility < REQUIRED_VISIBILITY or
            lm[mp_pose.PoseLandmark.RIGHT_EAR].visibility < REQUIRED_VISIBILITY):
            posture_good = False
        else:
            # Compute shoulder midpoint and shoulder width
            shoulder_mid = ((left_shoulder[0] + right_shoulder[0]) // 2,
                            (left_shoulder[1] + right_shoulder[1]) // 2)
            shoulder_width = abs(right_shoulder[0] - left_shoulder[0])

            MIN_VERTICAL_DISTANCE = 0.15 * h  # adjust as needed (e.g., 15% of the image height)
            if abs(nose[1] - shoulder_mid[1]) < MIN_VERTICAL_DISTANCE:
                posture_good = False

            MAX_VERTICAL_DISTANCE = 0.45 * h  # adjust as needed (e.g., 50% of the image height)
            if abs(nose[1] - shoulder_mid[1]) > MAX_VERTICAL_DISTANCE:
                posture_good = False

            # NEW: Check that the triangle formed by the nose and both shoulders is nearly equilateral.
            # In proper posture, the distance from the nose to each shoulder should be close to the
            # shoulder width. If they become too small, the triangle is squashed, indicating leaning forward.
            d_nose_left = m.sqrt((nose[0] - left_shoulder[0]) ** 2 + (nose[1] - left_shoulder[1]) ** 2)
            d_nose_right = m.sqrt((nose[0] - right_shoulder[0]) ** 2 + (nose[1] - right_shoulder[1]) ** 2)
            EQUILATERAL_TOLERANCE = 0.30 * shoulder_width  # 20% tolerance
            if (abs(d_nose_left - shoulder_width) > EQUILATERAL_TOLERANCE or
                abs(d_nose_right - shoulder_width) > EQUILATERAL_TOLERANCE):
                posture_good = False

            # Metric: Head leaning forward.
            # Calculate horizontal offset between nose and shoulder midpoint.
            horizontal_offset = abs(nose[0] - shoulder_mid[0])
            # Allow more lateral movement to avoid penalizing natural head turns.
            HEAD_FORWARD_THRESHOLD = 0.25 * shoulder_width
            head_forward = horizontal_offset > HEAD_FORWARD_THRESHOLD

            # Metric: Ear alignment as an additional indicator.
            ear_mid = ((left_ear[0] + right_ear[0]) // 2,
                       (left_ear[1] + right_ear[1]) // 2)
            ear_horizontal_offset = abs(ear_mid[0] - shoulder_mid[0])
            EAR_ALIGNMENT_THRESHOLD = 0.25 * shoulder_width
            poor_ear_alignment = ear_horizontal_offset > EAR_ALIGNMENT_THRESHOLD

            # Overall evaluation: flag poor posture if either the head is leaning too far forward
            # or the ears are not sufficiently aligned with the shoulders.
            if head_forward or poor_ear_alignment:
                posture_good = False

            # Additionally, if critical landmarks (nose or shoulders) are near or beyond the image borders,
            # count it as poor posture.
            if (nose[0] <= 0 or nose[0] >= w or nose[1] <= 0 or nose[1] >= h or
                left_shoulder[0] <= 0 or left_shoulder[0] >= w or left_shoulder[1] <= 0 or left_shoulder[1] >= h or
                right_shoulder[0] <= 0 or right_shoulder[0] >= w or right_shoulder[1] <= 0 or right_shoulder[1] >= h):
                posture_good = False

            if not posture_good:
                sendWarning()

            # Visualization of key points
            # Visualization of key points
            color = (0, 255, 0) if posture_good else (0, 0, 255)
            cv2.circle(image, nose, 5, color, -1)
            cv2.circle(image, shoulder_mid, 5, color, -1)
            cv2.circle(image, left_shoulder, 5, color, -1)      # NEW: Draw left shoulder
            cv2.circle(image, right_shoulder, 5, color, -1)     # NEW: Draw right shoulder
            cv2.putText(image,
                        f"Posture: {'Good' if posture_good else 'Bad'}",
                        (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.8,
                        color,
                        2)

    # Display FPS
    curr_time = time.time()
    fps = 1 / (curr_time - prev_time)
    prev_time = curr_time
    cv2.putText(image, f"FPS: {int(fps)}", (w - 100, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)

    cv2.imshow("Posture Detection", image)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()