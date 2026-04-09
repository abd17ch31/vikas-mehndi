"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { businessDetails } from "@/lib/business-details";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText?: string;
  images: string[];
  className?: string;
  onCtaClick?: () => void;
}

const ActionButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className="mt-8 inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-[#2a120d] shadow-[0_20px_45px_rgba(251,191,36,0.18)] transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/70"
  >
    {children}
  </motion.button>
);

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className,
  onCtaClick,
}) => {
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 110, damping: 20 },
    },
  };

  const duplicatedImages = [...images, ...images];

  return (
    <section
      id="section-1"
      aria-label="Section 1"
      className={cn(
        "relative flex min-h-screen w-full flex-col overflow-hidden px-4 pt-28 text-center sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center pb-[30vh]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInVariants}
          className="mb-4 inline-block rounded-full border border-amber-300/40 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-[#a7661d] backdrop-blur-sm sm:text-sm"
        >
          {tagline}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] text-[#5a2a17] sm:text-6xl lg:text-7xl"
        >
          {typeof title === "string"
            ? title.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={fadeInVariants}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))
            : title}
        </motion.h1>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeInVariants}
        transition={{ delay: 0.35 }}
        className="pointer-events-none absolute inset-x-0 bottom-[28vh] z-10 mx-auto max-w-2xl px-6 sm:bottom-[32vh]"
      >
        <p className="text-center text-sm leading-6 text-[#7a5842] sm:text-base sm:leading-7">
          {description}
        </p>
      </motion.div>

      {ctaText ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInVariants}
          transition={{ delay: 0.45 }}
          className="relative z-10 mx-auto -mt-6"
        >
          <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
        </motion.div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[32vh] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] sm:h-[38vh]">
        <motion.div
          className="flex w-max gap-4 px-4 pb-8 sm:gap-6 sm:px-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 34,
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[3/4] h-40 flex-shrink-0 overflow-hidden rounded-[1.6rem] border border-amber-300/25 bg-white/70 shadow-[0_18px_50px_rgba(182,117,47,0.14)] sm:h-52 md:h-64"
              style={{
                rotate: `${index % 2 === 0 ? -4 : 4}deg`,
              }}
            >
              <img
                src={src}
                alt={`${businessDetails.name} showcase ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f8e9d6]/70 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
