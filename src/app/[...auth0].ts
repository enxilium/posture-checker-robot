import { handleAuth } from '@auth0/nextjs-auth0'
import { prisma } from '@/app/dashboard/lib/prisma'

export default handleAuth({
  afterCallback: async (req, res, session) => {
    if (session?.user) {
      // Create or update user in database
      const user = await prisma.user.upsert({
        where: { email: session.user.email },
        update: {
          name: session.user.name,
          auth0Id: session.user.sub
        },
        create: {
          email: session.user.email,
          name: session.user.name,
          auth0Id: session.user.sub
        }
      })
      
      // Enhance session with database user ID
      session.user.id = user.id
    }
    
    return session
  }
})
