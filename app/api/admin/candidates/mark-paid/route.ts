import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const body = await req.json();
    const { candidateId, amount: amountRaw } = body;
    const amount = Number(amountRaw);

    if (!candidateId) {
      return NextResponse.json({ success: false, message: "Candidate ID is required." }, { status: 400 });
    }

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ success: false, message: "Valid amount is required." }, { status: 400 });
    }

    const candidate = await prisma.candidateProfile.findFirst({
      where: {
        OR: [
          { id: candidateId },
          { userId: candidateId }
        ]
      },
      include: { user: true },
    });

    if (!candidate) {
      return NextResponse.json({ success: false, message: "Candidate not found." }, { status: 400 });
    }

    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: candidate.userId,
        status: "SUCCESS"
      }
    });

    if (existingPayment) {
      return NextResponse.json({ success: false, message: "User is already paid." }, { status: 400 });
    }

    const receiptNumber = `CASH_${Date.now()}_${candidate.userId.substring(0, 5)}`;

    const newPayment = await prisma.payment.create({
      data: {
        userId: candidate.userId,
        mode: "CASH",
        amount: amount * 100, // store in paise
        currency: "INR",
        status: "SUCCESS",
        receiptNumber: receiptNumber,
      },
    });

    const dateStr = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata', 
      dateStyle: 'long', 
      timeStyle: 'short' 
    });

    return NextResponse.json({
      success: true,
      message: "User successfully upgraded to paid.",
      payment: newPayment,
      receiptDetails: {
        amount,
        receiptNumber,
        dateStr,
        candidateName: candidate.user.fullName,
        phone: candidate.phone,
      }
    });

  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
