"use client";

import { ArrowRight } from "lucide-react";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";

import { useSiteContent } from "@/components/providers/site-content-provider";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export default function AboutSection1() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { siteContent } = useSiteContent();

  const artistImages = useMemo(
    () =>
      siteContent.aboutSection.artistImages.map((artist, index) => ({
        ...artist,
        figureClassName:
          index === 0
            ? "col-span-2 row-span-2 shadow-[0_26px_70px_rgba(176,106,31,0.24)]"
            : index === 3
              ? "col-span-2 row-span-1 sm:col-span-1"
              : "col-span-1 row-span-1",
        imageClassName:
          index === 0
            ? "scale-105 object-[center_28%]"
            : index === 1
              ? "rotate-2 object-[center_18%]"
              : index === 2
                ? "-rotate-2 object-[center_20%]"
                : "rotate-1 object-[center_18%]",
        animationNum: index + 2,
      })),
    [siteContent.aboutSection.artistImages]
  );

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.22,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };

  const revealVariants2 = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.22,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -40,
      opacity: 0,
    },
  };

  const revealVariants3 = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.18,
        duration: 0.7,
      },
    }),
    hidden: {
      opacity: 0,
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      ref={heroRef}
    >
      <TimelineContent
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 50% 90%, rgba(255,255,255,0) 42%, rgba(255,214,153,0.18) 100%)",
        }}
        animationNum={2}
        customVariants={revealVariants3}
        timelineRef={heroRef}
      />
      <TimelineContent
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,120,44,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,120,44,0.08)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)]"
        animationNum={3}
        customVariants={revealVariants3}
        timelineRef={heroRef}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold uppercase text-[#b06a1f]">
          {siteContent.aboutSection.badge}
        </div>

        <h2 className="mb-6 text-3xl font-semibold text-[#5a2a17] sm:text-4xl md:text-5xl">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.14}
            staggerFrom="last"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 30,
              delay: 0.1,
            }}
            containerClassName="justify-center text-center leading-[120%]"
          >
            {siteContent.aboutSection.title}
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={heroRef}
          className="mb-8 text-center text-sm leading-relaxed text-[#7a5842] sm:text-lg"
        >
          {siteContent.aboutSection.description}
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          customVariants={revealVariants3}
          timelineRef={heroRef}
          className="mx-auto"
        >
          <Link
            to={siteContent.aboutSection.ctaHref}
            className="mx-auto flex w-fit gap-2 rounded-full border border-amber-300 bg-amber-400 px-5 py-3 text-white shadow-lg shadow-amber-200 transition-all duration-300 ease-in-out hover:gap-4 hover:bg-amber-500"
          >
            {siteContent.aboutSection.ctaLabel} <ArrowRight />
          </Link>
        </TimelineContent>
      </div>

      <div className="mx-auto grid max-w-6xl auto-rows-[9.5rem] grid-cols-2 gap-4 pt-16 sm:auto-rows-[11rem] sm:grid-cols-4 md:auto-rows-[13rem] lg:auto-rows-[15rem]">
        {artistImages.map((artist, index) => (
          <TimelineContent
            key={`${artist.src}-${index}`}
            as="figure"
            animationNum={artist.animationNum}
            timelineRef={heroRef}
            customVariants={index === 0 ? revealVariants : revealVariants2}
            className={`group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-amber-200/45 bg-white/40 shadow-[0_20px_50px_rgba(176,106,31,0.14)] ${artist.figureClassName}`}
          >
            <img
              src={artist.src}
              alt={artist.alt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${artist.imageClassName}`}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2d160e]/80 to-transparent px-4 pb-4 pt-16">
              <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase text-[#9a5a1b] shadow-sm">
                {artist.label}
              </span>
            </figcaption>
          </TimelineContent>
        ))}
      </div>
    </section>
  );
}
