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
  title: "Sant Nirankari Enterprise | Premium Recruitment Consultancy",
  description: "Sant Nirankari Enterprise is a modern recruitment consultancy helping teams hire with clarity and confidence.",
  keywords: [
    "Recruitment in Haridwar", 
    "Job Consultancy", 
    "Hiring agency", 
    "Sant Nirankari Enterprise", 
    "Jobs in Uttarakhand", 
    "Placement agency",
    "Career Opportunities",
    "top placement agency in India",
    "top placement agency in Haridwar",
    "best placement agency in Uttarakhand",
    "Professional hiring agency in India",
    "Most trusted placement agency in India",
    "Recruitment services in Haridwar",
    "Staffing solutions in Uttarakhand",
    "Job placement services in Haridwar",
    "Top HR consultancy in Uttarakhand",
    "Shubham Machal",
    "shubhammachalofficial",
    "Industrial consultancy",
    "sidcul jobs",
    "Haridwar Jobs",
    "Available Sidcul Industrial Jobs",
    "onrole jobs",
    "permanent jobs",
  ],

  openGraph: {
    title: "Sant Nirankari Enterprise | Premium Recruitment Consultancy",
    description: "Sant Nirankari Enterprise is a modern recruitment consultancy helping People to get the Jobs.",
    url: "https://www.santnirankarienterprise.co.in/",
    siteName: "Sant Nirankari Enterprise",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/sant-nirankari-enterprise-logo.png",
        width: 1200,
        height: 630,
        alt: "Sant Nirankari Enterprise Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sant Nirankari Enterprise | Premium Recruitment Consultancy",
    description: "Sant Nirankari Enterprise is a modern recruitment consultancy helping People to get the Jobs.",
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
