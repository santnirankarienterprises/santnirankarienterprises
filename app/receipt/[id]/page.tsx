import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Download } from "lucide-react";
import ClientReceiptButton from "./client-button";

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const payment = await prisma.payment.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!payment) {
    notFound();
  }

  const candidate = payment.user.profile;
  const amount = payment.amount / 100; // stored in paise
  const dateStr = payment.createdAt.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = payment.createdAt.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-10 flex flex-col items-center justify-center font-sans">
      
      {/* Action Buttons (Hidden when printing) */}
      <div className="print:hidden flex gap-4 mb-6 w-full max-w-2xl justify-end">
        <ClientReceiptButton />
      </div>

      {/* The Printable Receipt Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:w-full print:max-w-full">
        
        {/* Header Ribbon */}
        <div className="h-3 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 print:hidden" />
        
        <div className="p-8 sm:p-12">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-zinc-100 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full print:bg-transparent print:p-0">
                  <CheckCircle2 size={24} className="print:hidden" />
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Payment Receipt</h1>
              </div>
              <p className="text-sm font-medium text-zinc-500 sm:ml-12 print:ml-0">Official Document</p>
            </div>

            <div className="text-left sm:text-right flex flex-col sm:items-end">
              <div className="relative h-14 w-40 mb-2">
                <Image
                  src="/sant-nirankari-enterprise-logo.png"
                  alt="Sant Nirankari Enterprise"
                  fill
                  className="object-contain object-left sm:object-right"
                />
              </div>
              <h2 className="text-lg font-bold text-zinc-900 tracking-tight">Sant Nirankari Enterprise</h2>
              <p className="text-sm text-zinc-500">Manpower & Placement Services</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Candidate Info */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Billed To</h3>
              <p className="text-lg font-semibold text-zinc-900">{payment.user.fullName}</p>
              {candidate?.phone && <p className="text-zinc-600 text-sm mt-1">{candidate.phone}</p>}
              <p className="text-zinc-600 text-sm mt-1">{payment.user.email}</p>
            </div>

            {/* Payment Info */}
            <div className="sm:text-right">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Receipt Details</h3>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-zinc-600"><span className="font-semibold text-zinc-900">Receipt No:</span> {payment.receiptNumber || payment.id.slice(-8).toUpperCase()}</p>
                <p className="text-sm text-zinc-600"><span className="font-semibold text-zinc-900">Date:</span> {dateStr}</p>
                <p className="text-sm text-zinc-600"><span className="font-semibold text-zinc-900">Time:</span> {timeStr}</p>
                <p className="text-sm text-zinc-600">
                  <span className="font-semibold text-zinc-900">Payment Mode:</span>{" "}
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 print:border print:border-emerald-700 print:bg-transparent">
                    {payment.mode}
                  </span>
                </p>
              </div>
            </div>

          </div>

          {/* Line Items */}
          <div className="mt-4 rounded-xl border border-zinc-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Description</th>
                  <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-zinc-900">Registration Fees </p>
                    <p className="text-sm text-zinc-500 mt-1">Recruitment & placement assistance</p>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-zinc-900">
                    ₹{amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-zinc-50 border-t border-zinc-200">
                <tr>
                  <td className="py-4 px-4 text-right font-bold text-zinc-900">Total Paid</td>
                  <td className="py-4 px-4 text-right text-xl font-bold text-emerald-600 print:text-black">
                    ₹{amount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500 font-medium">Thank you for choosing Sant Nirankari Enterprise.</p>
            <p className="text-xs text-zinc-400 mt-1">This is a computer-generated receipt and requires no signature.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
