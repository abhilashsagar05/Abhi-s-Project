import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.reporterEmail || !body.violationType || !body.evidenceUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const report = await prisma.citizenReport.create({
      data: {
        reporterName: body.reporterName,
        reporterEmail: body.reporterEmail,
        violationType: body.violationType,
        location: body.location,
        description: body.description,
        evidenceUrl: body.evidenceUrl,
        status: "PENDING",
        rewardPoints: 0,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Citizen Report API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reports = await prisma.citizenReport.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
