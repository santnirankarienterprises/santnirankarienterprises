import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const { resumeUrl } = await request.json();
    if (typeof resumeUrl !== "string" || !resumeUrl.trim()) {
      return NextResponse.json({ success: false, message: "A resume file is required." }, { status: 400 });
    }
    const candidate = await prisma.candidateProfile.update({
      where: { id }, data: { resumeUrl: resumeUrl.trim() }, select: { resumeUrl: true },
    });
    return NextResponse.json({ success: true, resumeUrl: candidate.resumeUrl });
  } catch (error: any) {
    if (error.message === "Unauthorized") return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    if (error.code === "P2025") return NextResponse.json({ success: false, message: "Candidate not found." }, { status: 404 });
    console.error("Admin resume upload error:", error);
    return NextResponse.json({ success: false, message: "Unable to save resume." }, { status: 500 });
  }
}
