-- Agency placement fee tracking. Amounts are stored in paise.
CREATE TABLE "PlacementFee" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "targetAmount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PlacementFee_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PlacementFeePayment" (
    "id" TEXT NOT NULL,
    "placementFeeId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'CASH',
    "note" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlacementFeePayment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PlacementFee_candidateId_key" ON "PlacementFee"("candidateId");
ALTER TABLE "PlacementFee" ADD CONSTRAINT "PlacementFee_candidateId_fkey"
  FOREIGN KEY ("candidateId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PlacementFeePayment" ADD CONSTRAINT "PlacementFeePayment_placementFeeId_fkey"
  FOREIGN KEY ("placementFeeId") REFERENCES "PlacementFee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
