import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, endTime, score } = body;
        if (!userId || !endTime || !score) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // If endTime is like "13:00" then combine with today's date
        let parsedEndTime: Date;
        const timePattern = /^\d{2}:\d{2}$/;
        if (timePattern.test(endTime)) {
            const today = new Date();
            const [hours, minutes] = endTime.split(":").map(Number);
            today.setHours(hours, minutes, 0, 0);
            parsedEndTime = today;
        } else {
            parsedEndTime = new Date(endTime);
        }

        const newRecord = await prisma.postureRecord.create({
            data: {
                user: { connect: { id: Number(userId) } },
                endTime: parsedEndTime,
                score: Number(score),
            },
        });
        return NextResponse.json(newRecord, { status: 201 });
    } catch (error) {
        console.error("Error creating posture record:", error);
        return NextResponse.json({ error: "Error creating posture record" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json(
        { error: "Method GET not allowed on this endpoint" },
        { status: 405 }
    );
}