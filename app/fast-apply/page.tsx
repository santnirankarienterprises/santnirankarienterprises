import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import FastApplySection from "@/components/home/FastApplySection";

export const metadata = {
  title: "Fast Resume Check | Sant Nirankari Enterprise",
  description: "Upload your resume to check if we have preferred job openings matching your profile.",
};

export default function FastApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950 transition-colors duration-200 dark:bg-[#0f0f10] dark:text-zinc-50">
      <SiteNavbar />
      <main className="flex-1 pt-12">
        <FastApplySection />
      </main>
      <SiteFooter />
    </div>
  );
}
