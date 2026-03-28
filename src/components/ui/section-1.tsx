"use client";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

const SHOWCASE_IMAGES = [
  "./src/assets/images/h6.jpeg",
  "./src/assets/images/h1.jpeg",
  "./src/assets/images/h2.jpeg",
  "./src/assets/images/h3.jpeg",
  "./src/assets/images/h4.jpeg",
  "./src/assets/images/h5.jpeg",
 
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
