"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";

export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#fff1c8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.18),transparent_28%),linear-gradient(180deg,#fff6d9_0%,#ffefc8_48%,#ffe8bb_100%)]" />
      <div className="mehndi-stars absolute inset-0 opacity-45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.76),transparent_48%)]"
        aria-hidden="true"
      />
      <ShootingStars
        starColor="#e58f1d"
        trailColor="#f6b94c"
        minSpeed={12}
        maxSpeed={26}
        minDelay={1200}
        maxDelay={2800}
      />
      <ShootingStars
        starColor="#d97706"
        trailColor="#f59e0b"
        minSpeed={10}
        maxSpeed={20}
        minDelay={1800}
        maxDelay={3600}
      />
    </div>
  );
}
