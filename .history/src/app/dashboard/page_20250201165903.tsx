import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { DashboardAnalytics } from "@/app/dashboard/dashboard-analytics"

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

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
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

			  <DashboardAnalytics />
			  
			  {/* Posture Tips Section */}
<div className="space-y-6">
  <h2 className="text-2xl font-bold">Your Personalized Posture Guide</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-3">⚡</div>
      <h3 className="font-semibold text-lg mb-2">Priority Fix</h3>
      <p className="text-sm text-muted-foreground mb-2">Your neck tends to lean forward at 2PM</p>
      <p className="text-xs font-medium text-green-500">Quick win: Raise monitor height by 2 inches</p>
    </div>

    <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-3">🎯</div>
      <h3 className="font-semibold text-lg mb-2">Daily Goal</h3>
      <p className="text-sm text-muted-foreground mb-2">Stand up 5 times during work hours</p>
      <p className="text-xs font-medium text-green-500">Current progress: 3/5 completed</p>
    </div>

    <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-3">💪</div>
      <h3 className="font-semibold text-lg mb-2">Strength Builder</h3>
      <p className="text-sm text-muted-foreground mb-2">2-minute shoulder rolls every hour</p>
      <p className="text-xs font-medium text-green-500">Reduces your common shoulder tension</p>
    </div>

    <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-3">🌟</div>
      <h3 className="font-semibold text-lg mb-2">Next Achievement</h3>
      <p className="text-sm text-muted-foreground mb-2">2 more hours of good posture</p>
      <p className="text-xs font-medium text-green-500">Unlock: "Perfect Posture Pro" badge</p>
    </div>
  </div>

  <div className="mt-8 p-6 rounded-lg border bg-card">
    <h3 className="font-semibold text-lg mb-4">Today's Focus Areas</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start gap-3">
        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
        <div>
          <p className="font-medium">Morning Routine</p>
          <p className="text-sm text-muted-foreground">Start with 5 minutes of desk stretches</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
        <div>
          <p className="font-medium">Afternoon Check</p>
          <p className="text-sm text-muted-foreground">Reset posture after lunch break</p>
        </div>
      </div>
    </div>
  </div>
</div>

			  
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
