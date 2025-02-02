'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AuthForms() {
  const [regEmail, setRegEmail] = useState("")
  const [regName, setRegName] = useState("")
  const [loginEmail, setLoginEmail] = useState("")

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: regEmail, name: regName }),
    })
    if (res.ok) {
      window.location.href = '/dashboard'
    }
  }

const handleLogin = async () => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: loginEmail }),
  })
  if (res.ok) {
    window.location.href = '/dashboardLogin'  // Updated to match your folder name
  }
}

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg border bg-card">
      <h2 className="text-2xl font-bold mb-6"></h2>
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or Register</span>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Name"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}
