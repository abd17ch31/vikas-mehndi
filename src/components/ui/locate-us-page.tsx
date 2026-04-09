"use client";

import { MapPin, Navigation, Phone } from "lucide-react";

import { LocationMap } from "@/components/ui/expand-map";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { businessDetails } from "@/lib/business-details";

const MAPS_URL = businessDetails.mapsUrl;

export function LocateUsPage() {
  return (
    <div className="relative min-h-screen">
      <SiteNavbar />

      <main className="relative z-10 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-amber-300/35 bg-white/58 shadow-[0_24px_70px_rgba(176,106,31,0.10)] backdrop-blur-md">
          <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center border-b border-amber-200/30 px-6 py-12 lg:border-b-0 lg:border-r lg:px-10">
              <div className="flex w-full items-center justify-center">
                <LocationMap
                  className="max-w-full"
                  location={businessDetails.location}
                  coordinates={businessDetails.location}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between px-6 py-12 sm:px-8 lg:px-10">
              <div>
                <span className="inline-flex rounded-full border border-amber-300/50 bg-[#fff6df] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
                  Locate Us
                </span>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#5a2a17] sm:text-5xl">
                  Visit {businessDetails.name} in {businessDetails.areaLabel}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#7a5842] sm:text-lg">
                  We welcome bridal bookings, festive mehndi appointments, guest
                  group sessions, and custom design consultations at our{" "}
                  {businessDetails.areaLabel} location. Reach out before visiting
                  and we will help you plan the best time for your appointment.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="rounded-[1.5rem] border border-amber-200/50 bg-[#fff8eb] p-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-[#b06a1f]" />
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9a5a1a]">
                          Address
                        </p>
                        <p className="mt-2 text-base leading-7 text-[#6d4630]">
                          {businessDetails.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-amber-200/50 bg-[#fff8eb] p-5">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 text-[#b06a1f]" />
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9a5a1a]">
                          Contact
                        </p>
                        <p className="mt-2 text-base leading-7 text-[#6d4630]">
                          Call us directly on {businessDetails.phone} for bookings,
                          timing confirmation, and event enquiries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`tel:${businessDetails.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-[#2a120d] transition hover:bg-amber-300"
                >
                  <Phone className="h-4 w-4" />
                  Contact on Call
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/45 bg-white/90 px-6 py-3 text-sm font-semibold text-[#7a4b24] transition hover:bg-[#fff3dd]"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        <FooterTapedDesign />
      </main>
    </div>
  );
}
