import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const users = await prisma.user.findMany({
            include: { postureRecords: true },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}