"use client";

import { useSiteContent } from "@/components/providers/site-content-provider";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

export function Section1() {
  const { siteContent } = useSiteContent();
  const { business, hero } = siteContent;

  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-transparent">
      <AnimatedMarqueeHero
        className="bg-transparent"
        tagline={hero.tagline}
        title={hero.title}
        description={hero.description}
        ctaText={hero.ctaText}
        images={hero.showcaseImages}
      />

      <div id="book-appointment" className="sr-only">
        Book mehndi appointment
      </div>
      <div id="locate-us" className="sr-only">
        {business.location}
      </div>
    </section>
  );
}
