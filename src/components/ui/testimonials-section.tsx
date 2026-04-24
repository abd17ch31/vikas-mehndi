"use client";

import { useSiteContent } from "@/components/providers/site-content-provider";
import { Testimonials } from "@/components/ui/testimonials";

export function TestimonialsSection() {
  const { siteContent } = useSiteContent();

  return (
    <section
      id="testimonials"
      className="relative z-10 px-5 py-16 sm:px-8 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <span className="mx-auto inline-flex rounded-full border border-amber-300/50 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
          {siteContent.testimonialsSection.badge}
        </span>
        <div className="mt-6">
          <Testimonials
            testimonials={siteContent.testimonials}
            title={siteContent.testimonialsSection.title}
            description={siteContent.testimonialsSection.description}
            maxDisplayed={siteContent.testimonialsSection.maxDisplayed}
          />
        </div>
      </div>
    </section>
  );
}
