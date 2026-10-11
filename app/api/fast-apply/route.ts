import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, resumeUrl } = body;

    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your phone number." },
        { status: 400 }
      );
    }

    if (!resumeUrl || !resumeUrl.trim()) {
      return NextResponse.json(
        { success: false, message: "Please upload your resume." },
        { status: 400 }
      );
    }

    let applicant;

    if (typeof (prisma as any).fastApplicant?.create === "function") {
      applicant = await (prisma as any).fastApplicant.create({
        data: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          resumeUrl: resumeUrl.trim(),
          status: "PENDING",
        },
      });
    } else {
      const id = "fa_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
      const now = new Date();
      await prisma.$executeRaw`
        INSERT INTO "FastApplicant" ("id", "fullName", "phone", "resumeUrl", "status", "createdAt", "updatedAt")
        VALUES (${id}, ${fullName.trim()}, ${phone.trim()}, ${resumeUrl.trim()}, 'PENDING', ${now}, ${now})
      `;
      applicant = {
        id,
        fullName: fullName.trim(),
        phone: phone.trim(),
        resumeUrl: resumeUrl.trim(),
        status: "PENDING",
        createdAt: now,
        updatedAt: now,
      };
    }

    return NextResponse.json({
      success: true,
      message: "Resume submitted successfully! Our team will contact you shortly.",
      applicant,
    });
  } catch (error) {
    console.error("FAST APPLY ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
