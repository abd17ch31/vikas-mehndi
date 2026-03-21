"use client";

import { ExpandingCards, mehndiServices } from "@/components/ui/expanding-cards";

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 px-5 py-16 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <span className="inline-flex rounded-full border border-amber-300/50 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
            Services
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#5a2a17] sm:text-5xl">
            Mehndi services designed for every kind of celebration
          </h2>
          <p className="mt-4 text-base leading-7 text-[#7a5842] sm:text-lg sm:leading-8">
            Explore bridal, engagement, portrait, baby shower, festival, and guest
            mehndi options. On mobile, each card stacks vertically and opens vertically
            for easier browsing.
          </p>
        </div>

        <ExpandingCards items={mehndiServices} defaultActiveIndex={0} />
      </div>
    </section>
  );
}
