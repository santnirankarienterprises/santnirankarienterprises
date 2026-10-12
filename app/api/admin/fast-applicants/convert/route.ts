import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const {
      fastApplicantId,
      fullName,
      phone,
      email,
      selectedJobField,
      preferredJobField,
      experience = "Fresher",
      city = "Haridwar",
      resumeUrl,
    } = body;

    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, message: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "Email is required for interview scheduling." },
        { status: 400 }
      );
    }

    if (!selectedJobField || !selectedJobField.trim()) {
      return NextResponse.json(
        { success: false, message: "Please select a Job Category." },
        { status: 400 }
      );
    }

    if (!preferredJobField || !preferredJobField.trim()) {
      return NextResponse.json(
        { success: false, message: "Please select a Preferred Job." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "A user with this email already exists." },
        { status: 409 }
      );
    }

    // Default password (00000000)
    const hashedPassword = await bcrypt.hash("00000000", 12);

    await prisma.$transaction(async (tx) => {
      // 1. Create candidate user
      const user = await tx.user.create({
        data: {
          fullName: fullName.trim(),
          email: email.trim(),
          password: hashedPassword,
          role: "candidate",
          profileCompleted: false,
        },
      });

      // 2. Create CandidateProfile
      await tx.candidateProfile.create({
        data: {
          userId: user.id,
          phone: phone.trim(),
          selectedJobField: selectedJobField.trim(),
          preferredJobField: preferredJobField.trim(),
          experience: experience.trim(),
          city: city.trim(),
          resumeUrl: resumeUrl?.trim() || null,
          status: "Applied",
        },
      });

      // 3. Update FastApplicant status to CONVERTED
      if (fastApplicantId) {
        if (typeof (tx as any).fastApplicant?.update === "function") {
          await (tx as any).fastApplicant.update({
            where: { id: fastApplicantId },
            data: { status: "CONVERTED" },
          });
        } else {
          await tx.$executeRaw`
            UPDATE "FastApplicant" SET "status" = 'CONVERTED' WHERE "id" = ${fastApplicantId}
          `;
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: "Applicant successfully moved to Unpaid Candidates!",
    });
  } catch (error: any) {
    console.error("CONVERT FAST APPLICANT ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to move applicant to candidates." },
      { status: 500 }
    );
  }
}
