import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { UTApi } from "uploadthing/server";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 1. File Type Validation (PDF preferred, DOC/DOCX supported)
    // Validate using both extension and MIME type for mobile browser compatibility
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const rawName = file.name || "resume.pdf";
    let ext = path.extname(rawName).toLowerCase();
    const mimeType = (file.type || "").toLowerCase();

    const isPdf =
      ext === ".pdf" ||
      mimeType === "application/pdf" ||
      mimeType.includes("pdf");

    const isDoc =
      ext === ".doc" ||
      ext === ".docx" ||
      mimeType.includes("msword") ||
      mimeType.includes("wordprocessingml") ||
      mimeType.includes("officedocument");

    if (!isPdf && !isDoc) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please upload a PDF file (PDF is preferred; .docx and .doc are also supported).",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Standardize extension if missing on mobile file pickers
    if (!ext || !allowedExtensions.includes(ext)) {
      ext = isPdf ? ".pdf" : ".docx";
    }

    // 2. File Size Validation (Max 4MB to stay safely under Vercel serverless limit)
    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        {
          success: false,
          message: `File size is ${sizeMB}MB. Please upload a document under 4MB.`,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Sanitize filename for safe storage and mobile compatibility
    const baseName = path
      .basename(rawName, path.extname(rawName))
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 50);
    const safeFileName = `${baseName || "resume"}${ext}`;

    const fileBuffer = await file.arrayBuffer();
    const safeFile = new File([fileBuffer], safeFileName, {
      type: isPdf ? "application/pdf" : mimeType || "application/octet-stream",
    });

    // 3. Try uploading to UploadThing if token is provided
    if (process.env.UPLOADTHING_TOKEN) {
      try {
        const utapi = new UTApi();
        const response = await utapi.uploadFiles(safeFile);

        const resObj = Array.isArray(response) ? response[0] : response;
        const fileUrl =
          resObj?.data?.ufsUrl ||
          resObj?.data?.url ||
          (resObj as any)?.data?.appUrl;

        if (fileUrl) {
          return NextResponse.json({
            success: true,
            fileUrl,
            provider: "uploadthing",
          }, { headers: corsHeaders });
        }

        if (resObj?.error) {
          console.error("UploadThing server error:", resObj.error);
        }
      } catch (utError) {
        console.error("UploadThing failed, checking fallback:", utError);
      }
    }

    // 4. Serverless vs Local Storage Fallback
    const isVercel =
      process.env.VERCEL === "1" ||
      !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NODE_ENV === "production";

    // On Vercel / serverless production, writing to public/uploads fails (read-only filesystem)
    if (isVercel) {
      console.error(
        "Upload failed on production: Cloud storage did not return a URL."
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume upload could not be completed. Please ensure your file is under 4MB and try again, or check your connection.",
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Local storage fallback for local development only
    const buffer = Buffer.from(fileBuffer);
    const filename = `${Date.now()}_${safeFileName}`;
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
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("UPLOAD ROUTE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Upload failed. Please check your connection and try again.",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
