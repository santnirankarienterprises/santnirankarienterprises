import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const jobSchema = z.object({
  title: z.string().trim().min(2),
  company: z.string().trim().optional().nullable(),
  location: z.string().trim().min(2),
  employmentType: z.string().trim().min(2),
  description: z.string().trim().optional().nullable(),
  requirements: z.string().trim().optional().nullable(),
  salary: z.string().trim().optional().nullable(),
  experience: z.string().trim().optional().nullable(),
  openings: z.union([z.coerce.number().int().positive(), z.literal("")]).optional().transform((value) => value === "" ? null : value),
  jobCategory: z.string().trim().min(1),
  preferredJobField: z.string().trim().min(1),
  isActive: z.boolean().optional(),
});

export async function GET() {
  try {
    await requireAdmin();
    const jobs = await prisma.job.findMany({
      include: { _count: { select: { applications: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const parsed = jobSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Please complete all required job details." }, { status: 400 });
    }
    const latestJob = await prisma.job.findFirst({ orderBy: { sequence: "desc" }, select: { sequence: true } });
    const sequence = (latestJob?.sequence || 0) + 1;
    const job = await prisma.job.create({
      data: {
        ...parsed.data,
        company: parsed.data.company || null,
        sequence,
        jobCode: `Job ${sequence}`,
      },
    });
    return NextResponse.json({ success: true, job }, { status: 201 });
  } catch (error) {
    console.error("Job creation failed:", error);
    const detail = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json(
      {
        success: false,
        message: process.env.NODE_ENV === "development" ? detail : "Unable to create job.",
      },
      { status: 500 }
    );
  }
}
