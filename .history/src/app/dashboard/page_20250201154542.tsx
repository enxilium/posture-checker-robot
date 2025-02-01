import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard"
}

export default function Dashboard() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-slate-blue">Fernando Dashboard</h1>
    </div>
  )
}