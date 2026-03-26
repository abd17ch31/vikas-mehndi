import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Social = {
  name: string;
  image: string;
  href?: string;
};

interface AnimatedSocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

const AnimatedSocialLinks = React.forwardRef<
  HTMLDivElement,
  AnimatedSocialLinksProps
>(({ socials, className, ...props }, ref) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);

  const animation = {
    scale: clicked ? [1, 1.12, 1] : 1,
    transition: { duration: 0.28 },
  };

  useEffect(() => {
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 200);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-wrap items-center justify-center gap-1 sm:gap-2 ${className || ""}`}
      {...props}
    >
      {socials.map((social, index) => (
        <a
          href={social.href || "#"}
          target="_blank"
          rel="noreferrer"
          className={`relative cursor-pointer px-4 py-3 transition-opacity duration-200 sm:px-5 ${
            hoveredSocial && hoveredSocial !== social.name ? "opacity-50" : "opacity-100"
          }`}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name);
            setRotation(Math.random() * 20 - 10);
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => {
            setClicked(true);
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={social.image}
              alt={social.name}
              loading="lazy"
              decoding="async"
              className="size-7 rounded-full object-contain bg-white/90 p-1 shadow-sm sm:size-8"
            />
            <span className="block text-base font-medium text-[#5a2a17] sm:text-lg">
              {social.name}
            </span>
          </div>
          <AnimatePresence>
            {hoveredSocial === social.name ? (
              <motion.div
                className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-full w-full items-center justify-center sm:flex"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  loading="lazy"
                  decoding="async"
                  className="size-14 rounded-full bg-white/95 p-2 shadow-lg sm:size-16"
                  initial={{
                    y: -34,
                    rotate: rotation,
                    opacity: 0,
                    filter: "blur(2px)",
                  }}
                  animate={{ y: -44, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -34, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </a>
      ))}
    </div>
  );
});

AnimatedSocialLinks.displayName = "AnimatedSocialLinks";

export default AnimatedSocialLinks;
