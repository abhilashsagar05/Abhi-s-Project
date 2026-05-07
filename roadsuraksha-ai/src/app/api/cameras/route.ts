import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  await cookies();
  try {
    const cameras = await prisma.camera.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(cameras);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cameras" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const camera = await prisma.camera.create({
      data: body,
    });
    return NextResponse.json(camera, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add camera" }, { status: 500 });
  }
}
