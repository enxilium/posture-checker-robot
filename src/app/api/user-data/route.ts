import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
            { error: "Missing userId query parameter" },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: { id: true, email: true, name: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json(
            { error: "Error fetching user data" },
            { status: 500 }
        );
    }
}