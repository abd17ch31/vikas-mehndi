export type AdminImage = {
  assetId: string;
  url: string;
};

export type AdminImagesState = {
  business: {
    logo?: AdminImage;
  };
  hero: {
    showcaseImages: AdminImage[];
  };
  aboutSection: {
    artistImages: AdminImage[];
  };
  socialSection: {
    instagramIcon?: AdminImage;
    facebookIcon?: AdminImage;
    whatsappIcon?: AdminImage;
    googleIcon?: AdminImage;
  };
  services: {
    bridal: AdminServiceImages;
    engagement: AdminServiceImages;
    portrait: AdminServiceImages;
    babyShower: AdminServiceImages;
    festival: AdminServiceImages;
    guest: AdminServiceImages;
  };
  testimonials: AdminImage[];
};

export type AdminServiceImages = {
  categoryImage?: AdminImage;
  carouselImage?: AdminImage;
  galleryCover?: AdminImage;
  galleryImages: AdminImage[];
};
