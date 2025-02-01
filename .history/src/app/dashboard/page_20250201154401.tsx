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
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-slate-blue mb-8">Fernando Dashboard</h1>
      
      {/* User Profile Section */}
      <section className="flex items-center gap-6 p-6 bg-soft-pink rounded-lg mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-blue">Welcome to Your Posture Dashboard!</h2>
          <p className="text-ocean-blue">Track and improve your posture in real-time</p>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Today's Posture Analysis</h3>
        <LineChart width={600} height={300} data={mockPostureData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#6d83ad" />
        </LineChart>
      </section>
    </div>
  )
}
