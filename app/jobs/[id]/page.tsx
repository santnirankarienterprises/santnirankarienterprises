import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, Building2, MapPin, Wallet } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { JobsBrandHeader } from "@/components/jobs-brand-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, isActive: true } });
  if (!job) notFound();
  return <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#030303] dark:text-white"><JobsBrandHeader />
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6">
      <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-blue-600 dark:text-zinc-300"><ArrowLeft size={16} /> All jobs</Link>
      <article className="mt-6 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="bg-zinc-950 p-7 text-white sm:p-10"><p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] text-orange-300">{job.sequence ? `Job ${job.sequence}` : job.jobCode || job.id}</p><h1 className="mt-5 text-3xl font-bold sm:text-5xl">{job.title}</h1><p className="mt-4 flex items-center gap-2 text-white/90"><Building2 size={18} /> {job.company || "Confidential company"}</p></div>
        <div className="grid gap-5 p-7 sm:grid-cols-3 sm:p-10"><div><p className="text-xs font-bold uppercase text-zinc-500">Location</p><p className="mt-2 flex items-center gap-2 font-semibold"><MapPin size={17} className="text-blue-600" />{job.location}</p></div><div><p className="text-xs font-bold uppercase text-zinc-500">Job type</p><p className="mt-2 flex items-center gap-2 font-semibold"><BriefcaseBusiness size={17} className="text-violet-600" />{job.employmentType}</p></div><div><p className="text-xs font-bold uppercase text-zinc-500">Salary</p><p className="mt-2 flex items-center gap-2 font-semibold"><Wallet size={17} className="text-emerald-600" />{job.salary || "Not disclosed"}</p></div></div>
        <div className="border-t border-zinc-200 p-7 sm:p-10 dark:border-white/10"><h2 className="text-xl font-bold">About this role</h2><p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-600 dark:text-zinc-300">{job.description || "Contact our team for full job details and eligibility information."}</p><div className="mt-7 rounded-2xl bg-zinc-50 p-5 text-sm dark:bg-white/[0.05]"><p><span className="font-bold">Job category:</span> {job.jobCategory || "Not specified"}</p><p className="mt-2"><span className="font-bold">Preferred role:</span> {job.preferredJobField || job.title}</p>{job.experience && <p className="mt-2"><span className="font-bold">Experience:</span> {job.experience}</p>}</div><Link href={`/register?jobId=${job.id}&job=${encodeURIComponent(job.sequence ? `Job ${job.sequence}` : job.jobCode || "Job")}&title=${encodeURIComponent(job.title)}`} className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 px-6 text-sm font-bold text-white sm:w-auto">Apply for this job</Link></div>
      </article>
    </main><SiteFooter />
  </div>;
}
