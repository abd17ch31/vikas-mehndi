"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";

export function ShootingStarsDemo() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#12070a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(127,29,29,0.36),transparent_28%),linear-gradient(180deg,#12070a_0%,#1c0b0d_55%,#100608_100%)]" />
      <div className="mehndi-stars absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,220,0.12),transparent_48%)]"
        aria-hidden="true"
      />

      <ShootingStars
        starColor="#f7c56d"
        trailColor="#f97316"
        minSpeed={12}
        maxSpeed={26}
        minDelay={1200}
        maxDelay={2800}
      />
      <ShootingStars
        starColor="#fde68a"
        trailColor="#fb7185"
        minSpeed={10}
        maxSpeed={20}
        minDelay={1800}
        maxDelay={3600}
      />
    </section>
  );
}
