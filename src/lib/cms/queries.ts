export const siteContentQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  business{
    "logoUrl": logo.asset->url
  },
  hero{
    "showcaseImages": showcaseImages[].asset->url
  },
  aboutSection{
    artistImages[]{
      "src": image.asset->url
    }
  },
  socialSection{
    "instagramIcon": instagramIcon.asset->url,
    "facebookIcon": facebookIcon.asset->url,
    "whatsappIcon": whatsappIcon.asset->url,
    "googleIcon": googleIcon.asset->url
  },
  services{
    bridal{
      "categoryImage": categoryImage.asset->url,
      "carouselImage": carouselImage.asset->url,
      "galleryCover": galleryCover.asset->url,
      "galleryImages": galleryImages[].asset->url
    },
    engagement{
      "categoryImage": categoryImage.asset->url,
      "carouselImage": carouselImage.asset->url,
      "galleryCover": galleryCover.asset->url,
      "galleryImages": galleryImages[].asset->url
    },
    portrait{
      "categoryImage": categoryImage.asset->url,
      "carouselImage": carouselImage.asset->url,
      "galleryCover": galleryCover.asset->url,
      "galleryImages": galleryImages[].asset->url
    },
    babyShower{
      "categoryImage": categoryImage.asset->url,
      "carouselImage": carouselImage.asset->url,
      "galleryCover": galleryCover.asset->url,
      "galleryImages": galleryImages[].asset->url
    },
    festival{
      "categoryImage": categoryImage.asset->url,
      "carouselImage": carouselImage.asset->url,
      "galleryCover": galleryCover.asset->url,
      "galleryImages": galleryImages[].asset->url
    },
    guest{
      "categoryImage": categoryImage.asset->url,
      "carouselImage": carouselImage.asset->url,
      "galleryCover": galleryCover.asset->url,
      "galleryImages": galleryImages[].asset->url
    }
  },
  testimonials[]{
    "image": image.asset->url
  }
}`;
