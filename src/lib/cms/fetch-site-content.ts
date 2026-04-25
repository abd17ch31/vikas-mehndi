import { defaultSiteContent } from "@/lib/cms/default-site-content";
import { siteContentQuery } from "@/lib/cms/queries";
import { isSanityConfigured, sanityClient } from "@/lib/cms/sanity";
import type { SiteContent, SiteImageContent } from "@/lib/cms/types";

const serviceKeyMap = {
  bridal: "bridal",
  engagement: "engagement",
  portrait: "portrait",
  "baby-shower": "babyShower",
  festival: "festival",
  guest: "guest",
} as const;

const mergeByIndex = <T extends object>(
  fallback: T[],
  overrides: Array<Partial<T> | null | undefined> | null | undefined
): T[] =>
  fallback.map((item, index) => ({
    ...item,
    ...(overrides?.[index] ?? {}),
  }));

const normalizeSiteContent = (value: SiteImageContent): SiteContent => {
  const fallback = defaultSiteContent;

  const mergedServices = fallback.services.map((service) => {
    const overrideKey = serviceKeyMap[service.id as keyof typeof serviceKeyMap];
    const override = overrideKey ? value.services?.[overrideKey] : undefined;

    return {
      ...service,
      ...override,
      galleryImages:
        override?.galleryImages?.filter(Boolean) ?? service.galleryImages,
    };
  });

  const socialIcons = [
    value.socialSection?.instagramIcon,
    value.socialSection?.facebookIcon,
    value.socialSection?.whatsappIcon,
    value.socialSection?.googleIcon,
  ];

  return {
    ...fallback,
    business: {
      ...fallback.business,
      logoUrl: value.business?.logoUrl ?? fallback.business.logoUrl,
    },
    hero: {
      ...fallback.hero,
      showcaseImages:
        value.hero?.showcaseImages?.filter(Boolean) ?? fallback.hero.showcaseImages,
    },
    aboutSection: {
      ...fallback.aboutSection,
      artistImages: mergeByIndex(
        fallback.aboutSection.artistImages,
        value.aboutSection?.artistImages
      ),
    },
    socialSection: {
      ...fallback.socialSection,
      links: fallback.socialSection.links.map((link, index) => ({
        ...link,
        image: socialIcons[index] ?? link.image,
      })),
    },
    services: mergedServices,
    testimonials: mergeByIndex(fallback.testimonials, value.testimonials),
  };
};

export const fetchSiteContent = async (): Promise<SiteContent> => {
  if (!isSanityConfigured || !sanityClient) {
    return defaultSiteContent;
  }

  try {
    const content = await sanityClient.fetch<SiteImageContent | null>(siteContentQuery);
    if (!content) {
      return defaultSiteContent;
    }

    return normalizeSiteContent(content);
  } catch (error) {
    console.error("Failed to fetch Sanity content, falling back to defaults.", error);
    return defaultSiteContent;
  }
};
