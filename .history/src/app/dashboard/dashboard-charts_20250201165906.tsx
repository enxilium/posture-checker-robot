'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

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

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  )
}
