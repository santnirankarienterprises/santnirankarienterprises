// app/api/admin/candidates/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const candidate = await prisma.candidateProfile.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        interviews: {
          orderBy: { date: 'desc' }
        },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate not found.",
        },
        { status: 404 }
      );
    }

    // Placement-fee tables may be deployed after the application code. Keep
    // existing candidate details available until that migration has run.
    let placementFee = null;
    try {
      placementFee = await prisma.placementFee.findUnique({
        where: { candidateId: id },
        include: { payments: { orderBy: { receivedAt: "desc" } } },
      });
    } catch (feeError: any) {
      if (feeError?.code !== "P2021") throw feeError;
    }

    return NextResponse.json({
      success: true,
      candidate: { ...candidate, placementFee },
    });

  } catch (error: any) {
    console.error(error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (error.message === "Forbidden") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const candidate = await prisma.candidateProfile.findUnique({
      where: {
        id,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate not found.",
        },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: {
        id: candidate.userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidate deleted successfully.",
    });

  } catch (error: any) {
    console.error(error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (error.message === "Forbidden") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
