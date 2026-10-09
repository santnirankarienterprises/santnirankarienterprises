"use client";

import { useState } from "react";
import { Building2, Plus, Sparkles, UserCheck } from "lucide-react";
import { toast } from "sonner";

export function RequirementForm({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [jobCategory, setJobCategory] = useState("");
  const [preferredCategory, setPreferredCategory] = useState("");
  const [candidates, setCandidates] = useState("");
  const [field, setField] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobCategory || !candidates) {
      toast.error("Please fill in the required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/employer/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          jobCategory,
          preferredJobCategory: preferredCategory,
          numberOfCandidates: candidates,
          field,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      toast.success("Requirement posted successfully!");
      setJobCategory("");
      setPreferredCategory("");
      setCandidates("");
      setField("");
      window.location.reload(); // Refresh to show the new requirement
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[24px] border border-emerald-500/20 bg-white/50 p-6 backdrop-blur-xl shadow-lg dark:border-emerald-500/10 dark:bg-zinc-900/50">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 text-white shadow-sm">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Post New Requirement</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Request candidates for a specific role or field.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Job Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              placeholder="e.g. IT, Manufacturing, Healthcare"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-black/50 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Specific Field/Role
            </label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. Frontend Developer, CNC Operator"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-black/50 dark:text-white"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Number of Candidates <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              value={candidates}
              onChange={(e) => setCandidates(e.target.value)}
              placeholder="e.g. 5"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-black/50 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Preferred Qualification
            </label>
            <input
              type="text"
              value={preferredCategory}
              onChange={(e) => setPreferredCategory(e.target.value)}
              placeholder="e.g. B.Tech, ITI, Diploma"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-black/50 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          ) : (
            <>
              <Plus size={18} />
              Submit Requirement
            </>
          )}
        </button>
      </form>
    </div>
  );
}
