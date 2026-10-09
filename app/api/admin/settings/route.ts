import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  try {
    await requireAdmin();
    // Use raw query to bypass Prisma Client generation error on Windows
    const settings: any = await prisma.$queryRaw`SELECT * FROM "GlobalSettings"`;
    
    // Default values if not in DB yet
    let premiumFee = "499";
    
    for (const s of settings) {
      if (s.key === "PREMIUM_FEE") premiumFee = s.value;
    }

    return NextResponse.json({ success: true, settings: { premiumFee } });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { premiumFee } = await req.json();

    if (premiumFee) {
      const feeStr = premiumFee.toString();
      // UPSERT equivalent using raw SQL for PostgreSQL
      await prisma.$executeRaw`
        INSERT INTO "GlobalSettings" (id, key, value) 
        VALUES (gen_random_uuid()::text, 'PREMIUM_FEE', ${feeStr}) 
        ON CONFLICT (key) DO UPDATE SET value = ${feeStr}
      `;
    }

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating settings" }, { status: 500 });
  }
}
