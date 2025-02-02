import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ error: "Error logging in" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ error: "Method GET not allowed" }, { status: 405 });
}