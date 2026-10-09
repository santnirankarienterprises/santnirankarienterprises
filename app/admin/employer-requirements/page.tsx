import { prisma } from "@/lib/prisma";
import { BriefcaseBusiness, Building2, Search, Users } from "lucide-react";
import { RequirementStatusSelect } from "@/components/admin/requirement-status-select";

export default async function EmployerRequirementsAdminPage() {
  const requirements = await prisma.employerRequirement.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      employerProfile: true,
    },
  });

  const totalReqs = requirements.length;
  const fulfilledReqs = requirements.filter((r) => r.status === "FULFILLED").length;
  const totalCandidatesNeeded = requirements.reduce((acc, r) => acc + r.numberOfCandidates, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Employer Requirements</h1>
          <p className="text-sm text-zinc-500">Manage all job requests posted by partner companies.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <BriefcaseBusiness size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Requests</p>
              <h3 className="text-2xl font-bold text-zinc-900">{totalReqs}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-emerald-50 p-3 text-emerald-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Candidates Needed</p>
              <h3 className="text-2xl font-bold text-zinc-900">{totalCandidatesNeeded}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-violet-50 p-3 text-violet-600">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Fulfilled Jobs</p>
              <h3 className="text-2xl font-bold text-zinc-900">{fulfilledReqs}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4">
          <div className="flex items-center gap-2 rounded-lg border bg-zinc-50 px-3 py-2">
            <Search size={18} className="text-zinc-400" />
            <input
              type="text"
              placeholder="Search by company or category..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Job Category / Role</th>
                <th className="px-6 py-4 font-medium">Candidates Needed</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requirements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                    No requirements posted yet.
                  </td>
                </tr>
              ) : (
                requirements.map((req) => (
                  <tr key={req.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-900">{req.employerProfile.companyName}</div>
                      <div className="text-xs">{req.employerProfile.employerName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-900">{req.jobCategory}</div>
                      <div className="text-xs">{req.field || req.preferredJobCategory || "General"}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-zinc-900">
                      {req.numberOfCandidates}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs">{req.employerProfile.phone}</div>
                      <div className="text-xs text-blue-600">{req.employerProfile.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <RequirementStatusSelect requirementId={req.id} initialStatus={req.status} />
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
