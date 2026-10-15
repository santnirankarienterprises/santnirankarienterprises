import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getRazorpayClient() {
  const key_id = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)?.trim();
  const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!key_id || !key_secret) {
    return null;
  }

  return new Razorpay({ key_id, key_secret });
}

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required." }, { status: 400 });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // Prevent duplicate payment
    const existingPayment = await prisma.payment.findFirst({
      where: { userId, status: "SUCCESS" },
    });

    if (existingPayment) {
      return NextResponse.json(
        { success: false, message: "Registration payment is already completed for this account." },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return NextResponse.json(
        { success: false, message: "Payment service is currently unavailable. Please configure Razorpay keys." },
        { status: 503 }
      );
    }

    // Determine amount (Dynamic from GlobalSettings if set)
    let amount = 39900; // default ₹399 in paise
    try {
      const settings: any = await prisma.$queryRaw`SELECT value FROM "GlobalSettings" WHERE key = 'PREMIUM_FEE' LIMIT 1`;
      if (settings && settings[0]?.value) {
        const feeInRupees = parseFloat(settings[0].value);
        if (!isNaN(feeInRupees) && feeInRupees > 0) {
          amount = Math.round(feeInRupees * 100);
        }
      }
    } catch {
      // fallback to 39900
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `reg_${Date.now()}`,
      notes: {
        purpose: "Candidate Registration",
        userId: userId,
        userEmail: user.email,
      },
    });

    return NextResponse.json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);

    const errorMessage =
      error?.error?.description ||
      error?.description ||
      error?.message ||
      "Unable to create payment order.";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}