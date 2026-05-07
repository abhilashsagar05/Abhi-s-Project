import prisma from "./prisma";

export type ViolationType = "NO_HELMET" | "TRIPLE_RIDING" | "RED_SIGNAL" | "WRONG_WAY" | "SPEEDING";

interface Detection {
  cameraId: string;
  type: ViolationType;
  confidence: number;
  plateNumber?: string;
  evidenceUrl: string;
}

export async function registerViolation(detection: Detection) {
  try {
    const violation = await prisma.violation.create({
      data: {
        type: detection.type,
        confidence: detection.confidence,
        plateNumber: detection.plateNumber,
        evidenceUrl: detection.evidenceUrl,
        cameraId: detection.cameraId,
        location: "Detected Location", // This would ideally come from camera metadata
        status: "PENDING",
      },
    });

    // If confidence is high, we could automatically issue a challan here
    if (violation.confidence > 0.9) {
      await issueAutomatedChallan(violation.id);
    }

    return violation;
  } catch (error) {
    console.error("AI Engine Error:", error);
    throw error;
  }
}

async function issueAutomatedChallan(violationId: string) {
  // Logic to calculate fine and create challan record
  const fines: Record<string, number> = {
    NO_HELMET: 1000,
    TRIPLE_RIDING: 2000,
    RED_SIGNAL: 5000,
    WRONG_WAY: 3000,
    SPEEDING: 2000,
  };

  const violation = await prisma.violation.findUnique({ where: { id: violationId } });
  if (!violation) return;

  const amount = fines[violation.type as keyof typeof fines] || 500;

  await prisma.challan.create({
    data: {
      violationId,
      amount,
      status: "UNPAID",
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    },
  });

  await prisma.violation.update({
    where: { id: violationId },
    data: { status: "CHALLAN_ISSUED" },
  });
}
