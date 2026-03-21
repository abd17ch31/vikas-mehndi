"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode, RefObject } from "react";

type TimelineTag = "div" | "p" | "a" | "figure" | "button" | "section" | "span";

const motionComponents: Record<TimelineTag, typeof motion.div> = {
  div: motion.div,
  p: motion.p as typeof motion.div,
  a: motion.a as typeof motion.div,
  figure: motion.figure as typeof motion.div,
  button: motion.button as typeof motion.div,
  section: motion.section as typeof motion.div,
  span: motion.span as typeof motion.div,
};

interface TimelineContentProps {
  as?: TimelineTag;
  animationNum?: number;
  customVariants?: Variants;
  timelineRef?: RefObject<HTMLElement | null>;
  className?: string;
  children?: ReactNode;
  href?: string;
  style?: CSSProperties;
}

export function TimelineContent({
  as = "div",
  animationNum = 0,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps) {
  const Component = motionComponents[as];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={animationNum}
      variants={
        customVariants || {
          hidden: { opacity: 0, y: 24 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.12, duration: 0.6 },
          }),
        }
      }
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
