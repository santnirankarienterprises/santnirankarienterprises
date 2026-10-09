import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ message: "Status is required" }, { status: 400 });
    }

    const updated = await prisma.employerRequirement.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating requirement status:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
