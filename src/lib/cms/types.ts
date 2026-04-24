export type SocialLink = {
  name: string;
  image: string;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type ServiceContent = {
  id: string;
  title: string;
  shortDescription: string;
  categoryImage: string;
  carouselImage: string;
  galleryCover: string;
  galleryImages: string[];
  icon: string;
  popupTitle: string;
  popupText: string;
};

export type TestimonialContent = {
  image: string;
  text: string;
  name: string;
  username: string;
  social: string;
};

export type AboutArtistImage = {
  src: string;
  alt: string;
  label: string;
};

export type WhyChooseFeature = {
  id: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  points: string[];
};

export type SiteContent = {
  business: {
    name: string;
    owner: string;
    location: string;
    phone: string;
    whatsappNumber: string;
    instagramUrl: string;
    instagramHandle: string;
    facebookUrl: string;
    xUrl: string;
    mapsUrl: string;
    areaLabel: string;
    regionLabel: string;
    logoUrl: string;
  };
  navigation: {
    links: NavLink[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    ctaText: string;
    showcaseImages: string[];
  };
  homeServicesSection: {
    badge: string;
    title: string;
    description: string;
  };
  testimonialsSection: {
    badge: string;
    title: string;
    description: string;
    maxDisplayed: number;
  };
  aboutSection: {
    badge: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    artistImages: AboutArtistImage[];
  };
  socialSection: {
    badge: string;
    title: string;
    description: string;
    links: SocialLink[];
  };
  servicesPage: {
    badge: string;
    title: string;
    description: string;
  };
  galleryPage: {
    badge: string;
    title: string;
    description: string;
    popupBadge: string;
    popupSubtitle: string;
  };
  whyChoosePage: {
    badge: string;
    title: string;
    description: string;
    callLabel: string;
    backLabel: string;
    highlights: Array<{
      value: string;
      label: string;
    }>;
    interactiveBadge: string;
    standardsBadge: string;
    standardsTitle: string;
    standardsParagraphs: string[];
    contactBadge: string;
    features: WhyChooseFeature[];
  };
  locatePage: {
    badge: string;
    title: string;
    description: string;
    addressLabel: string;
    contactLabel: string;
    callButtonLabel: string;
    directionsButtonLabel: string;
  };
  bookingPage: {
    badge: string;
    title: string;
    description: string;
    formTitle: string;
    formDescription: string;
  };
  footer: {
    description: string;
    exploreLabel: string;
    servicesLabel: string;
    contactLabel: string;
    copyrightText: string;
    serviceNames: string[];
  };
  services: ServiceContent[];
  testimonials: TestimonialContent[];
};
