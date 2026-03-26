"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export interface Testimonial {
  image: string;
  name: string;
  username: string;
  text: string;
  social: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
  title?: string;
  description?: string;
  maxDisplayed?: number;
}

export function Testimonials({
  testimonials,
  className,
  title = "Client love from Jaipur celebrations",
  description = "Real words from brides, families, and event guests who booked Vikas Mehandi Art for elegant mehndi moments.",
  maxDisplayed = 6,
}: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false);

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const visibleTestimonials = testimonials.slice(
    0,
    showAll ? testimonials.length : maxDisplayed
  );

  return (
    <div className={className}>
      <div className="mb-8 flex flex-col items-center justify-center sm:mb-10">
        <div className="flex max-w-3xl flex-col gap-4 text-center">
          <h2 className="text-4xl font-medium text-[#5a2a17] sm:text-5xl">
            {title}
          </h2>
          <p className="text-base leading-7 text-[#7a5842] sm:text-lg sm:leading-8">
            {description}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3",
            !showAll &&
              testimonials.length > maxDisplayed &&
              "max-h-[1150px] overflow-hidden sm:max-h-[950px] xl:max-h-[720px]"
          )}
        >
          {visibleTestimonials.map((testimonial, index) => (
            (() => {
              const SocialIcon = index % 2 === 0 ? Icons.instagram : Icons.google;
              const socialLabel = index % 2 === 0 ? "Instagram" : "Google";

              return (
            <Card
              key={`${testimonial.username}-${index}`}
              className="relative h-full rounded-[1.7rem] border border-amber-300/25 bg-white/75 p-5 text-[#5a2a17] shadow-[0_20px_60px_rgba(182,117,47,0.12)] backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-amber-300/35"
                />
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold text-[#5a2a17]">
                    {testimonial.name}
                  </span>
                  <span className="block truncate text-sm text-[#8a654e]">
                    {testimonial.username}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openInNewTab(testimonial.social)}
                  className="rounded-full border border-amber-300/25 bg-[#fff7eb] p-2 text-[#9a5a1a] transition hover:text-[#7d4214]"
                  aria-label={`Open ${socialLabel} profile for ${testimonial.name}`}
                >
                  <SocialIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5">
                <p className="text-[15px] font-medium leading-7 text-[#5f3a26]">
                  {testimonial.text}
                </p>
              </div>
            </Card>
              );
            })()
          ))}
        </div>

        {testimonials.length > maxDisplayed && !showAll ? (
          <>
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#fff4e7] to-transparent" />
            <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="rounded-full border border-amber-200/15 bg-amber-400 px-6 py-3 text-sm font-semibold text-[#2a120d] shadow-[0_18px_45px_rgba(251,191,36,0.18)] transition hover:bg-amber-300"
              >
                Load More Reviews
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
