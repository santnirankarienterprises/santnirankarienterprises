import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const updateSchema = z.object({
  title: z.string().trim().min(2).optional(),
  company: z.string().trim().nullable().optional(),
  location: z.string().trim().min(2).optional(),
  employmentType: z.string().trim().min(2).optional(),
  description: z.string().trim().nullable().optional(),
  requirements: z.string().trim().nullable().optional(),
  salary: z.string().trim().nullable().optional(),
  experience: z.string().trim().nullable().optional(),
  openings: z.coerce.number().int().positive().nullable().optional(),
  jobCategory: z.string().trim().min(1).optional(),
  preferredJobField: z.string().trim().min(1).optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const parsed = updateSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid job details." }, { status: 400 });
    const { id } = await params;
    const job = await prisma.job.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ success: true, job });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to update job." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to delete job." }, { status: 500 });
  }
}
