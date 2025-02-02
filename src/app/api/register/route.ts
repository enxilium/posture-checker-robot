import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name } = body;
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        const newUser = await prisma.user.create({
            data: { email, name },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Error registering user" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ error: "Method GET not allowed" }, { status: 405 });
}