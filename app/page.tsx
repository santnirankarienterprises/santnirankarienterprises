import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import HowItWorks from "@/components/home/HowItWorks";
import { HeroSection } from "@/components/hero-section";
import FastApplySection from "@/components/home/FastApplySection";
import RegistrationCTA from "@/components/home/RegistrationCTA";
import WhyCandidatesChooseUs from "@/components/home/WhyCandidatesChooseUs";
import CompaniesSection from "@/components/home/CompaniesSection";
import ContactSection from "@/components/home/ContactSection";
import HaridwarFAQSection from "@/components/home/HaridwarFAQSection";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EmploymentAgency',
        '@id': 'https://www.santnirankarienterprise.co.in/#agency',
        name: 'Sant Nirankari Enterprise - Placement Agency in Haridwar',
        alternateName: [
          'Sant Nirankari Enterprise',
          'Job Consultancy in Haridwar',
          'Placement Agency in SIDCUL Haridwar'
        ],
        url: 'https://www.santnirankarienterprise.co.in/',
        logo: 'https://www.santnirankarienterprise.co.in/sant-nirankari-enterprise-logo.png',
        image: 'https://www.santnirankarienterprise.co.in/sant-nirankari-enterprise-logo.png',
        description: 'Leading placement agency and recruitment consultancy in Haridwar & SIDCUL. Specializing in manufacturing, pharma, engineering, and permanent job placements across Uttarakhand.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Nehru Colony, Near Mantra Apartments, SIDCUL',
          addressLocality: 'Haridwar',
          addressRegion: 'Uttarakhand',
          postalCode: '249403',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '29.9457',
          longitude: '78.0772'
        },
        telephone: '+917088642658',
        email: 'jobshiring.hrteam@gmail.com',
        priceRange: '₹₹',
        areaServed: [
          'Haridwar',
          'SIDCUL Haridwar',
          'Roorkee',
          'Bhagwanpur',
          'Dehradun',
          'Uttarakhand'
        ],
        knowsAbout: [
          'Placement Agency in Haridwar',
          'SIDCUL Haridwar Jobs',
          'Industrial Manpower Supply',
          'Permanent Job Hiring',
          'Pharmaceutical Recruitment'
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.santnirankarienterprise.co.in/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Which is the best placement agency in Haridwar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sant Nirankari Enterprise is one of the most trusted placement agencies in Haridwar and SIDCUL, offering direct job opportunities in leading industrial and corporate companies across Uttarakhand.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can I get jobs in SIDCUL Haridwar through Sant Nirankari Enterprise?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Candidates can apply instantly using the Fast Apply feature or complete candidate registration on our website to get interviewed for active vacancies in SIDCUL industrial sectors.'
            }
          },
          {
            '@type': 'Question',
            name: 'What types of jobs are available in Haridwar & SIDCUL?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Positions are available across Pharmaceutical (QA/QC/Production), Automotive, FMCG, Packaging, Warehouse, Quality Control, Accounts, and Administration.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where is Sant Nirankari Enterprise located in Haridwar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sant Nirankari Enterprise is located at Nehru Colony, Near Mantra Apartments, SIDCUL, Haridwar, Uttarakhand 249403.'
            }
          }
        ]
      }
    ]
  };

  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-white
        text-zinc-950
        transition-colors
        duration-200
        dark:bg-[#0f0f10]
        dark:text-zinc-50
      "
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <SiteNavbar />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="flex-1">
        {/* ===================================================
            HERO
        ==================================================== */}

        <HeroSection />

        {/* ===================================================
            FAST APPLY (INSTANT RESUME CHECK)
        ==================================================== */}

        <FastApplySection />

        {/* ===================================================
            NEED A MANPOWER (EMPLOYER SOLUTIONS)
        ==================================================== */}

        <FeaturedJobs />

        {/* ===================================================
            HOW IT WORKS
        ==================================================== */}

        <HowItWorks />

        {/* ===================================================
            COMPANIES
        ==================================================== */}

        <CompaniesSection />

        {/* ===================================================
            REGISTRATION CTA
            + STARTS AT ₹399 (NON-REFUNDABLE)
        ==================================================== */}

        <RegistrationCTA />


        {/* ===================================================
            OUR CANDIDATES
            + BENEFITS
        ==================================================== */}

        <WhyCandidatesChooseUs />

        {/* ===================================================
            HARIDWAR LOCAL SEO FAQ
        ==================================================== */}

        <HaridwarFAQSection />

        {/* ===================================================
            CONTACT
        ==================================================== */}

        <ContactSection />
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <SiteFooter />
    </div>
  );
}
