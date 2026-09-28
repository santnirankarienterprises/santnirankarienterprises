const companies = [
  "Mahindra & Mahindra",
  "Hero MotoCorp",
  "Denso India",
  "Rockman Industries",
  "Sharda Motor Industries",
  "Satyam Auto Components",
  "FCC",
  "Haridwar Precision Auto",
  "Victora Technologies",
  "Makino Automotive",
  "Nipman Fastener Industries",
  "Lumax Industries",
];

const moreCompanies = [
  "Shivam Autotech",
  "Spark Minda",
  "Bajajsons",
  "Speedcrafts",
  "Neel Metal Products",
  "Steelwell Engineering",
  "Uno Minda",
  "Bosch India",
  "Munjal Showa",
  "Kay Automotive",
  "Takshi Auto Components",
  "Alf Engineering",
  "Minda",
  "Jai Shri Polymers",
  "Kalpa Industries",
  "Kirat International",
];

const locations = [
  "Haridwar",
  "SIDCUL",
  "Noida",
  "Bahadrabad",
  "Pantnagar",
  "Gurugram",
  "Manesar",
  "Greater Noida",
  "Pune",
  "Chennai",
  "Bengaluru",
  "Nashik",
  "Pithampur",
  "Sanand",
  "Hosur",
  "Gujarat",
];

export default function CompaniesSection() {
  const companyTicker = [...moreCompanies, ...moreCompanies];
  const locationTicker = [...locations, ...locations];

  // Main companies divided into 3 running rows
  const companyRows = [
    companies.slice(0, 4),
    companies.slice(4, 8),
    companies.slice(8, 12),
  ];

  return (
    <section
      id="companies"
      className="relative overflow-hidden bg-zinc-50 py-20 dark:bg-[#030303] sm:py-28"
    >
      {/* =========================================
          BACKGROUND DECOR
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/10" />

        <div className="absolute bottom-0 left-10 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/10" />
      </div>

      <style>
        {`
          /* =========================================
             MAIN COMPANY ROW ANIMATION
          ========================================= */

          @keyframes companyRowLeft {
            0% {
              transform: translate3d(0, 0, 0);
            }

            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @keyframes companyRowRight {
            0% {
              transform: translate3d(-50%, 0, 0);
            }

            100% {
              transform: translate3d(0, 0, 0);
            }
          }

          .company-row-left {
            animation: companyRowLeft 28s linear infinite;
            will-change: transform;
          }

          .company-row-right {
            animation: companyRowRight 32s linear infinite;
            will-change: transform;
          }

          .company-row-left:hover,
          .company-row-right:hover {
            animation-play-state: paused;
          }


          /* =========================================
             LOWER COMPANY MARQUEE
          ========================================= */

          @keyframes companiesMarquee {
            0% {
              transform: translate3d(0, 0, 0);
            }

            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }


          /* =========================================
             LOCATION MARQUEE
          ========================================= */

          @keyframes locationsMarquee {
            0% {
              transform: translate3d(-50%, 0, 0);
            }

            100% {
              transform: translate3d(0, 0, 0);
            }
          }


          .companies-marquee {
            animation: companiesMarquee 40s linear infinite;
            will-change: transform;
          }

          .locations-marquee {
            animation: locationsMarquee 45s linear infinite;
            will-change: transform;
          }

          .companies-marquee:hover,
          .locations-marquee:hover {
            animation-play-state: paused;
          }


          /* =========================================
             REDUCED MOTION
          ========================================= */

          @media (prefers-reduced-motion: reduce) {
            .company-row-left,
            .company-row-right,
            .companies-marquee,
            .locations-marquee {
              animation: none;
            }
          }
        `}
      </style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================================
            HEADING
        ========================================= */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-bold tracking-wide text-blue-600 dark:text-blue-400 uppercase">
            Trusted by Industry Leaders
          </p>

          <h2 className="mt-4 text-3xl font-serif font-bold tracking-tight text-black sm:text-4xl lg:text-5xl dark:text-white">
            Connecting You with <br className="hidden sm:block" />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">
              Top Enterprises
            </span>
          </h2>

        </div>


        {/* =========================================
            MAIN COMPANY CARDS
            3 RUNNING ROWS
        ========================================= */}

        <div className="relative mt-16 overflow-hidden sm:mt-24">

          {/* LEFT FADE */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-zinc-50 via-zinc-50/80 to-transparent dark:from-[#030303] dark:via-[#030303]/80"
          />

          {/* RIGHT FADE */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-zinc-50 via-zinc-50/80 to-transparent dark:from-[#030303] dark:via-[#030303]/80"
          />


          {/* =========================================
              RUNNING ROWS
          ========================================= */}

          <div className="space-y-4 sm:space-y-6">

            {companyRows.map((row, rowIndex) => {

              // Duplicate row for seamless animation
              const duplicatedRow = [...row, ...row];

              // Middle row moves in opposite direction
              const isReverse = rowIndex === 1;

              return (
                <div
                  key={rowIndex}
                  className="relative overflow-hidden"
                >

                  <div
                    className={`flex w-max gap-2 sm:gap-4 lg:gap-6 ${
                      isReverse
                        ? "company-row-right"
                        : "company-row-left"
                    }`}
                  >

                    {duplicatedRow.map((company, index) => (

                      /*
                       * =================================================
                       * MAIN COMPANY CARD
                       *
                       * OUTER DIV = COMPLETE GRADIENT BORDER
                       * INNER DIV = ACTUAL CARD
                       *
                       * This guarantees the gradient continues around
                       * all four sides AND all four rounded corners.
                       * =================================================
                       */

                      <div
                        key={`${company}-${rowIndex}-${index}`}
                        className="
                          relative
                          w-[220px]
                          shrink-0
                          overflow-hidden
                          rounded-2xl
                          bg-gradient-to-r
                          from-blue-600
                          via-violet-600
                          to-emerald-500
                          p-[2px]

                          transition-all
                          duration-500

                          hover:-translate-y-1
                          hover:shadow-[0_12px_40px_-15px_rgba(37,99,235,0.5)]

                          sm:w-[280px]

                          lg:w-[calc((100vw-10rem)/4)]
                          lg:max-w-[360px]
                        "
                      >

                        {/* =========================================
                            INNER WHITE / DARK CARD
                        ========================================= */}

                        <div
                          className="
                            relative
                            flex
                            h-20
                            w-full
                            flex-col
                            items-center
                            justify-center
                            overflow-hidden

                            rounded-[14px]

                            bg-white

                            dark:bg-[#030303]

                            sm:h-32
                          "
                        >

                          {/* =========================================
                              COMPANY NAME
                          ========================================= */}

                          <h3
                            className="
                              relative
                              z-10
                              px-1
                              text-center
                              text-[10px]
                              font-bold
                              tracking-tight

                              text-zinc-900

                              transition-colors
                              duration-300

                              group-hover:text-transparent

                              sm:px-4
                              sm:text-lg

                              dark:text-zinc-100
                            "
                          >
                            {company}
                          </h3>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>
              );
            })}

          </div>
        </div>


        {/* =========================================
            EXPANDING OUR NETWORK
        ========================================= */}

        <div className="mt-20 border-t border-zinc-200 pt-16 dark:border-white/10">

          <div className="text-center">

            <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Expanding Our Network Constantly
            </p>

          </div>


          {/* =========================================
              COMPANY TICKER
          ========================================= */}

          <div className="relative mt-8 overflow-hidden">

            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-zinc-50 to-transparent dark:from-[#030303]" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-zinc-50 to-transparent dark:from-[#030303]" />

            <div className="companies-marquee flex w-max select-none gap-4 px-4 py-4">

              {companyTicker.map((company, index) => (

                <div
                  key={`${company}-${index}`}
                  className="
                    group
                    relative
                    rounded-full
                    p-[2px]

                    bg-gradient-to-r
                    from-blue-700/40
                    via-violet-700/40
                    to-emerald-600/40

                    transition-all

                    hover:scale-105

                    hover:from-blue-600
                    hover:via-violet-600
                    hover:to-emerald-500
                  "
                >

                  <div className="flex items-center rounded-full bg-white px-6 py-2.5 dark:bg-[#080808]">

                    <span className="whitespace-nowrap text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">
                      {company}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>
        </div>


        {/* =========================================
            LOCATION TICKER
        ========================================= */}

        <div className="mt-6">

          <div className="relative overflow-hidden">

            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-zinc-50 to-transparent dark:from-[#030303]" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-zinc-50 to-transparent dark:from-[#030303]" />


            <div className="locations-marquee flex w-max select-none gap-4 px-4 py-4">

              {locationTicker.map((location, index) => (

                <div
                  key={`${location}-${index}`}
                  className="
                    group
                    relative
                    rounded-full
                    p-[2px]

                    bg-gradient-to-r
                    from-emerald-600/40
                    via-blue-700/40
                    to-violet-700/40

                    transition-all

                    hover:scale-105

                    hover:from-emerald-500
                    hover:via-blue-600
                    hover:to-violet-600
                  "
                >

                  <div className="flex items-center rounded-full bg-zinc-50 px-6 py-2.5 dark:bg-[#030303]">

                    <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

                    <span className="whitespace-nowrap text-sm font-bold text-zinc-700 dark:text-zinc-200">
                      {location}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* =========================================
            DISCLAIMER
        ========================================= */}

        <div className="mx-auto mt-16 max-w-2xl text-center">

          <p className="text-xs text-zinc-400">
            Listing a company does not imply that it is currently hiring through Sant Nirankari Enterprise.
          </p>

        </div>

      </div>
    </section>
  );
}