"use client";

import { useSiteContent } from "@/components/providers/site-content-provider";
import AnimatedSocialLinks from "@/components/ui/social-links";

export function SocialFollowSection() {
  const { siteContent } = useSiteContent();

  return (
    <section
      id="follow-us"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-300/35 bg-white/65 px-6 py-12 shadow-[0_22px_60px_rgba(176,106,31,0.10)] backdrop-blur-md sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-amber-300/50 bg-[#fff6df] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
            {siteContent.socialSection.badge}
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#5a2a17] sm:text-4xl md:text-5xl">
            {siteContent.socialSection.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#7a5842] sm:text-lg">
            {siteContent.socialSection.description}
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <AnimatedSocialLinks socials={siteContent.socialSection.links} />
        </div>
      </div>
    </section>
  );
}
