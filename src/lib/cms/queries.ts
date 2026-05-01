export const siteContentQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  business{
    "logoUrl": coalesce(logo.asset->url, logo.url)
  },
  hero{
    "showcaseImages": showcaseImages[]{"url": coalesce(asset->url, url)}[].url
  },
  aboutSection{
    artistImages[]{
      "src": coalesce(image.asset->url, image.url)
    }
  },
  socialSection{
    "instagramIcon": coalesce(instagramIcon.asset->url, instagramIcon.url),
    "facebookIcon": coalesce(facebookIcon.asset->url, facebookIcon.url),
    "whatsappIcon": coalesce(whatsappIcon.asset->url, whatsappIcon.url),
    "googleIcon": coalesce(googleIcon.asset->url, googleIcon.url)
  },
  services{
    bridal{
      "categoryImage": coalesce(categoryImage.asset->url, categoryImage.url),
      "carouselImage": coalesce(carouselImage.asset->url, carouselImage.url),
      "galleryCover": coalesce(galleryCover.asset->url, galleryCover.url),
      "galleryImages": galleryImages[]{"url": coalesce(asset->url, url)}[].url
    },
    engagement{
      "categoryImage": coalesce(categoryImage.asset->url, categoryImage.url),
      "carouselImage": coalesce(carouselImage.asset->url, carouselImage.url),
      "galleryCover": coalesce(galleryCover.asset->url, galleryCover.url),
      "galleryImages": galleryImages[]{"url": coalesce(asset->url, url)}[].url
    },
    portrait{
      "categoryImage": coalesce(categoryImage.asset->url, categoryImage.url),
      "carouselImage": coalesce(carouselImage.asset->url, carouselImage.url),
      "galleryCover": coalesce(galleryCover.asset->url, galleryCover.url),
      "galleryImages": galleryImages[]{"url": coalesce(asset->url, url)}[].url
    },
    babyShower{
      "categoryImage": coalesce(categoryImage.asset->url, categoryImage.url),
      "carouselImage": coalesce(carouselImage.asset->url, carouselImage.url),
      "galleryCover": coalesce(galleryCover.asset->url, galleryCover.url),
      "galleryImages": galleryImages[]{"url": coalesce(asset->url, url)}[].url
    },
    festival{
      "categoryImage": coalesce(categoryImage.asset->url, categoryImage.url),
      "carouselImage": coalesce(carouselImage.asset->url, carouselImage.url),
      "galleryCover": coalesce(galleryCover.asset->url, galleryCover.url),
      "galleryImages": galleryImages[]{"url": coalesce(asset->url, url)}[].url
    },
    guest{
      "categoryImage": coalesce(categoryImage.asset->url, categoryImage.url),
      "carouselImage": coalesce(carouselImage.asset->url, carouselImage.url),
      "galleryCover": coalesce(galleryCover.asset->url, galleryCover.url),
      "galleryImages": galleryImages[]{"url": coalesce(asset->url, url)}[].url
    }
  },
  testimonials[]{
    "image": coalesce(image.asset->url, image.url)
  }
}`;
