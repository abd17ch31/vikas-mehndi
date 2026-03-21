"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const horizontalOffset = Math.random() * window.innerWidth;
  const verticalOffset = Math.random() * window.innerHeight;

  switch (side) {
    case 0:
      return { x: horizontalOffset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: verticalOffset, angle: 135 };
    case 2:
      return { x: horizontalOffset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: verticalOffset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export function ShootingStars({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#f7c56d",
  trailColor = "#f59e0b",
  starWidth = 10,
  starHeight = 1,
  className,
}: ShootingStarsProps) {
  const gradientId = useId().replace(/:/g, "");
  const [star, setStar] = useState<ShootingStar | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const nextStar: ShootingStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };

      setStar(nextStar);

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutRef.current = window.setTimeout(createStar, randomDelay);
    };

    createStar();

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [maxDelay, maxSpeed, minDelay, minSpeed]);

  useEffect(() => {
    if (!star) {
      return;
    }

    const moveStar = () => {
      setStar((previousStar) => {
        if (!previousStar) {
          return null;
        }

        const newX =
          previousStar.x +
          previousStar.speed * Math.cos((previousStar.angle * Math.PI) / 180);
        const newY =
          previousStar.y +
          previousStar.speed * Math.sin((previousStar.angle * Math.PI) / 180);
        const newDistance = previousStar.distance + previousStar.speed;
        const newScale = 1 + newDistance / 100;

        if (
          newX < -20 ||
          newX > window.innerWidth + 20 ||
          newY < -20 ||
          newY > window.innerHeight + 20
        ) {
          return null;
        }

        return {
          ...previousStar,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: newScale,
        };
      });
    };

    const animationFrame = window.requestAnimationFrame(moveStar);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [star]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      {star ? (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#${gradientId})`}
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      ) : null}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
