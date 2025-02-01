import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { message } = await req.json()
  
  // Here you'll add your robot's LCD control logic
  // Example: await sendToLCD(message)
  
  return NextResponse.json({ success: true, message })
}

