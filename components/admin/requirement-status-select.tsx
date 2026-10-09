"use client";

import { useState } from "react";
import { toast } from "sonner";

export function RequirementStatusSelect({ requirementId, initialStatus }: { requirementId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/requirements/${requirementId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setStatus(newStatus);
      toast.success("Requirement status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
      // Revert select back to original on failure (or just keep old state)
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      disabled={loading}
      className={`rounded-lg px-2 py-1 text-xs font-semibold outline-none ${
        status === "PENDING" ? "bg-amber-100 text-amber-700" :
        status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700" :
        "bg-emerald-100 text-emerald-700"
      }`}
    >
      <option value="PENDING">PENDING</option>
      <option value="IN_PROGRESS">IN PROGRESS</option>
      <option value="FULFILLED">FULFILLED</option>
    </select>
  );
}
