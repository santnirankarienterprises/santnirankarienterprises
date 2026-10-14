import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import HowItWorks from "@/components/home/HowItWorks";
import { HeroSection } from "@/components/hero-section";
import FastApplySection from "@/components/home/FastApplySection";
import RegistrationCTA from "@/components/home/RegistrationCTA";
import WhyCandidatesChooseUs from "@/components/home/WhyCandidatesChooseUs";
import CompaniesSection from "@/components/home/CompaniesSection";
import ContactSection from "@/components/home/ContactSection";
import HaridwarFAQSection from "@/components/home/HaridwarFAQSection";
import VisitOfficeSection from "@/components/home/VisitOfficeSection";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EmploymentAgency',
        '@id': 'https://www.santnirankarienterprises.in/#agency',
        name: 'Sant Nirankari Enterprise - Placement & Manpower Agency in Haridwar',
        alternateName: [
          'Sant Nirankari Enterprise',
          'Placement and Manpower Agency Haridwar',
          'Job Consultancy in Haridwar',
          'Manpower Supplier in SIDCUL Haridwar',
          'Placement Agency in SIDCUL Haridwar'
        ],
        url: 'https://www.santnirankarienterprises.in/',
        logo: 'https://www.santnirankarienterprises.in/sant-nirankari-enterprise-logo.png',
        image: 'https://www.santnirankarienterprises.in/sant-nirankari-enterprise-logo.png',
        description: 'Leading placement and manpower agency in Haridwar & SIDCUL. Specializing in industrial manpower supply, skilled and unskilled staffing, manufacturing, pharma, engineering, and permanent job placements across Uttarakhand.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Raja Biscuit Chowk and Jasmine Hotel , SIDCUL',
          addressLocality: 'Haridwar',
          addressRegion: 'Uttarakhand',
          postalCode: '249402',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '29.9457',
          longitude: '78.0772'
        },
        telephone: '+917088642658',
        email: 'jobs.santnirankarienterprises@gmail.com',
        priceRange: '₹₹',
        areaServed: [
          'Haridwar',
          'SIDCUL Haridwar',
          'Roorkee',
          'Kashipur',
          'Dehradun',
          'Uttarakhand'
        ],
        knowsAbout: [
          'Placement and Manpower Agency in Haridwar',
          'Placement Agency in Haridwar',
          'Manpower Supply in Haridwar',
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
            name: 'Which is the best placement and manpower agency in Haridwar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sant Nirankari Enterprise is recognized as the leading placement and manpower agency in Haridwar and SIDCUL, offering direct job placements and industrial manpower supply to top companies across Uttarakhand.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do you provide industrial manpower supply in SIDCUL Haridwar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Sant Nirankari Enterprise provides end-to-end industrial manpower supply including skilled operators, technicians, warehouse staff, and permanent workforce to manufacturing and pharma plants in SIDCUL Haridwar.'
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
              text: 'Sant Nirankari Enterprise is located Near Raja Biscuit Chowk and Jasmine Hotel, SIDCUL, Haridwar, Uttarakhand 249402.'
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

        {/* ===================================================
            VISIT OUR OFFICE
        ==================================================== */}

        <VisitOfficeSection />
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <SiteFooter />
    </div>
  );
}
