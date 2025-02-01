import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Posture Analytics Dashboard",
  description: "Track your posture metrics and connect with your robot assistant"
}

const mockPostureData = [
  { time: '9:00', score: 95, slouching: 2, straight: 58 },
  { time: '10:00', score: 75, slouching: 15, straight: 45 },
  { time: '11:00', score: 85, slouching: 8, straight: 52 },
  { time: '12:00', score: 90, slouching: 5, straight: 55 },
  { time: '13:00', score: 70, slouching: 18, straight: 42 },
  { time: '14:00', score: 88, slouching: 7, straight: 53 },
]

const pieData = [
  { name: 'Good Posture', value: 81 },
  { name: 'Poor Posture', value: 19 },
]

const COLORS = ['#22c55e', '#ef4444']

const mockUserData = {
  name: "Nicholas Chen",
  email: "nicholas@example.com",
  memberSince: "January 2024",
  streak: 7,
  lastSession: "2 hours ago"
}

export const metadata: Metadata = {
  title: "Posture Analytics Dashboard",
  description: "Track your posture metrics and connect with your robot assistant"
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* User Profile Header */}
        <div className="flex items-center justify-between p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {mockUserData.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{mockUserData.name}</h2>
              <p className="text-muted-foreground">{mockUserData.email}</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <p className="font-medium">Member Since</p>
              <p className="text-muted-foreground">{mockUserData.memberSince}</p>
            </div>
            <div>
              <p className="font-medium">Streak</p>
              <p className="text-muted-foreground">{mockUserData.streak} days</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Posture Graph */}
          <div className="p-6 rounded-lg border bg-card col-span-2">
            <h2 className="text-xl font-semibold mb-4">Today's Posture Timeline</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPostureData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">Posture Distribution</h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Robot Control Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-4 mb-4">
              <Image 
                src="/robot-icon.png" 
                alt="Robot"
                width={40}
                height={40}
              />
              <h2 className="text-xl font-semibold">Robot Control Center</h2>
            </div>
            <div className="space-y-4">
              <Input 
                placeholder="Type message for robot display..."
                className="w-full"
              />
              <Button className="w-full">Send to Robot</Button>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Robot is active</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Last Session</p>
                <p className="font-semibold">{mockUserData.lastSession}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Today's Score</p>
                <p className="font-semibold">85/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
