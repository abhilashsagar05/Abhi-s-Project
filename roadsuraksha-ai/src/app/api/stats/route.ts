import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  await cookies();
  try {
    // Parallelizing queries for performance
    const [totalViolations, activeCameras, pendingChallans] = await Promise.all([
      prisma.violation.count(),
      prisma.camera.count({ where: { status: 'ONLINE' } }),
      prisma.challan.count({ where: { status: 'PENDING' } }),
    ]);

    return NextResponse.json({
      totalViolations,
      activeCameras,
      pendingChallans,
      accuracy: 99.2, // This would usually come from an AI metrics table
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
