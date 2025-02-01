'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

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

export function DashboardAnalytics() {
  return (
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
  )
}
