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
} from "lucide-react";
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
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Contacted / Called
              </p>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-emerald-800 sm:text-3xl">
              {contactedCount}
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

          <div className="flex items-center gap-2">
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
                  ? "bg-emerald-600 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              Contacted ({contactedCount})
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
                        <button
                          onClick={() => handleToggleStatus(applicant)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition ${
                            applicant.status === "CONTACTED"
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          }`}
                          title="Click to toggle status"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              applicant.status === "CONTACTED" ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          <span>{applicant.status === "CONTACTED" ? "Contacted" : "Pending"}</span>
                        </button>
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
                        <button
                          onClick={() => setDeleteId(applicant.id)}
                          className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete Applicant"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

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
