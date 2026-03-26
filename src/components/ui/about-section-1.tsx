"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export default function AboutSection1() {
  const heroRef = useRef<HTMLDivElement>(null);

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
          Why Choose Us
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
            {"Why clients choose our artistry, precision, and celebration-ready mehndi experience"}
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={heroRef}
          className="mb-8 text-center text-sm leading-relaxed text-[#7a5842] sm:text-lg"
        >
          Our artists focus on graceful detailing, clean application, patient service,
          and designs that suit the event, the outfit, and the client’s style. From
          bridal bookings to guest groups, the experience stays polished from start to finish.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          customVariants={revealVariants3}
          timelineRef={heroRef}
          className="mx-auto"
        >
          <Link
            to="/why-choose-us"
            className="mx-auto flex w-fit gap-2 rounded-full border border-amber-300 bg-amber-400 px-5 py-3 text-white shadow-lg shadow-amber-200 transition-all duration-300 ease-in-out hover:gap-4 hover:bg-amber-500"
          >
            Explore Why Choose Us <ArrowRight />
          </Link>
        </TimelineContent>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 pt-16 sm:grid-cols-4 lg:h-[26rem] md:h-[22rem] sm:h-[18rem] h-[18rem]">
        <TimelineContent
          as="figure"
          animationNum={2}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="h-full w-full overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(176,106,31,0.14)]"
        >
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop"
            alt="Artist portrait"
            loading="lazy"
            decoding="async"
            className="h-full w-full rotate-2 object-cover"
          />
        </TimelineContent>
        <TimelineContent
          as="figure"
          animationNum={3}
          timelineRef={heroRef}
          customVariants={revealVariants2}
          className="h-full w-full overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(176,106,31,0.14)]"
        >
          <img
            src="https://images.unsplash.com/photo-1609179242555-1d7b4b0a568c?q=80&w=687&auto=format&fit=crop"
            alt="Artist portrait"
            loading="lazy"
            decoding="async"
            className="h-full w-full -rotate-2 object-cover"
          />
        </TimelineContent>
        <TimelineContent
          as="figure"
          animationNum={4}
          timelineRef={heroRef}
          customVariants={revealVariants2}
          className="h-full w-full overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(176,106,31,0.14)]"
        >
          <img
            src="https://images.unsplash.com/photo-1611695434398-4f4b330623e6?q=80&w=735&auto=format&fit=crop"
            alt="Artist portrait"
            loading="lazy"
            decoding="async"
            className="h-full w-full -rotate-2 object-cover"
          />
        </TimelineContent>
        <TimelineContent
          as="figure"
          animationNum={5}
          timelineRef={heroRef}
          customVariants={revealVariants2}
          className="h-full w-full overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(176,106,31,0.14)]"
        >
          <img
            src="https://images.unsplash.com/photo-1567934872913-aacea74458b7?q=80&w=687&auto=format&fit=crop"
            alt="Artist portrait"
            loading="lazy"
            decoding="async"
            className="h-full w-full rotate-2 object-cover"
          />
        </TimelineContent>
      </div>
    </section>
  );
}
