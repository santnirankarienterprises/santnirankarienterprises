import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ success: false, message: "No signature provided." }, { status: 400 });
    }

    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
      console.warn("RAZORPAY_WEBHOOK_SECRET is not configured.");
      return NextResponse.json({ success: false, message: "Webhook secret is not configured on the server." }, { status: 500 });
    }

    // Verify Webhook Signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ success: false, message: "Invalid signature." }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // We only care about payment.captured for now
    if (event.event !== "payment.captured") {
      return NextResponse.json({ success: true, message: "Event ignored." });
    }

    const paymentData = event.payload.payment.entity;
    const razorpay_order_id = paymentData.order_id;
    const razorpay_payment_id = paymentData.id;
    const amount = Number(paymentData.amount);
    const currency = paymentData.currency;
    
    // In our create-order, we need a way to know the userId. 
    // Razorpay allows adding "notes" to an order. 
    // If the userId isn't in notes, we can try to find the payment by order_id if it was created as PENDING earlier.
    // Assuming the user's email or phone is passed, or order is already in DB.
    
    // For now, let's just find the existing payment by orderId if verify hit first.
    let existingPayment = await prisma.payment.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      include: { user: true }
    });

    if (existingPayment && existingPayment.status === "SUCCESS") {
       // Already processed by frontend /api/payment/verify
       return NextResponse.json({ success: true, message: "Payment already processed." });
    }

    // If payment doesn't exist, we ideally need the userId from the notes
    const userId = paymentData.notes?.userId;
    if (!userId && !existingPayment) {
        console.error("Webhook received but no userId found in notes or database.", paymentData);
        return NextResponse.json({ success: false, message: "User ID missing." }, { status: 400 });
    }

    const targetUserId = existingPayment ? existingPayment.userId : userId;

    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, fullName: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // 1. Upsert Database (Fix Race Condition)
    const generatedReceipt = `SSMS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentRecord = await prisma.payment.upsert({
      where: { razorpayOrderId: razorpay_order_id },
      update: {
        razorpayPaymentId: razorpay_payment_id,
        status: "SUCCESS",
      },
      create: {
        userId: user.id,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        receiptNumber: generatedReceipt,
        amount: amount,
        currency: currency,
        status: "SUCCESS",
      },
    });

    const finalReceiptNumber = paymentRecord.receiptNumber || generatedReceipt;

    // 2. Generate PDF & Email Async
    // We send this in the background to not block the Razorpay webhook timeout
    sendReceiptEmail(user, paymentRecord, finalReceiptNumber).catch(console.error);

    return NextResponse.json({ success: true, message: "Webhook processed successfully." });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, message: "Webhook failed." }, { status: 500 });
  }
}

async function sendReceiptEmail(user: any, paymentRecord: any, finalReceiptNumber: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // PDF Generation
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const { width, height } = page.getSize();

    const black = rgb(0.05, 0.05, 0.05);
    const darkGray = rgb(0.25, 0.25, 0.25);
    const gray = rgb(0.45, 0.45, 0.45);
    const lightGray = rgb(0.90, 0.90, 0.90);
    const green = rgb(0.05, 0.45, 0.18);

    const drawCenteredText = (text: string, y: number, size: number, font: typeof regularFont, color = black) => {
      const textWidth = font.widthOfTextAtSize(text, size);
      page.drawText(text, { x: (width - textWidth) / 2, y, size, font, color });
    };

    const drawBox = (x: number, y: number, w: number, h: number) => {
      page.drawRectangle({ x, y, width: w, height: h, borderColor: lightGray, borderWidth: 1, color: rgb(1, 1, 1) });
    };

    drawCenteredText("SANT NIRANKARI ENTERPRISE", height - 55, 20, boldFont, black);
    drawCenteredText("PAYMENT RECEIPT", height - 135, 24, boldFont, black);

    const summaryX = 35;
    const summaryY = 585;
    drawBox(summaryX, summaryY, 525, 100);
    page.drawText("Receipt Number:", { x: summaryX + 20, y: summaryY + 70, size: 10, font: boldFont });
    page.drawText(finalReceiptNumber, { x: summaryX + 20, y: summaryY + 50, size: 10, font: regularFont });

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    await resend.emails.send({
      from: "Sant Nirankari Enterprises <info@santnirankarienterprises.in>",
      to: user.email,
      replyTo: "santnirankarienterprises1133@gmail.com",
      subject: "Payment Receipt - Sant Nirankari Enterprise",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #18181b;">
          <h2>Sant Nirankari Enterprise</h2>
          <p>Dear ${user.fullName},</p>
          <p>Your payment of INR ${(paymentRecord.amount / 100).toFixed(2)} was successful.</p>
          <p>Receipt attached.</p>
        </div>
      `,
      attachments: [{ filename: `${finalReceiptNumber}.pdf`, content: pdfBuffer }],
    });
}
