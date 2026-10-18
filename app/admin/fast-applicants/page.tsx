"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  FileText,
  ExternalLink,
  Download,
  Phone,
  MessageCircle,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  RefreshCw,
  User,
  Calendar,
  UserCheck,
  X,
  Mail,
  Briefcase,
  MapPin,
  Loader2,
} from "lucide-react";
import { jobCategories } from "@/lib/job-categories";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FastApplicant = {
  id: string;
  fullName: string;
  phone: string;
  resumeUrl: string;
  status: string;
  createdAt: string;
};

export default function FastApplicantsPage() {
  const [applicants, setApplicants] = useState<FastApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Convert to Unpaid Candidate Modal State
  const [convertingApplicant, setConvertingApplicant] = useState<FastApplicant | null>(null);
  const [convertForm, setConvertForm] = useState({
    email: "",
    selectedJobField: "",
    preferredJobField: "",
    experience: "Fresher",
    city: "Haridwar",
  });
  const [isConverting, setIsConverting] = useState(false);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/fast-applicants");
      const data = await res.json();
      if (res.ok && data.success) {
        setApplicants(data.applicants || []);
      } else {
        toast.error(data.message || "Failed to fetch fast applicants");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleOpenConvertModal = (applicant: FastApplicant) => {
    setConvertingApplicant(applicant);
    setConvertForm({
      email: "",
      selectedJobField: "",
      preferredJobField: "",
      experience: "Fresher",
      city: "Haridwar",
    });
  };

  const handleConvertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingApplicant) return;

    if (!convertForm.email.trim()) {
      toast.error("Candidate email is required for interview scheduling.");
      return;
    }

    if (!convertForm.selectedJobField) {
      toast.error("Please select a Job Category.");
      return;
    }

    if (!convertForm.preferredJobField) {
      toast.error("Please select a Preferred Job.");
      return;
    }

    setIsConverting(true);

    try {
      const res = await fetch("/api/admin/fast-applicants/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fastApplicantId: convertingApplicant.id,
          fullName: convertingApplicant.fullName,
          phone: convertingApplicant.phone,
          email: convertForm.email,
          selectedJobField: convertForm.selectedJobField,
          preferredJobField: convertForm.preferredJobField,
          experience: convertForm.experience,
          city: convertForm.city,
          resumeUrl: convertingApplicant.resumeUrl,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Successfully moved to Unpaid Candidates!");
        setApplicants((prev) =>
          prev.map((a) => (a.id === convertingApplicant.id ? { ...a, status: "CONVERTED" } : a))
        );
        setConvertingApplicant(null);
      } else {
        toast.error(data.message || "Failed to convert applicant.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while converting.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleToggleStatus = async (applicant: FastApplicant) => {
    const nextStatus = applicant.status === "CONTACTED" ? "PENDING" : "CONTACTED";
    try {
      const res = await fetch("/api/admin/fast-applicants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: applicant.id, status: nextStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApplicants((prev) =>
          prev.map((a) => (a.id === applicant.id ? { ...a, status: nextStatus } : a))
        );
        toast.success(`Marked as ${nextStatus}`);
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/fast-applicants?id=${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApplicants((prev) => prev.filter((a) => a.id !== deleteId));
        toast.success("Applicant deleted successfully");
        setDeleteId(null);
      } else {
        toast.error(data.message || "Failed to delete applicant");
      }
    } catch (err) {
      toast.error("Error deleting applicant");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = applicants.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search);
    const matchesStatus =
      statusFilter === "ALL" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = applicants.length;
  const pendingCount = applicants.filter((a) => a.status === "PENDING").length;
  const contactedCount = applicants.filter((a) => a.status === "CONTACTED").length;
  const convertedCount = applicants.filter((a) => a.status === "CONVERTED").length;

  const availableJobs =
    convertForm.selectedJobField && jobCategories[convertForm.selectedJobField]
      ? jobCategories[convertForm.selectedJobField]
      : [];

  return (
    <div className="min-h-screen bg-zinc-50 pb-16">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                <Zap size={20} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                Fast Applicants
              </h1>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-700">
                {totalCount}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Resumes submitted through the homepage quick-check form
            </p>
          </div>

          <button
            onClick={fetchApplicants}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Quick Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Total Quick Resumes
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-zinc-900 sm:text-3xl">
              {totalCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Pending Review
              </p>
              <Clock size={16} className="text-amber-600" />
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-amber-800 sm:text-3xl">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Contacted
              </p>
              <Phone size={16} className="text-blue-600" />
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-blue-800 sm:text-3xl">
              {contactedCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Moved to Candidates
              </p>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-emerald-800 sm:text-3xl">
              {convertedCount}
            </h2>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                statusFilter === "ALL"
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter("PENDING")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                statusFilter === "PENDING"
                  ? "bg-amber-600 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter("CONTACTED")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                statusFilter === "CONTACTED"
                  ? "bg-blue-600 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              Contacted ({contactedCount})
            </button>
            <button
              onClick={() => setStatusFilter("CONVERTED")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                statusFilter === "CONVERTED"
                  ? "bg-emerald-600 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              Moved ({convertedCount})
            </button>
          </div>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border bg-white p-12 text-center shadow-sm">
            <RefreshCw size={24} className="animate-spin text-zinc-400" />
            <span className="ml-3 text-sm font-medium text-zinc-500">Loading fast applicants...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border bg-white p-12 text-center shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
              <FileText size={28} />
            </div>
            <h3 className="mt-4 text-base font-bold text-zinc-900">No applicants found</h3>
            <p className="mt-1 max-w-sm text-xs text-zinc-500">
              {search
                ? "No fast applicants match your search criteria."
                : "No fast resumes have been submitted yet. They will appear here when candidates submit the homepage form."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50/70 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-5 py-4">Applicant</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Submitted Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Resume</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-200">
                  {filtered.map((applicant) => (
                    <tr key={applicant.id} className="transition-colors hover:bg-zinc-50/50">
                      {/* Name */}
                      <td className="px-5 py-4 font-semibold text-zinc-900">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                            {applicant.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{applicant.fullName}</p>
                            <span className="text-[11px] text-zinc-400">ID: {applicant.id.slice(-6)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-zinc-800">{applicant.phone}</span>
                          <a
                            href={`tel:${applicant.phone}`}
                            className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-blue-600"
                            title="Call Candidate"
                          >
                            <Phone size={14} />
                          </a>
                          <a
                            href={`https://wa.me/91${applicant.phone}?text=Hi%20${encodeURIComponent(
                              applicant.fullName
                            )},%20we%20reviewed%20your%20resume%20at%20Sant%20Nirankari%20Enterprise.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-emerald-600"
                            title="WhatsApp Candidate"
                          >
                            <MessageCircle size={14} />
                          </a>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-zinc-400" />
                          <span>
                            {new Date(applicant.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Status Toggle */}
                      <td className="px-5 py-4">
                        {applicant.status === "CONVERTED" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>Moved to Candidates</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(applicant)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition ${
                              applicant.status === "CONTACTED"
                                ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            }`}
                            title="Click to toggle status"
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                applicant.status === "CONTACTED" ? "bg-blue-500" : "bg-amber-500"
                              }`}
                            />
                            <span>{applicant.status === "CONTACTED" ? "Contacted" : "Pending"}</span>
                          </button>
                        )}
                      </td>

                      {/* Resume View Option */}
                      <td className="px-5 py-4">
                        {applicant.resumeUrl ? (
                          <div className="flex items-center gap-2">
                            <a
                              href={applicant.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                            >
                              <FileText size={13} />
                              <span>View Resume</span>
                              <ExternalLink size={11} />
                            </a>

                            <a
                              href={applicant.resumeUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-800"
                              title="Download Resume"
                            >
                              <Download size={13} />
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400">No Resume</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {applicant.status !== "CONVERTED" && (
                            <button
                              onClick={() => handleOpenConvertModal(applicant)}
                              className="inline-flex items-center gap-1 rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-zinc-800 shadow-sm"
                              title="Move to Unpaid Candidates"
                            >
                              <UserCheck size={13} />
                              <span>Move to Unpaid</span>
                            </button>
                          )}

                          <button
                            onClick={() => setDeleteId(applicant.id)}
                            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete Applicant"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Convert to Unpaid Candidate Modal (Option B) */}
      {convertingApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Move to Unpaid Candidates
                </h3>
                <p className="text-xs text-zinc-500">
                  Assign job category and email so interview schedules reach the candidate.
                </p>
              </div>
              <button
                onClick={() => setConvertingApplicant(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConvertSubmit} className="mt-4 space-y-4">
              {/* Applicant Name & Phone (Read only preview) */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-zinc-50 p-3 text-xs">
                <div>
                  <span className="text-zinc-500 block">Candidate Name:</span>
                  <span className="font-bold text-zinc-900">{convertingApplicant.fullName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Phone Number:</span>
                  <span className="font-bold text-zinc-900">{convertingApplicant.phone}</span>
                </div>
              </div>

              {/* Email (Must for interview schedules) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Candidate Email <span className="text-red-500">* (Required for Interview Email)</span>
                </label>
                <div className="relative mt-1.5">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    required
                    placeholder="candidate@example.com"
                    value={convertForm.email}
                    onChange={(e) => setConvertForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-200"
                  />
                </div>
              </div>

              {/* Job Category (First dropdown) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Job Category <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <SearchableSelect
                    value={convertForm.selectedJobField}
                    onChange={(val) => {
                      setConvertForm((prev) => ({
                        ...prev,
                        selectedJobField: val,
                        preferredJobField: "",
                      }));
                    }}
                    options={Object.keys(jobCategories)}
                    placeholder="Select Job Category"
                    searchPlaceholder="Search category..."
                  />
                </div>
              </div>

              {/* Preferred Job Role (Second dropdown based on category) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Preferred Job Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <SearchableSelect
                    value={convertForm.preferredJobField}
                    onChange={(val) =>
                      setConvertForm((prev) => ({
                        ...prev,
                        preferredJobField: val,
                      }))
                    }
                    options={availableJobs}
                    disabled={!convertForm.selectedJobField}
                    placeholder={
                      convertForm.selectedJobField
                        ? "Select Preferred Role"
                        : "Select Category First"
                    }
                    disabledPlaceholder="Select Category First"
                    searchPlaceholder="Search preferred role..."
                  />
                </div>
              </div>

              {/* Experience & City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Experience
                  </label>
                  <select
                    value={convertForm.experience}
                    onChange={(e) => setConvertForm((prev) => ({ ...prev, experience: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-200"
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    City
                  </label>
                  <input
                    type="text"
                    value={convertForm.city}
                    onChange={(e) => setConvertForm((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="e.g. Haridwar"
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-200"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setConvertingApplicant(null)}
                  disabled={isConverting}
                  className="rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConverting}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-bold text-white shadow transition hover:bg-zinc-800 disabled:opacity-50"
                >
                  {isConverting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Moving to Unpaid...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck size={14} />
                      <span>Confirm & Move to Unpaid</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Fast Applicant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this applicant record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
