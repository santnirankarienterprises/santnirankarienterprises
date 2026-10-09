"use client";

import { useEffect, useState } from "react";
import {
  Users,
  BriefcaseBusiness,
  Building2,
  IndianRupee,
  UserCheck,
} from "lucide-react";

import Link from "next/link";

type Candidate = {
  id: string;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
  };
};



export default function AdminDashboardPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [candidatesRes, employersRes] = await Promise.all([
          fetch("/api/admin/candidates"),
          fetch("/api/admin/employers"),
        ]);
        
        const candidatesData = await candidatesRes.json();
        const employersData = await employersRes.json();

        if (candidatesData.success) {
          setCandidates(candidatesData.candidates);
        }
        if (employersData.success) {
          setEmployers(employersData.employers);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const paidUsers = candidates.filter(
    (c) => c.user?.payments?.some((p: any) => p.status === "SUCCESS")
  ).length;

  const unpaidUsers = candidates.length - paidUsers;
  const totalUsers = candidates.length + employers.length;

  // Calculate Today's Stats
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const todayPaidUsers = candidates.filter(
    (c) => isToday(c.createdAt) && c.user?.payments?.some((p: any) => p.status === "SUCCESS")
  ).length;

  const todayUnpaidUsers = candidates.filter(
    (c) => isToday(c.createdAt) && !c.user?.payments?.some((p: any) => p.status === "SUCCESS")
  ).length;

  const todayEmployers = employers.filter(
    (e) => isToday(e.createdAt)
  ).length;

  const todayTotalUsers = todayPaidUsers + todayUnpaidUsers + todayEmployers;

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />
        <p className="mt-4 font-medium text-zinc-600">Loading... please wait</p>
      </div>
    );
  }

  return (
    <div>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">


          <Card
            title="Total Users"
            value={loading ? "..." : totalUsers.toString()}
            todayValue={loading ? undefined : todayTotalUsers.toString()}
            icon={<Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />}
          />

          <Card
            title="Paid Users"
            value={loading ? "..." : paidUsers.toString()}
            todayValue={loading ? undefined : todayPaidUsers.toString()}
            icon={<UserCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />}
          />

          <Card
            title="Unpaid Users"
            value={loading ? "..." : unpaidUsers.toString()}
            todayValue={loading ? undefined : todayUnpaidUsers.toString()}
            icon={<Users className="h-7 w-7 text-orange-600 dark:text-orange-400" />}
          />

          <Card
            title="Employers"
            value={loading ? "..." : employers.length.toString()}
            todayValue={loading ? undefined : todayEmployers.toString()}
            icon={<Building2 className="h-7 w-7 text-purple-600 dark:text-purple-400" />}
          />

          <Card
            title="Total Revenue"
            value={`₹${(
              candidates.reduce((total, c) => {
                const payments = c.user?.payments || [];
                const successfulPayments = payments.filter((p: any) => p.status === "SUCCESS");
                const amount = successfulPayments.reduce((sum: number, p: any) => sum + p.amount, 0);
                return total + amount;
              }, 0) / 100 // Divide by 100 because Razorpay amount is in paise
            ).toLocaleString("en-IN")}`}
            icon={<IndianRupee className="h-7 w-7" />}
          />

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <section className="flex h-[500px] flex-col rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Recent Registrations
            </h2>

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-2">

              {candidates.length === 0 ? (
                <p className="text-zinc-500">
                  No registrations yet.
                </p>
              ) : (

                candidates.slice(0, 5).map((candidate) => (
                  <div
                    key={candidate.id}
                    className="rounded-xl border p-4 transition hover:bg-zinc-50"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold">
                            {candidate.user.fullName}
                          </p>
                          {candidate.user?.payments?.some((p: any) => p.status === "SUCCESS") ? (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              Unpaid
                            </span>
                          )}
                        </div>

                        <p className="truncate text-sm text-zinc-500">
                          {candidate.user.email}
                        </p>
                      </div>

                      <p className="text-xs text-zinc-500 sm:text-sm">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </p>

                    </div>
                  </div>))
              )}


            </div>

            <div className="mt-4">
              <Link
                href="/admin/candidates"
                className="block w-full rounded-xl bg-zinc-900 py-3 text-center text-sm font-medium text-white hover:bg-zinc-800"
              >
                View All Candidates →
              </Link>
            </div>

          </section>

          <section className="flex h-[500px] flex-col rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="mt-6 flex flex-1 flex-col gap-4">

              <Link href="/admin/candidates?type=paid">
                <ActionButton text="Manage Paid Users" />
              </Link>

              <Link href="/admin/candidates?type=unpaid">
                <ActionButton text="Manage Unpaid Users" />
              </Link>

              <Link href="/admin/employers">
                <ActionButton text="Manage Employers" />
              </Link>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

function Card({
  title,
  value,
  todayValue,
  icon,
}: {
  title: string;
  value: string;
  todayValue?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-zinc-900/50">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
        <div className="rounded-xl bg-zinc-100 p-2.5 dark:bg-white/5">
          {icon}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {value}
        </h2>
        {todayValue !== undefined && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Today
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
              +{todayValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}


function ActionButton({
  text,
}: {
  text: string;
}) {
  return (
    <button className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-left font-medium hover:bg-zinc-100 transition">
      {text}
    </button>
  );
}
