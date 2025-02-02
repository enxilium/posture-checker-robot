'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

export function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("")

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail }),
    })
    if (res.ok) {
      window.location.href = '/dashboard'
    }
  }

  return (
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
      <p className="text-center text-sm text-muted-foreground">
        Need an account? {' '}
        <Link href="/auth/register" className="text-primary hover:underline">
          Register here
        </Link>
      </p>
    </div>
  )
}
'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

export function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("")

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail }),
    })
    if (res.ok) {
      window.location.href = '/dashboard'
    }
  }

  return (
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
      <p className="text-center text-sm text-muted-foreground">
        Need an account? {' '}
        <Link href="/auth/register" className="text-primary hover:underline">
          Register here
        </Link>
      </p>
    </div>
  )
}
