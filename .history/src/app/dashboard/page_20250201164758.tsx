'use client'
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export const metadata: Metadata = {
  title: "Posture Analytics Dashboard",
  description: "Track your posture metrics and connect with your robot assistant"
}

const mockUserData = {
  name: "Nicholas Chen",
  email: "nicholas@example.com",
  memberSince: "January 2024",
  streak: 7,
  lastSession: "2 hours ago"
}

const postureData = [
  { time: '9:00', score: 95, slouching: 2, straight: 58 },
  { time: '10:00', score: 75, slouching: 15, straight: 45 },
  { time: '11:00', score: 85, slouching: 8, straight: 52 },
  { time: '12:00', score: 90, slouching: 5, straight: 55 },
  { time: '13:00', score: 70, slouching: 18, straight: 42 },
  { time: '14:00', score: 88, slouching: 7, straight: 53 },
]

const weeklyStats = [
  { day: 'Mon', score: 85 },
  { day: 'Tue', score: 88 },
  { day: 'Wed', score: 92 },
  { day: 'Thu', score: 85 },
  { day: 'Fri', score: 89 },
]

const postureTips = [
  {
    title: "Monitor Height",
    tip: "Screen should be at eye level",
    icon: "🖥️"
  },
  {
    title: "Chair Position",
    tip: "Feet flat on floor, knees at 90°",
    icon: "🪑"
  },
  {
    title: "Break Timer",
    tip: "Stand up every 30 minutes",
    icon: "⏰"
  },
  {
    title: "Shoulder Position",
    tip: "Keep shoulders relaxed and back",
    icon: "💪"
  }
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* User Profile Section - Keep existing code */}
        
        {/* Main Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">Real-time Posture Tracking</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={postureData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Posture Improvement Tips */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {postureTips.map((tip, index) => (
            <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h3 className="font-semibold">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.tip}</p>
            </div>
          ))}
        </div>

        {/* Robot Control and Stats - Keep existing code */}

        {/* New Achievement Section */}
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">🏆</div>
              <p className="font-medium">Perfect Posture</p>
              <p className="text-sm text-muted-foreground">2 hour streak</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">⭐</div>
              <p className="font-medium">Early Bird</p>
              <p className="text-sm text-muted-foreground">Morning routine</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="font-medium">Goal Setter</p>
              <p className="text-sm text-muted-foreground">Weekly target met</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">📈</div>
              <p className="font-medium">Improver</p>
              <p className="text-sm text-muted-foreground">10% better</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
