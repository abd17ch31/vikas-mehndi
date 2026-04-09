"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { businessDetails } from "@/lib/business-details";

const squareData = [
  { id: 1, src: "./src/components/abc/forportfolioprroifle.jpg" },
  { id: 2, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80" },
  { id: 5, src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80" },
  { id: 6, src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80" },
  { id: 7, src: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80" },
  { id: 8, src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80" },
  { id: 9, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80" },
  { id: 10, src: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80" },
  { id: 11, src: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=900&auto=format&fit=crop&q=80" },
  { id: 12, src: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&auto=format&fit=crop&q=80" },
  { id: 13, src: "https://images.unsplash.com/photo-1506629905607-d405b7a10db9?w=900&auto=format&fit=crop&q=80" },
  { id: 14, src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80" },
  { id: 15, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80" },
  { id: 16, src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=80" },
];

const shuffle = (array: (typeof squareData)[number][]) => {
  const copied = [...array];
  let currentIndex = copied.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [copied[currentIndex], copied[randomIndex]] = [
      copied[randomIndex],
      copied[currentIndex],
    ];
  }

  return copied;
};

const generateSquares = () =>
  shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="h-full w-full overflow-hidden rounded-2xl bg-[#2c1518]"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid h-[320px] grid-cols-4 grid-rows-4 gap-2 sm:h-[420px] lg:h-[520px]">
      {squares.map((sq) => sq)}
    </div>
  );
};

export const ShuffleHero = () => {
  return (
    <section
      id="section-2"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-12"
    >
      <div>
        
        
        <h2 className="text-4xl font-semibold tracking-[-0.04em] text-amber-50 sm:text-5xl lg:text-6xl">
          Signature mehndi styles for every celebration
        </h2>
        <p className="my-4 max-w-xl text-base leading-7 text-amber-50/72 sm:my-6 sm:text-lg sm:leading-8">
          From intricate bridal patterns to Arabic, engagement, and festive
          designs, {businessDetails.name} creates elegant looks that photograph
          beautifully and feel tailored to each event in {businessDetails.areaLabel}.
        </p>
        <a
          href="#services"
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-[#2a120d]",
            "transition-all hover:bg-amber-300 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12070a]"
          )}
        >
          Explore Services
        </a>
      </div>
      <ShuffleGrid />
    </section>
  );
};
