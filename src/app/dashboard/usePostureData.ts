import { useState, useEffect } from 'react'
import { WebSocketService } from '@/app/dashboard/websocket'

const wsService = new WebSocketService()

export function usePostureData() {
  const [postureData, setPostureData] = useState({
    currentScore: 0,
    history: [],
    cameraFeed: null
  })
  
  useEffect(() => {
    wsService.connect()
    
    // Clean up on unmount
    return () => {
      // Add disconnect logic
    }
  }, [])
  
  return {
    postureData,
    sendLCDMessage: wsService.sendMessage
  }
}
