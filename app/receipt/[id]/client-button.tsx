"use client";

import { Download } from "lucide-react";

export default function ClientReceiptButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}
