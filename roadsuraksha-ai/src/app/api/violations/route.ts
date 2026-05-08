import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  await cookies();
  try {
    const violations = await prisma.violation.findMany({
      include: {
        camera: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 50,
    });
    
    return NextResponse.json(violations);
  } catch (error) {
    console.error("Database error:", error);
    // Fallback to mock data or empty array if DB is not ready
    return NextResponse.json({ 
      error: "Database connection failed. Please ensure PostgreSQL is running.",
      usingMock: true 
    }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const violation = await prisma.violation.create({
      data: {
        type: body.type,
        confidence: body.confidence,
        evidenceUrl: body.evidenceUrl,
        plateNumber: body.plateNumber,
        location: body.location,
        cameraId: body.cameraId,
        status: 'PENDING',
      },
    });
    return NextResponse.json(violation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create violation" }, { status: 500 });
  }
}
