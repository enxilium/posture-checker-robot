'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

export function RegisterForm() {
  const [regEmail, setRegEmail] = useState("")
  const [regName, setRegName] = useState("")

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

  return (
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
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? {' '}
        <Link href="/auth/login" className="text-primary hover:underline">
          Login here
        </Link>
      </p>
    </div>
  )
}
