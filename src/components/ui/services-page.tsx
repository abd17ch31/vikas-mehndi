"use client";

import FeatureCarousel from "@/components/ui/feature-carousel";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { SiteNavbar } from "@/components/ui/site-navbar";

export function ServicesPage() {
  return (
    <div className="relative min-h-screen">
      <SiteNavbar />

      <main className="relative z-10 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-amber-300/35 bg-white/58 p-5 shadow-[0_24px_70px_rgba(176,106,31,0.10)] backdrop-blur-md sm:p-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-amber-300/50 bg-[#fff6df] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
              Services
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#5a2a17] sm:text-5xl">
              Mehndi services tailored for every celebration and personal style
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#7a5842] sm:text-lg sm:leading-8">
              Explore Bridal, Engagement, Portrait, Festival, Baby Shower, and
              Guest mehndi services. Each card opens a simple popup with more
              details so clients can quickly understand the style and experience.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <FeatureCarousel />
        </section>

        <FooterTapedDesign />
      </main>
    </div>
  );
}
