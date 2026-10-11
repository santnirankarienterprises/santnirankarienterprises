import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { UTApi } from "uploadthing/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // 1. File Type Validation (PDF preferred, DOC/DOCX supported)
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.name).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload a PDF file (PDF is preferred; .docx and .doc are also supported).",
        },
        { status: 400 }
      );
    }

    // 2. File Size Validation (Max 3MB)
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        {
          success: false,
          message: `File size is ${sizeMB}MB. Only documents under 3MB are allowed.`,
        },
        { status: 400 }
      );
    }

    // 1. Try uploading to UploadThing if token is provided
    if (process.env.UPLOADTHING_TOKEN) {
      try {
        const utapi = new UTApi();
        const response = await utapi.uploadFiles(file);

        const fileUrl = response?.data?.ufsUrl || response?.data?.url;

        if (fileUrl) {
          return NextResponse.json({
            success: true,
            fileUrl,
            provider: "uploadthing",
          });
        }

        if (response?.error) {
          console.error("UploadThing server error:", response.error);
        }
      } catch (utError) {
        console.error("UploadThing failed, using local storage fallback:", utError);
      }
    }

    // 2. Fallback to local storage (e.g. during local dev or when token is not yet configured)
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      fileUrl,
      provider: "local",
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
