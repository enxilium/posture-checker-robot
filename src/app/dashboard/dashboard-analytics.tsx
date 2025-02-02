'use client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export type AnalyticsData = {
  time: string
  score: number
  duration: number
}[]

interface DashboardAnalyticsProps {
  analyticsData: AnalyticsData | null
}

export function DashboardAnalytics({ analyticsData }: DashboardAnalyticsProps) {
  if (!analyticsData) {
    return <div>Loading analytics data...</div>
  }

  return (
    <div className="h-[300px] bg-white p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={analyticsData}>
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