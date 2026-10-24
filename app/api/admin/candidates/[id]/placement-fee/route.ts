import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id: candidateId } = await params;
    const body = await request.json();
    const targetAmount = Math.round(Number(body.targetAmount) * 100);
    const paymentAmount = body.paymentAmount === "" || body.paymentAmount == null ? 0 : Math.round(Number(body.paymentAmount) * 100);
    const mode = typeof body.mode === "string" ? body.mode.slice(0, 30) : "CASH";
    const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 500) : null;
    if (!Number.isFinite(targetAmount) || targetAmount < 0 || !Number.isFinite(paymentAmount) || paymentAmount < 0) {
      return NextResponse.json({ success: false, message: "Enter valid non-negative amounts." }, { status: 400 });
    }
    const candidate = await prisma.candidateProfile.findUnique({ where: { id: candidateId }, select: { id: true } });
    if (!candidate) return NextResponse.json({ success: false, message: "Candidate not found." }, { status: 404 });
    const fee = await prisma.$transaction(async (tx) => {
      const record = await tx.placementFee.upsert({
        where: { candidateId },
        create: { candidateId, targetAmount, notes },
        update: { targetAmount, notes },
      });
      if (paymentAmount > 0) {
        await tx.placementFeePayment.create({ data: { placementFeeId: record.id, amount: paymentAmount, mode, note: notes } });
      }
      return tx.placementFee.findUnique({ where: { id: record.id }, include: { payments: { orderBy: { receivedAt: "desc" } } } });
    });
    return NextResponse.json({ success: true, placementFee: fee });
  } catch (error: any) {
    if (error.message === "Unauthorized") return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    console.error("Placement fee error:", error);
    return NextResponse.json({ success: false, message: "Unable to save placement fee." }, { status: 500 });
  }
}
