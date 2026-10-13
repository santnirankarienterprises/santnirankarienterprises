import { Clock3, ExternalLink, MapPin, Navigation } from "lucide-react";

export default function VisitOfficeSection() {
  const googleMapsUrl = "https://maps.app.goo.gl/41MkrLzXjKAprKr37";
  const embedMapUrl =
    "https://maps.google.com/maps?q=Sant+Nirankari+Enterprises,+Near+Raja+Biscuit+Chowk+and+Jasmine+Hotel,+SIDCUL,+Haridwar+249402&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="visit-office" className="relative overflow-hidden bg-white py-16 dark:bg-[#050505] sm:py-20 lg:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 shadow-sm dark:bg-white/5">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Location & Map
              </span>
            </div>

            <h2 className="text-3xl font-serif font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Visit Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
                Office
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Drop by our SIDCUL office for in-person consultations, document verification, interview scheduling, and direct job opportunities across Haridwar & Uttarakhand.
            </p>
          </div>

          {/* Action button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/20 transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <Navigation className="h-4 w-4 transition-transform group-hover:rotate-12 text-blue-400 dark:text-blue-600" />
            <span>Get Directions on Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
          </a>
        </div>

        {/* Quick Info Bar */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Address Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/40">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Head Office Address
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-200">
                  Near Raja Biscuit Chowk and Jasmine Hotel, SIDCUL, Haridwar 249402
                </p>
              </div>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/40">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Office Working Hours
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-200">
                  Monday – Saturday: 9:30 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Direct Link Card */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 transition-all hover:border-blue-500/50 hover:bg-blue-50/40 dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-blue-500/50 dark:hover:bg-blue-950/20 sm:col-span-2 lg:col-span-1"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Live Google Map
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-200">
                Open in Google Maps App
              </p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-200/70 text-zinc-700 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-white/10 dark:text-zinc-300 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
              <ExternalLink className="h-4 w-4" />
            </div>
          </a>
        </div>

        {/* Embedded Map Container */}
        <div className="mt-8 overflow-hidden rounded-3xl p-[2px] bg-gradient-to-r from-blue-600/40 via-violet-600/40 to-emerald-600/40 shadow-xl shadow-blue-950/5">
          <div className="relative overflow-hidden rounded-[22px] bg-zinc-100 dark:bg-zinc-900">
            <iframe
              title="Sant Nirankari Enterprises Office Location"
              src={embedMapUrl}
              width="100%"
              height="460"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full sm:h-[450px] lg:h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
