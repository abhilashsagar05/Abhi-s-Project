-- CreateTable
CREATE TABLE "CitizenReport" (
    "id" TEXT NOT NULL,
    "reporterName" TEXT NOT NULL,
    "reporterEmail" TEXT NOT NULL,
    "violationType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "evidenceUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CitizenReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CitizenReport_reporterEmail_idx" ON "CitizenReport"("reporterEmail");
