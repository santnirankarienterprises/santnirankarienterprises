// app/admin/candidates/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CandidateDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [savingResume, setSavingResume] = useState(false);
  const [feeForm, setFeeForm] = useState({ monthlySalary: "", targetAmount: "", paymentAmount: "", mode: "CASH", notes: "" });
  const [savingFee, setSavingFee] = useState(false);

  useEffect(() => {
    if (id) {
      loadCandidate();
    }
  }, [id]);

  const loadCandidate = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/candidates/${id}`
      );

      const result = await response.json();

      if (result.success) {
        setCandidate(result.candidate);
      }
    } catch (error) {
      console.error("Unable to load candidate:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) return toast.error("Choose a PDF, DOC, or DOCX resume first.");
    if (resumeFile.size > 4 * 1024 * 1024) return toast.error("Resume must be under 4MB.");
    setSavingResume(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", resumeFile);
      const uploadResponse = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploaded = await uploadResponse.json();
      if (!uploadResponse.ok || !uploaded.success || !uploaded.fileUrl) throw new Error(uploaded.message || "Upload failed.");
      const response = await fetch(`/api/admin/candidates/${id}/resume`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resumeUrl: uploaded.fileUrl }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to save resume.");
      setCandidate((current: any) => ({ ...current, resumeUrl: result.resumeUrl }));
      setResumeFile(null);
      toast.success("Resume uploaded for this candidate.");
    } catch (error: any) { toast.error(error.message || "Unable to upload resume."); }
    finally { setSavingResume(false); }
  };

  const savePlacementFee = async (event: React.FormEvent) => {
    event.preventDefault();
    const targetAmount = feeForm.targetAmount || (feeForm.monthlySalary ? String(Number(feeForm.monthlySalary) / 2) : "");
    if (targetAmount === "") return toast.error("Enter the monthly salary or the total placement fee.");
    setSavingFee(true);
    try {
      const response = await fetch(`/api/admin/candidates/${id}/placement-fee`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...feeForm, targetAmount }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to save fee record.");
      setCandidate((current: any) => ({ ...current, placementFee: result.placementFee }));
      setFeeForm((current) => ({ ...current, targetAmount, paymentAmount: "" }));
      toast.success("Placement fee record saved.");
    } catch (error: any) { toast.error(error.message || "Unable to save fee record."); }
    finally { setSavingFee(false); }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
        <div className="text-lg font-medium text-zinc-500">
          Loading candidate details...
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6">
        <h2 className="text-xl font-semibold text-zinc-900">
          Candidate not found
        </h2>

        <button
          onClick={() => router.back()}
          className="mt-5 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const fullName = candidate.user?.fullName || "Candidate";
  const email = candidate.user?.email || "Not Added";

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:text-zinc-900 sm:mb-8"
        >
          ← Back to Candidates
        </button>

        <div className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/60 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/50">
          
          {/* Candidate Header with Gradient Background */}
          <div className="relative border-b border-zinc-200/60 bg-white/40 p-6 sm:p-10 dark:border-white/10 dark:bg-zinc-800/40">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-500/10" />
            
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-extrabold text-white shadow-lg sm:h-24 sm:w-24 sm:text-4xl">
                {fullName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                  {fullName}
                </h1>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-zinc-600 sm:text-base dark:text-zinc-400">
                  <span className="flex h-6 items-center rounded-full bg-zinc-200/50 px-3 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                    {email}
                  </span>
                </p>
                
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${
                    candidate.status === "Selected" ? "bg-emerald-100 text-emerald-700" :
                    candidate.status === "Rejected" ? "bg-red-100 text-red-700" :
                    candidate.status === "Interview Scheduled" ? "bg-purple-100 text-purple-700" :
                    candidate.status === "Shortlisted" ? "bg-blue-100 text-blue-700" :
                    "bg-zinc-100 text-zinc-700"
                  }`}>
                    {candidate.status || "Applied"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">

          {/* Personal Information */}
          <section className="mb-10 rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-black/20 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Personal Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <Info label="Phone" value={candidate.phone} />
              <Info label="Gender" value={candidate.gender} />
              <Info
                label="Date of Birth"
                value={
                  candidate.dateOfBirth
                    ? String(candidate.dateOfBirth).substring(0, 10)
                    : null
                }
              />
              <Info label="City" value={candidate.city} />
              <Info label="State" value={candidate.state} />
            </div>
          </section>

          {/* Education */}
          <section className="mb-10 rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-black/20 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <div className="h-2 w-2 rounded-full bg-violet-500" />
              Education
            </h2>

            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <Info
                label="Qualification"
                value={candidate.highestQualification}
              />
              <Info
                label="College"
                value={candidate.college}
              />
              <Info
                label="Passing Year"
                value={candidate.passingYear}
              />
            </div>
          </section>

          {/* Professional Details */}
          <section className="mb-10 rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-black/20 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Professional Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <Info
                label="Experience"
                value={candidate.experience}
              />
              <Info
                label="Job Category"
                value={candidate.selectedJobField}
              />
              <Info
                label="Preferred Job"
                value={candidate.preferredJobField}
              />
              <div className="md:col-span-2">
                <Info
                  label="Skills"
                  value={candidate.skills}
                />
              </div>

              {candidate.resumeUrl ? (
                <div className="md:col-span-2 mt-4 rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <h3 className="mb-3 text-sm font-bold tracking-tight text-blue-900 dark:text-blue-200">Candidate Resume</h3>
                  <a 
                    href={candidate.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                  >
                    View & Download PDF
                  </a>
                </div>
              ) : (
                <div className="md:col-span-2 mt-4 rounded-xl border border-dashed border-amber-300 bg-amber-50 p-5">
                  <h3 className="text-sm font-bold text-amber-900">No resume uploaded</h3>
                  <p className="mt-1 text-sm text-amber-800">Upload the candidate’s resume here when they could not upload it themselves.</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} className="block w-full text-sm text-zinc-600" />
                    <button type="button" onClick={uploadResume} disabled={!resumeFile || savingResume} className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{savingResume ? "Uploading..." : "Upload Resume"}</button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] sm:p-8">
            <h2 className="mb-2 flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-900"><div className="h-2 w-2 rounded-full bg-amber-500" />Placement Fee Collection</h2>
            <p className="mb-6 text-sm text-zinc-500">Separate from premium registration payments. Set the agency fee (normally 50% of first month’s salary) and record every amount received.</p>
            {(() => { const fee = candidate.placementFee; const paid = fee?.payments?.reduce((sum: number, item: any) => sum + item.amount, 0) || 0; const target = fee?.targetAmount || 0; const remaining = Math.max(target - paid, 0); return <>
              <div className="mb-6 grid gap-3 sm:grid-cols-3"><FeeStat label="Total fee" value={target} /><FeeStat label="Collected" value={paid} color="text-emerald-700" /><FeeStat label="Remaining" value={remaining} color={remaining ? "text-amber-700" : "text-emerald-700"} /></div>
              <form onSubmit={savePlacementFee} className="grid gap-4 rounded-xl bg-zinc-50 p-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-zinc-700">First month salary (₹)<input type="number" min="0" value={feeForm.monthlySalary} onChange={(e) => setFeeForm({ ...feeForm, monthlySalary: e.target.value, targetAmount: e.target.value ? String(Number(e.target.value) / 2) : "" })} placeholder="e.g. 20000" className="mt-1 w-full rounded-lg border p-2 font-normal" /></label>
                <label className="text-sm font-semibold text-zinc-700">Total agency fee (₹)<input type="number" min="0" step="0.01" value={feeForm.targetAmount || (fee?.targetAmount ? String(fee.targetAmount / 100) : "")} onChange={(e) => setFeeForm({ ...feeForm, targetAmount: e.target.value })} placeholder="50% is filled from salary" className="mt-1 w-full rounded-lg border p-2 font-normal" /></label>
                <label className="text-sm font-semibold text-zinc-700">Payment received now (₹)<input type="number" min="0" step="0.01" value={feeForm.paymentAmount} onChange={(e) => setFeeForm({ ...feeForm, paymentAmount: e.target.value })} placeholder="Leave blank to only set fee" className="mt-1 w-full rounded-lg border p-2 font-normal" /></label>
                <label className="text-sm font-semibold text-zinc-700">Payment method<select value={feeForm.mode} onChange={(e) => setFeeForm({ ...feeForm, mode: e.target.value })} className="mt-1 w-full rounded-lg border p-2 font-normal"><option>CASH</option><option>ONLINE</option><option>UPI</option><option>BANK_TRANSFER</option></select></label>
                <label className="md:col-span-2 text-sm font-semibold text-zinc-700">Note (optional)<input value={feeForm.notes} onChange={(e) => setFeeForm({ ...feeForm, notes: e.target.value })} placeholder="e.g. 30% collected; balance due after joining" className="mt-1 w-full rounded-lg border p-2 font-normal" /></label>
                <button disabled={savingFee} className="md:col-span-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{savingFee ? "Saving..." : "Save Fee / Record Payment"}</button>
              </form>
              {fee?.payments?.length > 0 && <div className="mt-5 space-y-2">{fee.payments.map((item: any) => <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-100 p-3 text-sm"><span className="font-semibold text-emerald-700">₹{(item.amount / 100).toLocaleString("en-IN")}</span><span className="text-zinc-600">{item.mode}{item.note ? ` · ${item.note}` : ""}</span><span className="text-zinc-500">{new Date(item.receivedAt).toLocaleDateString("en-IN")}</span></div>)}</div>}
            </>; })()}
          </section>

          {/* Experience Details (Conditional) */}
          {candidate.experience === "Experienced" && (
            <section className="mb-10 rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-black/20 sm:p-8">
              <h2 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                Experience Details
              </h2>

              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <Info label="Industry" value={candidate.expIndustry} />
                <Info label="Job Profile" value={candidate.expJobProfile} />
                <Info label="Location" value={candidate.expLocation} />
                <Info label="Qualification" value={candidate.expQualification} />
                <Info label="Total Experience" value={candidate.expTotalYears} />
                <Info label="Past Salary (Per Month)" value={candidate.expPastSalary} />
                <div className="md:col-span-2">
                  <Info label="Expected Salary (Per Month)" value={candidate.expExpectedSalary} />
                </div>
              </div>
            </section>
          )}

          {/* Interview Details */}
          <section className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-black/20 sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <div className="h-2 w-2 rounded-full bg-pink-500" />
              Interview History
            </h2>

            {candidate.interviews && candidate.interviews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                {candidate.interviews.map((interview: any) => (
                  <div key={interview.id} className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white to-zinc-50/50 p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:from-zinc-900 dark:to-zinc-800/50">
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-pink-500 to-rose-500" />
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">{interview.companyName}</h3>
                      <span className="rounded-full bg-orange-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm dark:bg-orange-500/10 dark:text-orange-400">
                        {interview.status}
                      </span>
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <p className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-white/5"><span className="font-semibold text-zinc-500">Role</span> <span className="font-medium text-zinc-900 dark:text-zinc-200">{interview.designation || "Not Specified"}</span></p>
                      {interview.hrName && (
                        <p className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-white/5"><span className="font-semibold text-zinc-500">HR / Head</span> <span className="font-medium text-zinc-900 dark:text-zinc-200">{interview.hrName}</span></p>
                      )}
                      <p className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-white/5"><span className="font-semibold text-zinc-500">Date</span> <span className="font-medium text-zinc-900 dark:text-zinc-200">{new Date(interview.date).toLocaleDateString()}</span></p>
                      <p className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-white/5"><span className="font-semibold text-zinc-500">Time</span> <span className="font-medium text-zinc-900 dark:text-zinc-200">{interview.time}</span></p>
                      <p className="flex items-center justify-between pt-1"><span className="font-semibold text-zinc-500">Location</span> <span className="font-medium text-zinc-900 dark:text-zinc-200">{interview.location}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-10 text-center dark:border-white/10 dark:bg-zinc-900/20">
                <div className="mb-3 rounded-full bg-zinc-200/50 p-3 dark:bg-white/5">
                  <div className="h-6 w-6 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-zinc-500">No interviews scheduled yet.</p>
              </div>
            )}
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  const displayValue =
    value === null ||
      value === undefined ||
      value === ""
      ? "Not Added"
      : String(value);

  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition-colors hover:border-zinc-200 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-white/10 sm:p-5">
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="wrap-break-word font-medium text-zinc-900 dark:text-zinc-200">
        {displayValue}
      </p>
    </div>
  );
}

function FeeStat({ label, value, color = "text-zinc-900" }: { label: string; value: number; color?: string }) {
  return (
    <div className="rounded-xl border border-zinc-100 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${color}`}>₹{(value / 100).toLocaleString("en-IN")}</p>
    </div>
  );
}
