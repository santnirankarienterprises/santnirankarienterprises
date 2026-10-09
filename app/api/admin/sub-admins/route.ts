import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await requireAdmin();
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: { id: true, fullName: true, email: true, createdAt: true }
    });
    return NextResponse.json({ success: true, admins });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching admins" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "admin",
        profileCompleted: true
      },
      select: { id: true, fullName: true, email: true, createdAt: true }
    });

    return NextResponse.json({ success: true, admin: newAdmin });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating admin" }, { status: 500 });
  }
}
