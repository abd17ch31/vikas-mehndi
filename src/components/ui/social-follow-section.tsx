"use client";

import AnimatedSocialLinks, { type Social } from "@/components/ui/social-links";

const socials: Social[] = [
  {
    name: "Instagram",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    href: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    href: "https://www.facebook.com/",
  },
  {
    name: "WhatsApp",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    href: "https://wa.me/",
  },
  {
    name: "Google",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    href: "https://www.google.com/maps",
  },
];

export function SocialFollowSection() {
  return (
    <section
      id="follow-us"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-300/35 bg-white/65 px-6 py-12 shadow-[0_22px_60px_rgba(176,106,31,0.10)] backdrop-blur-md sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-amber-300/50 bg-[#fff6df] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
            Follow Us
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#5a2a17] sm:text-4xl md:text-5xl">
            Follow us on social media
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#7a5842] sm:text-lg">
            Stay connected for bridal highlights, festive mehndi inspiration,
            fresh design updates, and booking-friendly contact options.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <AnimatedSocialLinks socials={socials} />
        </div>
      </div>
    </section>
  );
}
