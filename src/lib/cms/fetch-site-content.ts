import { defaultSiteContent } from "@/lib/cms/default-site-content";
import { siteContentQuery } from "@/lib/cms/queries";
import { isSanityConfigured, sanityClient } from "@/lib/cms/sanity";
import type { SiteContent } from "@/lib/cms/types";

const withFallback = <T,>(value: T | null | undefined, fallback: T): T =>
  value ?? fallback;

const normalizeSiteContent = (value: Partial<SiteContent>): SiteContent => {
  const fallback = defaultSiteContent;

  return {
    business: { ...fallback.business, ...value.business },
    navigation: {
      ...fallback.navigation,
      ...value.navigation,
      links: withFallback(value.navigation?.links, fallback.navigation.links),
    },
    hero: {
      ...fallback.hero,
      ...value.hero,
      showcaseImages: withFallback(
        value.hero?.showcaseImages?.filter(Boolean),
        fallback.hero.showcaseImages
      ),
    },
    homeServicesSection: { ...fallback.homeServicesSection, ...value.homeServicesSection },
    testimonialsSection: { ...fallback.testimonialsSection, ...value.testimonialsSection },
    aboutSection: {
      ...fallback.aboutSection,
      ...value.aboutSection,
      artistImages: withFallback(
        value.aboutSection?.artistImages?.filter((item) => item?.src),
        fallback.aboutSection.artistImages
      ),
    },
    socialSection: {
      ...fallback.socialSection,
      ...value.socialSection,
      links: withFallback(
        value.socialSection?.links?.filter((item) => item?.href),
        fallback.socialSection.links
      ),
    },
    servicesPage: { ...fallback.servicesPage, ...value.servicesPage },
    galleryPage: { ...fallback.galleryPage, ...value.galleryPage },
    whyChoosePage: {
      ...fallback.whyChoosePage,
      ...value.whyChoosePage,
      highlights: withFallback(
        value.whyChoosePage?.highlights?.filter((item) => item?.label),
        fallback.whyChoosePage.highlights
      ),
      standardsParagraphs: withFallback(
        value.whyChoosePage?.standardsParagraphs?.filter(Boolean),
        fallback.whyChoosePage.standardsParagraphs
      ),
      features: withFallback(
        value.whyChoosePage?.features?.filter((item) => item?.id),
        fallback.whyChoosePage.features
      ),
    },
    locatePage: { ...fallback.locatePage, ...value.locatePage },
    bookingPage: { ...fallback.bookingPage, ...value.bookingPage },
    footer: {
      ...fallback.footer,
      ...value.footer,
      serviceNames: withFallback(
        value.footer?.serviceNames?.filter(Boolean),
        fallback.footer.serviceNames
      ),
    },
    services: withFallback(value.services?.filter((item) => item?.id), fallback.services),
    testimonials: withFallback(
      value.testimonials?.filter((item) => item?.name),
      fallback.testimonials
    ),
  };
};

export const fetchSiteContent = async (): Promise<SiteContent> => {
  if (!isSanityConfigured || !sanityClient) {
    return defaultSiteContent;
  }

  try {
    const content = await sanityClient.fetch<Partial<SiteContent> | null>(siteContentQuery);
    if (!content) {
      return defaultSiteContent;
    }

    return normalizeSiteContent(content);
  } catch (error) {
    console.error("Failed to fetch Sanity content, falling back to defaults.", error);
    return defaultSiteContent;
  }
};
