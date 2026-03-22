"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, X } from "lucide-react";

import StellarCardGallery from "@/components/ui/3d-image-gallery";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { GlowCard } from "@/components/ui/spotlight-card";

type WorkCard = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  gallery: string[];
};

const workCards: WorkCard[] = [
  {
    id: "bridal-royal",
    title: "Royal Bridal",
    subtitle: "Intricate full bridal storytelling",
    cover: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "engagement-style",
    title: "Engagement Style",
    subtitle: "Elegant and camera-ready details",
    cover: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=900&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "festival-flair",
    title: "Festival Flair",
    subtitle: "Fast, stylish festive patterns",
    cover: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "portrait-concepts",
    title: "Portrait Concepts",
    subtitle: "Signature customized artistry",
    cover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "guest-group",
    title: "Guest Group",
    subtitle: "Coordinated event bookings",
    cover: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506629905607-d405b7a10db9?w=900&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "baby-shower",
    title: "Baby Shower",
    subtitle: "Soft celebratory motifs",
    cover: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506629905607-d405b7a10db9?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80",
    ],
  },
];

export function OurWorkPage() {
  const [activeCard, setActiveCard] = useState<WorkCard | null>(null);

  return (
    <div className="relative min-h-screen">
      <SiteNavbar />

      <main className="relative z-10 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-amber-300/35 bg-white/58 p-5 shadow-[0_24px_70px_rgba(176,106,31,0.10)] backdrop-blur-md sm:p-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-amber-300/50 bg-[#fff6df] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
              Our Work
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#5a2a17] sm:text-5xl">
              Explore featured mehndi styles through an interactive design gallery
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#7a5842] sm:text-lg sm:leading-8">
              Click any spotlight card to open a larger popup gallery with an
              immersive 3D image experience. This page highlights bridal,
              engagement, festive, portrait, guest, and baby shower design moods.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-7xl">
          <div className="grid gap-y-9 gap-x-6 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workCards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveCard(card)}
                className="text-left"
              >
                <GlowCard
                  glowColor={index % 2 === 0 ? "orange" : index % 3 === 0 ? "purple" : "blue"}
                  customSize
                  className="h-[340px] w-full overflow-hidden rounded-[1.8rem] bg-white/70 p-0"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                    <img
                      src={card.cover}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3d1f14]/86 via-[#3d1f14]/18 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.22em] backdrop-blur">
                        <Eye className="h-3.5 w-3.5" />
                        Open Gallery
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold">{card.title}</h2>
                      <p className="mt-2 text-sm text-white/82">{card.subtitle}</p>
                    </div>
                  </div>
                </GlowCard>
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {activeCard ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#3d1f14]/70 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.22 }}
                className="relative w-full max-w-6xl rounded-[2rem] border border-amber-200/30 bg-[#fff9f1] p-5 shadow-[0_28px_90px_rgba(61,31,20,0.25)] sm:p-6"
              >
                <button
                  type="button"
                  onClick={() => setActiveCard(null)}
                  className="absolute right-4 top-4 rounded-full border border-amber-300/45 bg-white/90 p-2 text-[#7a4b24] transition hover:bg-[#fff3dd]"
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-6 pr-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]">
                    Popup Gallery
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-[#5a2a17]">
                    {activeCard.title}
                  </h2>
                  <p className="mt-2 text-base text-[#7a5842]">{activeCard.subtitle}</p>
                </div>

                <div className="overflow-hidden rounded-[1.7rem] border border-amber-200/40">
                  <StellarCardGallery
                    className="h-[65vh] min-h-[420px] w-full"
                    title={`${activeCard.title} Gallery`}
                    subtitle="Drag to look around • Scroll to zoom • Click cards to view details"
                    cards={activeCard.gallery.map((image, index) => ({
                      id: `${activeCard.id}-${index + 1}`,
                      imageUrl: image,
                      alt: `${activeCard.title} design ${index + 1}`,
                      title: `${activeCard.title} ${index + 1}`,
                    }))}
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <FooterTapedDesign />
      </main>
    </div>
  );
}
