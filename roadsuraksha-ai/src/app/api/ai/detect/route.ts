import { NextResponse } from "next/server";
import { registerViolation } from "@/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate basic requirements
    if (!body.cameraId || !body.type || !body.evidenceUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const violation = await registerViolation({
      cameraId: body.cameraId,
      type: body.type,
      confidence: body.confidence || 0.5,
      plateNumber: body.plateNumber,
      evidenceUrl: body.evidenceUrl,
    });

    return NextResponse.json({ 
      success: true, 
      violationId: violation.id,
      status: violation.status 
    }, { status: 201 });

  } catch (error) {
    console.error("Detection API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
