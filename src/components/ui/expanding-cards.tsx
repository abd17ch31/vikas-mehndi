"use client";

import * as React from "react";
import {
  Baby,
  Gem,
  HandHeart,
  PartyPopper,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex
  );
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) {
      return {};
    }

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");

      return { gridTemplateColumns: columns };
    }

    const rows = items
      .map((_, index) => (index === activeIndex ? "4.6fr" : "1fr"))
      .join(" ");

    return { gridTemplateRows: rows };
  }, [activeIndex, isDesktop, items]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      ref={ref}
      className={cn(
        "grid h-[780px] w-full max-w-6xl gap-2 transition-[grid-template-columns,grid-template-rows] duration-500 ease-out md:h-[520px]",
        className
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-amber-100/12 bg-black/10 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)]",
            "md:min-w-[84px]"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-110 object-cover grayscale transition-all duration-300 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12070a]/90 via-[#12070a]/35 to-transparent" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-4 sm:p-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200/75 md:hidden">
              Services
            </span>

            <h3 className="hidden origin-left rotate-90 text-sm font-light uppercase tracking-wider text-white/80 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>

            <div className="text-white/90 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            <h3 className="text-lg font-bold text-white md:text-xl md:opacity-0 md:transition-all md:duration-300 md:delay-150 md:ease-out md:group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            <p className="w-full max-w-xs text-sm text-white/80 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";

export const mehndiServices: CardItem[] = [
  {
    id: "bridal",
    title: "Bridal",
    description:
      "Full bridal mehndi with intricate palms, feet, and personalized motifs for wedding functions and portraits.",
    imgSrc:
      "./src/assets/images/cat-bridal.jpeg",
    icon: <Gem size={24} />,
    linkHref: "#book-appointment",
  },
  {
    id: "engagement",
    title: "Engagement",
    description:
      "Stylish engagement designs that feel elegant, balanced, and camera-ready for rings, couple shots, and celebrations.",
    imgSrc:
      "./src/assets/images/cat-engagement.jpeg",
    icon: <HandHeart size={24} />,
    linkHref: "#book-appointment",
  },
  {
    id: "portrait",
    title: "Portrait",
    description:
      "Custom portrait mehndi concepts created with careful detailing for standout bridal storytelling and signature looks.",
    imgSrc:
      "./src/assets/images/cat-portrait.jpeg",
    icon: <Sparkles size={24} />,
    linkHref: "#book-appointment",
  },
  {
    id: "baby-shower",
    title: "Baby Shower",
    description:
      "Soft celebratory mehndi styling for godh bharai and family events with graceful patterns and occasion-focused charm.",
    imgSrc:
      "./src/assets/images/cat-baby.jpeg",
    icon: <Baby size={24} />,
    linkHref: "#book-appointment",
  },
  {
    id: "festival",
    title: "Stylish",
    description:
      "Quick festive designs for Teej, Karwa Chauth, Diwali, and seasonal celebrations with rich ornamental flow.",
    imgSrc:
      "./src/assets/images/cat-stylish.jpeg",
    icon: <PartyPopper size={24} />,
    linkHref: "#book-appointment",
  },
  {
    id: "guest",
    title: "Guest",
    description:
      "Guest mehndi packages for wedding groups, friends, and family members with coordinated, polished event designs.",
    imgSrc:
      "./src/assets/images/cat-guest.jpeg",
    icon: <Users size={24} />,
    linkHref: "#book-appointment",
  },
];
