"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Bridal Mehndi 1",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
  {
    title: "Bridal Mehndi 2",
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
  {
    title: "Festive Mehndi",
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
  {
    title: "Engagement Mehndi",
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
  {
    title: "Guest Mehndi",
    src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
  {
    title: "Portrait Design",
    src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
  {
    title: "Celebration Look",
    src: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
  {
    title: "Wedding Guest Style",
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1200&fit=crop&crop=center&auto=format&q=80",
  },
];

export function StickyCard001({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  src: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 14 + 180}px)`,
        }}
        className="relative -top-1/4 flex h-[220px] w-[290px] origin-top flex-col overflow-hidden rounded-[1.8rem] border border-amber-100/12 bg-black/10 shadow-[0_22px_60px_rgba(0,0,0,0.28)]
                   sm:h-[260px] sm:w-[360px]
                   md:h-[300px] md:w-[430px]
                   lg:h-[340px] lg:w-[520px]"
      >
        <img
          src={src}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12070a]/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100/80">
            Our Work
          </p>
          <h3 className="mt-1 text-lg font-semibold text-amber-50 sm:text-xl">
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
}

export function ImagesScrollingAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={container}
      className="relative flex w-full flex-col items-center justify-center pb-[78vh] pt-[4vh] sm:pb-[88vh] sm:pt-[6vh] lg:pb-[98vh] lg:pt-[8vh]"
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(0.55, 1 - (projects.length - i - 1) * 0.06);

        return (
          <StickyCard001
            key={`project_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.12, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
