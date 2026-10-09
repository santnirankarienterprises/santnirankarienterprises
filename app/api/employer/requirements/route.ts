import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, jobCategory, preferredJobCategory, numberOfCandidates, field } = body;

    if (!userId || !jobCategory || !numberOfCandidates) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Find the EmployerProfile for this user
    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId },
    });

    if (!employerProfile) {
      return NextResponse.json({ message: "Employer profile not found" }, { status: 404 });
    }

    // Create the requirement
    const requirement = await prisma.employerRequirement.create({
      data: {
        employerProfileId: employerProfile.id,
        jobCategory,
        preferredJobCategory,
        numberOfCandidates: parseInt(numberOfCandidates, 10),
        field,
        status: "PENDING",
      },
    });

    return NextResponse.json({ requirement, message: "Requirement added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating requirement:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId },
      include: {
        requirements: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!employerProfile) {
      return NextResponse.json({ message: "Employer profile not found" }, { status: 404 });
    }

    return NextResponse.json({ requirements: employerProfile.requirements }, { status: 200 });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
