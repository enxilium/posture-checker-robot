import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your account and view analytics"
}

export default function Dashboard() {
  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-blue">Fernando Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">View your statistics and performance metrics</p>
          <Button className="mt-4">View Details</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your active projects and tasks</p>
          <Button className="mt-4">View Projects</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure your account preferences</p>
          <Button className="mt-4">Open Settings</Button>
        </Card>
      </div>
    </div>
  )
}
