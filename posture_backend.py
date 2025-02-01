from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import time
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    posture_status = db.Column(db.String(20))

    def __repr__(self):
        return f'<User {self.username}>'

# Simulate posture detection (replace with actual OpenCV logic later)
def detect_posture():
    # For now, randomly return 'good' or 'bad' posture
    time.sleep(1) # Simulate processing time
    posture_status = random.choice(['good', 'bad'])
    return posture_status

@app.route('/posture_status')
def get_posture_status():
    status = detect_posture()
    # For demonstration, let's just add a user 'testuser' if not exists
    user = User.query.filter_by(username='testuser').first()
    if not user:
        user = User(username='testuser', posture_status=status)
        db.session.add(user)
    else:
        user.posture_status = status
    db.session.commit()
    return jsonify({'status': status, 'user_posture_status': user.posture_status})

@app.route('/user_stats')
def get_user_stats():
    user = User.query.filter_by(username='testuser').first()
    if user:
        return jsonify({'username': user.username, 'posture_status': user.posture_status})
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/posture_history')
def get_posture_history():
    history_data = {
        'labels': ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        'scoreData': [70, 80, 65, 90, 75],
        'goodTimeData': [8, 9, 7, 10, 8],
        'badTimeData': [2, 1, 3, 0, 2]
    }
    return jsonify(history_data)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
