import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get("userId");

    if (!userIdParam) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const userId = parseInt(userIdParam, 10);
    if (isNaN(userId)) {
        return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    try {
        const postureRecords = await prisma.postureRecord.findMany({
            where: { userId },
            orderBy: { startTime: "asc" },
        });

        const analyticsData = postureRecords.map(record => ({
            time: `${record.endTime.getHours().toString().padStart(2, '0')}:${record.endTime.getMinutes().toString().padStart(2, '0')}`,
            score: record.score,
        }));

        return NextResponse.json(analyticsData);
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}