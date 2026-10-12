// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.santnirankarienterprise.co.in"),
  title: "Placement Agency in Haridwar | Best Job Consultancy in SIDCUL - Sant Nirankari Enterprise",
  description: "Top rated placement agency in Haridwar & SIDCUL. Sant Nirankari Enterprise provides industrial, manufacturing, pharma, and IT job placements across Haridwar & Uttarakhand. Apply now!",
  keywords: [
    "Placement Agency in Haridwar",
    "Best Placement Agency in Haridwar",
    "Job Consultancy in Haridwar",
    "SIDCUL Haridwar Jobs",
    "Recruitment Agency in Haridwar",
    "Placement consultancy Haridwar",
    "Manpower supplier Haridwar",
    "Hiring agency in Haridwar",
    "Sant Nirankari Enterprise",
    "Jobs in Uttarakhand",
    "Top placement agency in Uttarakhand",
    "Industrial consultancy Haridwar",
    "Sidcul industrial jobs",
    "Pharma jobs in Haridwar",
    "Manufacturing jobs in Haridwar SIDCUL",
    "Permanent jobs Haridwar",
    "Onrole jobs Haridwar",
    "Job placement services in Haridwar",
    "Staffing solutions in Uttarakhand",
    "Top HR consultancy in Haridwar",
    "Roorkee job placement",
    "Bhagwanpur industrial jobs",
  ],

  openGraph: {
    title: "Placement Agency in Haridwar | Best Job Consultancy in SIDCUL - Sant Nirankari Enterprise",
    description: "Top rated placement agency in Haridwar & SIDCUL. Connecting job seekers with leading companies in Uttarakhand.",
    url: "https://www.santnirankarienterprise.co.in/",
    siteName: "Sant Nirankari Enterprise",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/sant-nirankari-enterprise-logo.png",
        width: 1200,
        height: 630,
        alt: "Sant Nirankari Enterprise Official Logo - Placement Agency in Haridwar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Placement Agency in Haridwar | Sant Nirankari Enterprise",
    description: "Top placement agency in Haridwar & SIDCUL connecting candidates with top industrial and corporate employers.",
    images: ["/sant-nirankari-enterprise-logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sant Nirankari Enterprise",
              "url": "https://www.santnirankarienterprise.co.in",
              "logo": "https://www.santnirankarienterprise.co.in/sant-nirankari-enterprise-logo.png",
              "description": "Premium Recruitment Consultancy providing placement services and manpower in Uttarakhand and India.",
            })
          }}
        />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
