import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const { id } = params;

    // Prevent self-deletion if necessary (you can grab the user from the auth token in requireAdmin in a real scenario, but for now we'll just delete)
    
    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting admin" }, { status: 500 });
  }
}
