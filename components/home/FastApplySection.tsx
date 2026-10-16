"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Phone,
  User,
  AlertCircle,
  Loader2,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function FastApplySection() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (file: File | null) => {
    setError("");
    if (!file) {
      setResumeFile(null);
      return;
    }

    const MAX_SIZE = 4 * 1024 * 1024; // 4MB
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setError(`File size is ${sizeMB}MB. Please compress your resume or upload a document under 4MB.`);
      setResumeFile(null);
      return;
    }

    const ext = file.name ? file.name.split(".").pop()?.toLowerCase() : "";
    const mime = file.type ? file.type.toLowerCase() : "";
    const isPdf = ext === "pdf" || mime === "application/pdf" || mime.includes("pdf");
    const isDoc =
      ["doc", "docx"].includes(ext || "") ||
      mime.includes("word") ||
      mime === "application/msword" ||
      mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isPdf && !isDoc) {
      setError("Please upload a PDF file (PDF is preferred; .docx and .doc are also supported).");
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!resumeFile) {
      setError("Please upload your resume (PDF preferred, max 4MB).");
      return;
    }

    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 seconds timeout protection

    try {
      // 1. Upload resume
      const formData = new FormData();
      formData.append("file", resumeFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let uploadData: { success?: boolean; fileUrl?: string; message?: string } | null = null;
      const resText = await uploadRes.text();
      try {
        uploadData = JSON.parse(resText);
      } catch {
        // Server returned non-JSON HTML/text
      }

      if (!uploadRes.ok || !uploadData?.success) {
        const errMsg =
          uploadData?.message ||
          (uploadRes.status === 413
            ? "Your resume file is too large for the server. Please compress your PDF to under 3.5MB."
            : uploadRes.status >= 500
            ? "Upload server error. Please try again shortly or use a compressed PDF."
            : "Failed to upload resume. Please try again.");
        setError(errMsg);
        setLoading(false);
        return;
      }

      // 2. Submit fast applicant record
      const applyRes = await fetch("/api/fast-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          resumeUrl: uploadData.fileUrl,
        }),
      });

      const applyData = await applyRes.json();

      if (!applyRes.ok || !applyData.success) {
        setError(applyData.message || "Failed to submit application.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFullName("");
      setPhone("");
      setResumeFile(null);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("Fast apply upload error:", err);
      if (err.name === "AbortError") {
        setError("Upload timed out due to a slow mobile connection. Please ensure your mobile data is active or try a smaller PDF file.");
      } else {
        setError("Network connection issue. Please check your internet connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="fast-apply" className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-white via-zinc-50 to-white dark:from-[#0a0a0c] dark:via-[#0f0f12] dark:to-[#0a0a0c]">
      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles size={13} className="text-blue-500" />
            <span>Fast Candidate Check</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
            Upload Your Resume To Check If We Have{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              Your Preferred Requirements
            </span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Not sure if we have matching job openings for your skills? Simply drop your resume and contact number below. Our recruitment team will review your profile within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-10 mx-auto max-w-xl">
          <div className="relative rounded-3xl border border-zinc-200/80 bg-white/80 p-6 sm:p-8 shadow-xl shadow-zinc-200/50 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
            {success ? (
              <div className="py-8 text-center animate-in fade-in duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>

                <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
                  Resume Submitted Successfully!
                </h3>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Our HR team is checking open opportunities against your resume. We will contact you on your phone number shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Your Full Name
                  </label>
                  <div className="relative mt-1.5">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative mt-1.5">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600"
                    />
                  </div>
                </div>

                {/* Resume Upload Box */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Upload Resume
                    </label>
                    <span className="text-[11px] font-medium text-zinc-500">
                      PDF Preferred (Max 4MB)
                    </span>
                  </div>

                  <div className={`mt-1.5 relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition-all ${
                    resumeFile
                      ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10"
                      : "border-zinc-200 bg-zinc-50/50 hover:border-blue-400 hover:bg-blue-50/30 dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-zinc-700"
                  }`}>
                    <input
                      type="file"
                      accept="application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />

                    {resumeFile ? (
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 size={20} />
                        </div>
                        <p className="mt-2 text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[200px] sm:max-w-[320px]">
                          {resumeFile.name}
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <Upload size={18} />
                        </div>
                        <p className="mt-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          Drop your resume here, or <span className="text-blue-600 underline">browse</span>
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          Supports PDF, DOCX (Max 4MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:opacity-95 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Checking & Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span>Check My Resume Matching</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Fast Track Note & Buttons */}
            <div className="mt-6 border-t border-zinc-200/80 pt-5 dark:border-white/10">
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 dark:bg-amber-500/10">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Zap size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                      Want your job interview and requirement filled fast?
                    </h4>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      Create your full profile and complete registration to get direct interview call scheduling and premium recruiter placement!
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Link
                    href="/register"
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-zinc-950 transition hover:bg-amber-400 shadow-sm"
                  >
                    <UserPlus size={13} />
                    <span>Create Your Profile</span>
                  </Link>

                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    <LogIn size={13} />
                    <span>Already Created? Login</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
