"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Image from 'next/image'

const mockPostureData = [
  { time: '9:00', score: 85 },
  { time: '10:00', score: 75 },
  { time: '11:00', score: 90 },
  { time: '12:00', score: 65 },
  { time: '13:00', score: 80 },
]

export default function Dashboard() {
  return (
    <div className="container py-8 space-y-8">
      {/* User Profile Section */}
      <section className="flex items-center gap-6 p-6 bg-soft-pink rounded-lg">
        <Image 
          src="/profile-placeholder.jpg" 
          alt="Profile" 
          width={100} 
          height={100} 
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-slate-blue">Welcome back, User!</h2>
          <p className="text-ocean-blue">Your posture health dashboard</p>
        </div>
      </section>

      {/* Real-time Posture Analytics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Posture Score Today</h3>
          <LineChart width={500} height={300} data={mockPostureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#6d83ad" />
          </LineChart>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Posture Insights</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Good posture periods: 75%
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              Poor posture alerts: 25%
            </li>
          </ul>
        </div>
      </section>

      {/* LCD Control Panel */}
      <section className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">LCD Message Control</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter message for LCD display..."
            className="w-full p-2 border rounded"
          />
          <button className="px-4 py-2 bg-slate-blue text-white rounded hover:bg-ocean-blue">
            Update LCD Display
          </button>
        </div>
      </section>

      {/* Posture Improvement Tips */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold mb-2">Desk Setup</h4>
          <Image 
            src="/desk-setup.jpg" 
            alt="Proper desk setup" 
            width={300} 
            height={200}
            className="rounded mb-2"
          />
          <p>Monitor at eye level, arms at 90 degrees, feet flat on floor</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold mb-2">Stretching Exercises</h4>
          <Image 
            src="/stretching.jpg" 
            alt="Stretching exercises" 
            width={300} 
            height={200}
            className="rounded mb-2"
          />
          <p>Regular stretching breaks every 30 minutes</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold mb-2">Real-time Detection</h4>
          <Image 
            src="/camera-feed.jpg" 
            alt="Camera feed" 
            width={300} 
            height={200}
            className="rounded mb-2"
          />
          <p>Live posture monitoring with AI analysis</p>
        </div>
      </section>
    </div>
  )
}
