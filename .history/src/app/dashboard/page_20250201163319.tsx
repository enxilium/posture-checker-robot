import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Posture Analytics Dashboard",
  description: "Track your posture metrics and send messages to Orbot"
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <h1 className="text-3xl font-bold text-foreground">Posture Analytics Dashboard</h1>
        
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Posture Score</h2>
            <div className="h-48 bg-muted rounded-md mb-4">
              {/* Add Chart.js or other visualization library here */}
              <p className="text-center pt-20 text-muted-foreground">Posture Trend Graph</p>
            </div>
            <p className="text-muted-foreground">Current Score: 85%</p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Daily Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Good Posture Time</p>
                <p className="text-muted-foreground">6.5 hours (81%)</p>
              </div>
              <div>
                <p className="font-medium">Bad Posture Time</p>
                <p className="text-muted-foreground">1.5 hours (19%)</p>
              </div>
              <div>
                <p className="font-medium">Total Monitoring Time</p>
                <p className="text-muted-foreground">8 hours</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Improvement Tips</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Adjust chair height to maintain eye level with screen</li>
              <li>• Keep shoulders relaxed and back straight</li>
              <li>• Take regular breaks every 30 minutes</li>
              <li>• Ensure feet are flat on the ground</li>
            </ul>
          </div>
        </div>

        {/* Rorbot Message Section */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Orbot LCD Message</h2>
          <div className="space-y-4">
            <Input 
              placeholder="Type your message for Rorbot's LCD screen..."
              className="w-full"
            />
            <Button className="w-full">Send to Orbot</Button>
          </div>
        </div>

        {/* User Data Section */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Daily Goal</p>
              <p className="text-muted-foreground">8 hours of good posture</p>
            </div>
            <div>
              <p className="font-medium">Weekly Progress</p>
              <p className="text-muted-foreground">On track - 85% achieved</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
