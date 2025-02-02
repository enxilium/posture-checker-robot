import { prisma } from '@/lib/prisma';

async function seed() {
    const users = [
        { email: 'jace@example.com', name: 'Jace' },
        { email: 'david@example.com', name: 'David' },
    ];

    for (const userData of users) {
        const user = await prisma.user.create({
            data: userData,
        });

        for (let i = 0; i < 12; i++) {
            const endTime = new Date();

            await prisma.postureRecord.create({
                data: {
                    userId: user.id,
                    endTime: endTime,
                    score: Math.floor(Math.random() * 100),
                },
            });
        }
    }

    console.log('Seeding completed.');
}

seed()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });