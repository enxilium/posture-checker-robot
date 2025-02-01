import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Image from 'next/image'

const mockPostureData = [
  { time: '9:00', score: 95 },
  { time: '10:00', score: 75 },
  { time: '11:00', score: 85 },
  { time: '12:00', score: 90 },
  { time: '13:00', score: 70 },
  { time: '14:00', score: 88 },
]

export const metadata: Metadata = {
  title: "Posture Analytics Dashboard",
  description: "Track your posture metrics and connect with your robot assistant"
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Posture Analytics Dashboard</h1>
          <Image 
            src="/robot-assistant.png"
            alt="Robot Assistant"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm col-span-2">
            <h2 className="text-xl font-semibold mb-4">Posture Trend</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPostureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Today's Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="font-medium">Good Posture</p>
                <p className="ml-auto text-muted-foreground">81%</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <p className="font-medium">Poor Posture</p>
                <p className="ml-auto text-muted-foreground">19%</p>
              </div>
              <Image 
                src="/posture-diagram.png"
                alt="Posture Diagram"
                width={200}
                height={200}
                className="mx-auto mt-4"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Robot Message Center</h2>
            <div className="space-y-4">
              <Input 
                placeholder="Type message for robot display..."
                className="w-full"
              />
              <Button className="w-full">Send to Robot</Button>
              <p className="text-sm text-muted-foreground">
                Connection status: Waiting to connect...
              </p>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Improvement Tips</h2>
            <div className="grid grid-cols-2 gap-4">
              <Image 
                src="/correct-posture.png"
                alt="Correct Posture"
                width={150}
                height={150}
                className="mx-auto"
              />
              <ul className="space-y-2 text-muted-foreground">
                <li>• Keep screen at eye level</li>
                <li>• Shoulders back and relaxed</li>
                <li>• Feet flat on ground</li>
                <li>• Take regular breaks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
