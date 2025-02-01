import { useState, useEffect } from 'react'
import { WebSocketService } from '@/services/websocket'

const wsService = new WebSocketService()

export function usePostureData() {
  const [postureData, setPostureData] = useState({
    currentScore: 0,
    history: [],
    cameraFeed: null
  })
  
  useEffect(() => {
    wsService.connect()
    
    // Clean up on usnmount
    return () => {
      // Add disconnect logic
    }
  }, [])
  
  return {
    postureData,
    sendLCDMessage: wsService.sendMessage
  }
}
