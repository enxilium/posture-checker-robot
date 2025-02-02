import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from '@/app/dashboard/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res)
  
  if (!session?.user) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  switch (req.method) {
    case 'GET':
      const users = await prisma.user.findMany()
      return res.json(users)
      
    case 'POST':
      const user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          auth0Id: session.user.sub
        }
      })
      return res.json(user)
      
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
