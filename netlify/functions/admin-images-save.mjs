import {
  imageArray,
  imageField,
  imageItemArray,
  json,
  requireSession,
  writeClient,
} from "./admin-utils.mjs";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed." });
    }

    if (!requireSession(event.headers)) {
      return json(401, { error: "Unauthorized." });
    }

    const payload = JSON.parse(event.body || "{}");

  await writeClient.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
  });

  await writeClient
    .patch("siteSettings")
    .set({
      business: {
        logo: imageField(payload.business?.logo),
      },
      hero: {
        showcaseImages: imageArray(payload.hero?.showcaseImages),
      },
      aboutSection: {
        artistImages: imageItemArray(payload.aboutSection?.artistImages),
      },
      socialSection: {
        instagramIcon: imageField(payload.socialSection?.instagramIcon),
        facebookIcon: imageField(payload.socialSection?.facebookIcon),
        whatsappIcon: imageField(payload.socialSection?.whatsappIcon),
        googleIcon: imageField(payload.socialSection?.googleIcon),
      },
      services: {
        bridal: {
          categoryImage: imageField(payload.services?.bridal?.categoryImage),
          carouselImage: imageField(payload.services?.bridal?.carouselImage),
          galleryCover: imageField(payload.services?.bridal?.galleryCover),
          galleryImages: imageArray(payload.services?.bridal?.galleryImages),
        },
        engagement: {
          categoryImage: imageField(payload.services?.engagement?.categoryImage),
          carouselImage: imageField(payload.services?.engagement?.carouselImage),
          galleryCover: imageField(payload.services?.engagement?.galleryCover),
          galleryImages: imageArray(payload.services?.engagement?.galleryImages),
        },
        portrait: {
          categoryImage: imageField(payload.services?.portrait?.categoryImage),
          carouselImage: imageField(payload.services?.portrait?.carouselImage),
          galleryCover: imageField(payload.services?.portrait?.galleryCover),
          galleryImages: imageArray(payload.services?.portrait?.galleryImages),
        },
        babyShower: {
          categoryImage: imageField(payload.services?.babyShower?.categoryImage),
          carouselImage: imageField(payload.services?.babyShower?.carouselImage),
          galleryCover: imageField(payload.services?.babyShower?.galleryCover),
          galleryImages: imageArray(payload.services?.babyShower?.galleryImages),
        },
        festival: {
          categoryImage: imageField(payload.services?.festival?.categoryImage),
          carouselImage: imageField(payload.services?.festival?.carouselImage),
          galleryCover: imageField(payload.services?.festival?.galleryCover),
          galleryImages: imageArray(payload.services?.festival?.galleryImages),
        },
        guest: {
          categoryImage: imageField(payload.services?.guest?.categoryImage),
          carouselImage: imageField(payload.services?.guest?.carouselImage),
          galleryCover: imageField(payload.services?.guest?.galleryCover),
          galleryImages: imageArray(payload.services?.guest?.galleryImages),
        },
      },
      testimonials: imageItemArray(payload.testimonials),
    })
    .commit();

    return json(200, { ok: true });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : "Image save failed.",
    });
  }
}
