// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    });

// Development hot reloading makes this necessary, but in production it's not needed since all modules are only needed once.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
