"use client";

import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

const galleryData: GalleryItem[] = [
  {
    common: "Bridal Story",
    binomial: "Full bridal detailing",
    photo: {
      url: "./src/assets/images/hg-1.jpeg",
      text: "bridal mehndi inspired portrait styling",
      pos: "47% 35%",
      by: "Unsplash",
    },
  },
  {
    common: "Engagement Glow",
    binomial: "Elegant celebration styling",
    photo: {
      url: "./src/assets/images/hg-engagement.jpeg",
      text: "engagement inspired mehndi styling",
      pos: "60% 40%",
      by: "Unsplash",
    },
  },
  {
    common: "Festive Mood",
    binomial: "Quick festive patterns",
    photo: {
      url: "./src/assets/images/hg-festival.jpeg",
      text: "festive fashion portrait",
      pos: "53% 43%",
      by: "Unsplash",
    },
  },
  {
    common: "Portrait Work",
    binomial: "Signature hand artistry",
    photo: {
      url: "./src/assets/images/hg-portrait.jpeg",
      text: "portrait inspired bridal styling",
      pos: "55% 36%",
      by: "Unsplash",
    },
  },
  {
    common: "Wedding Guest",
    binomial: "Elegant guest designs",
    photo: {
      url: "./src/assets/images/hg-guest.jpeg",
      text: "guest celebration styling",
      pos: "50% 28%",
      by: "Unsplash",
    },
  },
  {
    common: "Ceremony Look",
    binomial: "Traditional inspired finish",
    photo: {
      url: "./src/assets/images/hg-ceremony.jpeg",
      text: "ceremony styling portrait",
      pos: "47%",
      by: "Unsplash",
    },
  },
  {
    common: "Baby Shower",
    binomial: "Welcoming babies with love",
    photo: {
      url: "./src/assets/images/hg-baby.jpeg",
      text: "celebration portrait styling",
      pos: "58% 35%",
      by: "Unsplash",
    },
  },
  {
    common: "Guest Glam",
    binomial: "Family function elegance",
    photo: {
      url: "./src/assets/images/hg-guest-2.jpeg",
      text: "guest glam inspired fashion portrait",
      pos: "50% 40%",
      by: "Unsplash",
    },
  },
];

export function CircularGallerySection() {
  return (
    <section
      id="gallery"
      className="relative z-10 overflow-hidden px-5 py-16 sm:px-8 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-amber-300/50 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
            Gallery
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#5a2a17] sm:text-5xl">
            Swipe through our featured mehndi work and celebration moments
          </h2>
          <p className="mt-4 text-base leading-7 text-[#7a5842] sm:text-lg sm:leading-8">
            On mobile you can swipe horizontally through the gallery, while desktop
            visitors can use the controls below the cards.
          </p>
        </div>

        <div className="mt-10">
          <CircularGallery items={galleryData} />
        </div>
      </div>
    </section>
  );
}
