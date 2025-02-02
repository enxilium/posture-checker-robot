export class WebSocketService {
  private ws: WebSocket | null = null
  
  connect() {
    this.ws = new WebSocket('ws://your-robot-ip:port')
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      // Handle incoming posture data
    }
  }
  
  sendMessage(message: string) {
    if (this.ws) {
      this.ws.send(JSON.stringify({ type: 'lcd', message }))
    }
  }
}
