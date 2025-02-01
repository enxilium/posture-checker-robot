'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const postureData = [
  { time: '9:00', score: 95, duration: 58 },
  { time: '10:00', score: 75, duration: 45 },
  { time: '11:00', score: 85, duration: 52 },
  { time: '12:00', score: 90, duration: 55 },
  { time: '13:00', score: 70, duration: 42 },
  { time: '14:00', score: 88, duration: 53 },
]

export function DashboardAnalytics() {
  return (
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
  )
}
