import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, isActive: true } });
  if (!job) return NextResponse.json({ success: false, message: "Job not found." }, { status: 404 });
  return NextResponse.json({ success: true, job });
}
