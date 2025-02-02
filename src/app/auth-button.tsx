'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from "@/components/ui/button"

export function AuthButton() {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  return user ? (
    <Button variant="outline" asChild>
      <a href="/api/auth/logout">Logout</a>
    </Button>
  ) : (
    <Button variant="outline" asChild>
      <a href="/api/auth/login">Login</a>
    </Button>
  )
}
