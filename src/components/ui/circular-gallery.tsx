import React, { useMemo, useState, type HTMLAttributes } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const swipeHandlers = useMemo(
      () => ({
        onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
          if (info.offset.x < -60) {
            setActiveIndex((previous) => Math.min(previous + 1, items.length - 1));
            return;
          }

          if (info.offset.x > 60) {
            setActiveIndex((previous) => Math.max(previous - 1, 0));
          }
        },
      }),
      [items.length]
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Swipe Gallery"
        className={cn("relative w-full", className)}
        {...props}
      >
        <div className="overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            className="flex touch-pan-y"
            {...swipeHandlers}
          >
            {items.map((item) => (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="w-full shrink-0 px-3 sm:px-4"
              >
                <div className="mx-auto h-[340px] max-w-[260px] overflow-hidden rounded-[1.8rem] border border-amber-200/35 bg-white/75 shadow-[0_24px_70px_rgba(120,71,28,0.16)] backdrop-blur-lg sm:h-[420px] sm:max-w-[300px] lg:h-[500px] lg:max-w-[360px]">
                  <div className="relative h-full w-full">
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: item.photo.pos || "center" }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#3d1f14]/82 to-transparent p-4 text-white sm:p-5">
                      <h2 className="text-lg font-bold sm:text-xl">{item.common}</h2>
                      <em className="text-sm italic opacity-85">{item.binomial}</em>
                      <p className="mt-2 text-xs opacity-75">Photo by: {item.photo.by}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.common}
              type="button"
              aria-label={`Show ${item.common}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-8 bg-amber-500"
                  : "w-2.5 bg-amber-300/70 hover:bg-amber-400/80"
              )}
            />
          ))}
        </div>

        <div className="mt-5 hidden items-center justify-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => setActiveIndex((previous) => Math.max(previous - 1, 0))}
            className="rounded-full border border-amber-300/40 bg-white/80 px-4 py-2 text-sm font-medium text-[#7a4b24] transition hover:bg-[#fff3dd]"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((previous) => Math.min(previous + 1, items.length - 1))
            }
            className="rounded-full border border-amber-300/40 bg-white/80 px-4 py-2 text-sm font-medium text-[#7a4b24] transition hover:bg-[#fff3dd]"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
