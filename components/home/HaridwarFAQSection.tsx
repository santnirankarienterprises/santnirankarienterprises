"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MapPin, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "Which is the best placement and manpower agency in Haridwar?",
    answer:
      "Sant Nirankari Enterprise is recognized as the leading placement and manpower agency in Haridwar & SIDCUL. With direct partnerships across major industrial plants, manufacturing units, pharma corporations, and corporate offices, we provide on-role permanent jobs for candidates as well as reliable industrial manpower supply for companies across Uttarakhand.",
  },
  {
    question: "Do you provide industrial manpower supply in SIDCUL Haridwar?",
    answer:
      "Yes. Sant Nirankari Enterprise is a premier manpower supplier in Haridwar and SIDCUL industrial areas. We provide verified, skilled, semi-skilled, technical, warehouse, and packaging workforce with rapid deployment to meet your production demands.",
  },
  {
    question: "How can candidates get jobs in SIDCUL Haridwar through your agency?",
    answer:
      "Candidates can apply instantly through our Fast Apply portal or Complete their Registration. Once submitted, our HR team matches your profile, skills, and qualifications with active vacancies in top SIDCUL industrial sectors and schedules direct interview rounds with hiring companies.",
  },
  {
    question: "What types of jobs and manpower profiles are available?",
    answer:
      "We provide placements and manpower supply across diverse sectors in Haridwar, including Pharmaceutical (QA/QC, Production), Automobile & Mechanical Engineering, Electrical, FMCG, Packaging, Store & Warehouse Management, Quality Inspection, Accounts, and Office Administration.",
  },
  {
    question: "Where is Sant Nirankari Enterprise located in Haridwar?",
    answer:
      "Our main consultancy office is conveniently located Near Raja Biscuit Chowk and Jasmine Hotel, SIDCUL, Haridwar, Uttarakhand (PIN: 249402). You can also contact us directly at +91 7088642658 or via email at jobs.santnirankarienterprises@gmail.com.",
  },
];

export default function HaridwarFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative overflow-hidden bg-zinc-50/80 py-24 dark:bg-zinc-950/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Placement & Manpower Consultancy Guidance</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Frequently Asked Questions — Placement & Manpower in Haridwar
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Everything you need to know about job placements, industrial manpower supply in SIDCUL, and staffing solutions in Haridwar with Sant Nirankari Enterprise.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-zinc-900 transition-colors hover:text-blue-600 sm:p-6 dark:text-zinc-100 dark:hover:text-blue-400"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-zinc-600 sm:px-6 sm:pb-6 dark:border-zinc-800/80 dark:text-zinc-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Local Anchor Card */}
        <div className="mt-12 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-emerald-50/50 p-6 text-center dark:border-blue-900/30 dark:from-blue-950/20 dark:via-zinc-900 dark:to-emerald-950/20">
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <strong className="text-zinc-950 dark:text-white">Sant Nirankari Enterprise:</strong> Near Raja Biscuit Chowk and Jasmine hotel, SIDCUL, Haridwar,249402
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
