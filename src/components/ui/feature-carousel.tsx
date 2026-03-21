"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brush,
  Camera,
  Flower2,
  Gem,
  HeartHandshake,
  PartyPopper,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type ServiceFeature = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  description: string;
  popupTitle: string;
  popupText: string;
};

export const SERVICE_FEATURES: ServiceFeature[] = [
  {
    id: "bridal",
    label: "Bridal",
    icon: Gem,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    description: "Detailed bridal mehndi crafted for the biggest day of your celebration.",
    popupTitle: "Bridal Mehndi",
    popupText:
      "Our bridal mehndi service focuses on dense detailing, balanced symmetry, rich stain planning, and elegant storytelling motifs that photograph beautifully for weddings in Jaipur and beyond.",
  },
  {
    id: "engagement",
    label: "Engagement",
    icon: HeartHandshake,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    description: "Graceful engagement designs with a polished, celebration-ready finish.",
    popupTitle: "Engagement Mehndi",
    popupText:
      "This service is ideal for ring ceremonies and pre-wedding events, with refined patterns that feel elegant, modern, and comfortable to wear through long celebrations.",
  },
  {
    id: "portrait",
    label: "Portrait",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
    description: "Custom portrait mehndi concepts with signature artistic detailing.",
    popupTitle: "Portrait Mehndi",
    popupText:
      "Portrait mehndi is designed for clients who want highly personalized artwork, including custom faces, initials, meaningful symbols, and story-led compositions.",
  },
  {
    id: "festival",
    label: "Festival",
    icon: PartyPopper,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop",
    description: "Quick yet beautiful festive mehndi for Teej, Karwa Chauth, Diwali, and more.",
    popupTitle: "Festival Mehndi",
    popupText:
      "Festival mehndi is perfect for seasonal celebrations, offering stylish floral and traditional patterns with quick application and a bright, festive presence.",
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    icon: Flower2,
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1200&auto=format&fit=crop",
    description: "Soft and celebratory motifs created for baby shower events and family gatherings.",
    popupTitle: "Baby Shower Mehndi",
    popupText:
      "Our baby shower mehndi service uses soft motifs, gentle compositions, and joyful detailing that suits intimate family moments and celebration photos.",
  },
  {
    id: "guest",
    label: "Guest",
    icon: Brush,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    description: "Stylish guest mehndi arranged for families, friends, and group bookings.",
    popupTitle: "Guest Mehndi",
    popupText:
      "Guest mehndi is planned for smooth event flow, allowing family members and guests to enjoy coordinated, elegant designs without long waiting or rushed results.",
  },
];

const AUTO_PLAY_INTERVAL = 3200;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, value: number) => {
  const rangeSize = max - min;
  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activePopup, setActivePopup] = useState<ServiceFeature | null>(null);

  const currentIndex =
    ((step % SERVICE_FEATURES.length) + SERVICE_FEATURES.length) % SERVICE_FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + SERVICE_FEATURES.length) % SERVICE_FEATURES.length;
    if (diff > 0) setStep((value) => value + diff);
  };

  useEffect(() => {
    if (isPaused || activePopup) return undefined;
    const interval = window.setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => window.clearInterval(interval);
  }, [nextStep, isPaused, activePopup]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = SERVICE_FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl md:p-8">
        <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-amber-300/35 bg-white/45 shadow-[0_24px_80px_rgba(176,106,31,0.10)] backdrop-blur-md lg:min-h-[640px] lg:flex-row lg:rounded-[4rem]">
          <div className="relative z-30 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden bg-[#d88936] px-8 md:min-h-[450px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
            <div className="absolute inset-x-0 top-0 z-40 h-12 bg-gradient-to-b from-[#d88936] via-[#d88936]/80 to-transparent md:h-20 lg:h-16" />
            <div className="absolute inset-x-0 bottom-0 z-40 h-12 bg-gradient-to-t from-[#d88936] via-[#d88936]/80 to-transparent md:h-20 lg:h-16" />
            <div className="relative z-20 flex h-full w-full items-center justify-center lg:justify-start">
              {SERVICE_FEATURES.map((feature, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(SERVICE_FEATURES.length / 2),
                  SERVICE_FEATURES.length / 2,
                  distance
                );
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.id}
                    style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      type="button"
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={cn(
                        "group relative flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all duration-700 md:px-10 md:py-5 lg:px-8 lg:py-4",
                        isActive
                          ? "z-10 border-white bg-white text-[#d88936]"
                          : "border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center transition-colors duration-500",
                          isActive ? "text-[#d88936]" : "text-white/40"
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </div>

                      <span className="whitespace-nowrap text-sm font-normal uppercase tracking-tight md:text-[15px]">
                        {feature.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t border-amber-200/30 bg-[#fff3d9]/50 px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
            <div className="relative flex aspect-[4/5] w-full max-w-[420px] items-center justify-center">
              {SERVICE_FEATURES.map((feature, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";
                const Icon = feature.icon;

                return (
                  <motion.button
                    key={feature.id}
                    type="button"
                    initial={false}
                    onClick={() => {
                      if (isActive) {
                        setActivePopup(feature);
                      } else {
                        handleChipClick(index);
                      }
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive || isPrev || isNext ? "auto" : "none",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                    className="absolute inset-0 origin-center overflow-hidden rounded-[2rem] border-4 border-[#fff6e6] bg-[#fff6e6] text-left md:rounded-[2.8rem] md:border-8"
                  >
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={cn(
                        "h-full w-full object-cover transition-all duration-700",
                        isActive ? "grayscale-0 blur-0" : "brightness-75 grayscale blur-[2px]"
                      )}
                    />

                    <AnimatePresence>
                      {isActive ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 pt-32"
                        >
                          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-amber-200/50 bg-white px-4 py-1.5 text-[11px] font-normal uppercase tracking-[0.2em] text-[#8d5520] shadow-lg">
                            <Icon className="h-3.5 w-3.5" />
                            {index + 1} • {feature.label}
                          </div>
                          <p className="text-xl font-normal leading-tight tracking-tight text-white drop-shadow-md md:text-2xl">
                            {feature.description}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <div
                      className={cn(
                        "absolute left-8 top-8 flex items-center gap-3 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                      <span className="text-[10px] font-normal uppercase tracking-[0.3em] text-white/80">
                        Tap for Details
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activePopup ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3d1f14]/65 p-4 backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setActivePopup(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-xl rounded-[2rem] border border-amber-200/40 bg-[#fff9f1] p-6 shadow-[0_28px_90px_rgba(61,31,20,0.25)] sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActivePopup(null)}
                className="absolute right-4 top-4 rounded-full border border-amber-300/45 bg-white/90 p-2 text-[#7a4b24] transition hover:bg-[#fff3dd]"
                aria-label="Close service details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pr-12">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]">
                  Service Details
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-[#5a2a17]">
                  {activePopup.popupTitle}
                </h3>
                <p className="mt-4 text-base leading-8 text-[#7a5842]">
                  {activePopup.popupText}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default FeatureCarousel;
