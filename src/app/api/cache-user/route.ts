import { NextResponse } from "next/server";
import * as fs from "fs/promises";
import * as path from "path";

const CACHE_FILE = path.join("/tmp", "cache_user.json");

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // body example: { userId: "1", name: "John Doe", email: "john@doe.com" }
        await fs.writeFile(CACHE_FILE, JSON.stringify(body), "utf8");
        return NextResponse.json({ message: "Cache updated" });
    } catch (error) {
        console.error("Error writing cache file:", error);
        return NextResponse.json({ error: "Error updating cache file" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const data = await fs.readFile(CACHE_FILE, "utf8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: "No cache available" }, { status: 404 });
    }
}