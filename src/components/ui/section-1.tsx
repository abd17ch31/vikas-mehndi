"use client";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

const SHOWCASE_IMAGES = [
  "./src/components/abc/forportfolioprroifle.jpg",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
];

export function Section1() {
  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-transparent">
      <AnimatedMarqueeHero
        className="bg-transparent"
        tagline="Bridal Mehndi Artist in Raja Park Jaipur"
        title={
          <>
            Elegant Mehndi Designs
            <br />
            for Weddings and Celebrations
          </>
        }
        description="Vikas Mehandi Art creates bridal, Arabic, traditional, and festive mehndi experiences in Jaipur with graceful detailing, polished presentation, and client-first artistry."
        images={SHOWCASE_IMAGES}
      />

      <div id="book-appointment" className="sr-only">
        Book mehndi appointment
      </div>
      <div id="locate-us" className="sr-only">
        Shop no. 390, Raja Park, Jaipur, Rajasthan
      </div>
    </section>
  );
}
