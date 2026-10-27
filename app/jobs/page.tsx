import Link from "next/link";
import { BriefcaseBusiness, Building2, Clock3, MapPin, Users, Wallet } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { JobsBrandHeader } from "@/components/jobs-brand-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#030303] dark:text-white">
      <JobsBrandHeader />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <BriefcaseBusiness size={15} /> Current openings
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight sm:text-5xl">Find your next opportunity</h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Explore verified jobs from Sant Nirankari Enterprise and apply in just a few steps.</p>
        </div>

        {jobs.length === 0 ? (
          <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/[0.03]">
            <BriefcaseBusiness className="mx-auto text-blue-600" size={34} />
            <h2 className="mt-4 text-xl font-bold">No jobs are posted right now</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Please check back soon for new opportunities.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <article key={job.id} className="flex flex-col rounded-[30px] border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-start justify-between"><span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold text-orange-600">{job.sequence ? `Job ${job.sequence}` : job.jobCode || "Job"}</span><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500"><BriefcaseBusiness size={21} /></div></div>
                <h2 className="mt-9 text-2xl font-bold">{job.title}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300"><Building2 size={15} />{job.company || "Confidential company"}</p>
                <div className="mt-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <p className="flex items-center gap-2"><MapPin size={16} className="text-blue-600" /> {job.location}</p>
                  <p className="flex items-center gap-2"><Clock3 size={16} className="text-violet-600" /> {job.experience || job.employmentType}</p>
                  {job.salary && <p className="flex items-center gap-2"><Wallet size={16} className="text-emerald-600" /> {job.salary}</p>}
                  {job.openings && <p className="flex items-center gap-2"><Users size={16} className="text-orange-500" /> {job.openings} opening{job.openings > 1 ? "s" : ""}</p>}
                </div>
                {job.description && <p className="mt-5 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{job.description}</p>}
                <div className="mt-7 flex items-center justify-between border-t pt-5"><span className="text-sm font-semibold text-zinc-400">{job.preferredJobField || job.employmentType}</span><Link href={`/jobs/${job.id}`} className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700">View details →</Link></div>
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
