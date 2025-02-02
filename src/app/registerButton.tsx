'use client'

import { useUser } from '@auth0/nextjs-auth0/client'

export function RegisterButton() {
  const { user } = useUser()

  return (
    <div className="flex gap-4">
      {!user && (
        <a 
          href="/api/auth/login" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register/Login
        </a>
      )}
      {user && (
        <div className="flex items-center gap-4">
          <span>Welcome, {user.name}!</span>
          <a 
            href="/api/auth/logout"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  )
}
