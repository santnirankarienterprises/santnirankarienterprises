import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  try {
    await requireAdmin();

    let applicants;
    if (typeof (prisma as any).fastApplicant?.findMany === "function") {
      applicants = await (prisma as any).fastApplicant.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      applicants = await prisma.$queryRaw`
        SELECT * FROM "FastApplicant" ORDER BY "createdAt" DESC
      `;
    }

    return NextResponse.json({
      success: true,
      applicants,
    });
  } catch (error: any) {
    console.error("ADMIN FAST APPLICANTS GET ERROR:", error);
    const status = error.message === "Unauthorized" ? 401 : error.message === "Forbidden" ? 403 : 500;
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch fast applicants" },
      { status }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID and status are required" },
        { status: 400 }
      );
    }

    let updated;
    if (typeof (prisma as any).fastApplicant?.update === "function") {
      updated = await (prisma as any).fastApplicant.update({
        where: { id },
        data: { status },
      });
    } else {
      const now = new Date();
      await prisma.$executeRaw`
        UPDATE "FastApplicant" SET "status" = ${status}, "updatedAt" = ${now} WHERE "id" = ${id}
      `;
      updated = { id, status, updatedAt: now };
    }

    return NextResponse.json({
      success: true,
      applicant: updated,
    });
  } catch (error: any) {
    console.error("ADMIN FAST APPLICANTS PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    if (typeof (prisma as any).fastApplicant?.delete === "function") {
      await (prisma as any).fastApplicant.delete({
        where: { id },
      });
    } else {
      await prisma.$executeRaw`
        DELETE FROM "FastApplicant" WHERE "id" = ${id}
      `;
    }

    return NextResponse.json({
      success: true,
      message: "Applicant deleted successfully",
    });
  } catch (error: any) {
    console.error("ADMIN FAST APPLICANTS DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete applicant" },
      { status: 500 }
    );
  }
}
