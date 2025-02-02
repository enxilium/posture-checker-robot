import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const user1 = await prisma.user.create({
        data: {
            email: 'davideliasmb@gmail.com',
            name: 'David',
            postureRecords: {
                create: [{
                    endTime: new Date('2024-02-01T12:00:00Z'),
                    score: 100,
                }],
            },
        },
    });

}