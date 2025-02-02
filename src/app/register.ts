import { handleAuth, handleCallback } from '@auth0/nextjs-auth0'
import { prisma } from '@/app/lib/prisma'

export default handleAuth({
  async callback(req, res) {
    const { response, session } = await handleCallback(req, res)
    
    if (session?.user) {
      const user = await prisma.user.upsert({
        where: { 
          email: session.user.email 
        },
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
    }
    return response
  }
})
