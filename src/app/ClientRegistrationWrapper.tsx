'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'

export function ClientRegistrationWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (user && !isLoading) {
      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
  }, [user, isLoading])

  return <>{children}</>
}
