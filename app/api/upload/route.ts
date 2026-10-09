import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the URL path
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
