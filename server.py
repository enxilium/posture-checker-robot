from flask import Flask, Response, stream_with_context
import time
import queue

app = Flask(__name__)

# A thread-safe queue to hold posture warnings
posture_events = queue.Queue()

def send_posture_event(event):
    posture_events.put(event)

@app.route("/stream")
def stream():
    # Generator that yields SSE events
    def event_stream():
        while True:
            event = posture_events.get()
            yield f"data: {event}\n\n"
    return Response(stream_with_context(event_stream()), mimetype="text/event-stream")

# Add this endpoint in server.py
@app.route("/ping", methods=["POST"])
def ping():
    send_posture_event(f"Bad posture ping at {time.strftime('%Y-%m-%d %H:%M:%S')}")
    return "OK", 200

if __name__ == "__main__":
    # Run the Flask app on port 5000
    app.run(host="0.0.0.0", port=5000, threaded=True)