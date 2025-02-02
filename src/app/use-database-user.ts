import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'
import { prisma } from '@/app/prisma'

export function useDatabaseUser() {
  const { user } = useUser()

  useEffect(() => {
    if (user?.sub && user?.email) {
      const syncUser = async () => {
        await prisma.user.upsert({
          where: { auth0Id: user.sub },
          update: {},
          create: {
            auth0Id: user.sub,
            email: user.email,
            name: user.name || ''
          }
        })
      }
      syncUser()
    }
  }, [user])

  return user
}
