import {
  imageArray,
  imageField,
  imageItemArray,
  json,
  requireSession,
  writeClient,
} from "./admin-utils.mjs";

export async function handler(event) {
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
        logo: imageField(payload.business?.logo?.assetId),
      },
      hero: {
        showcaseImages: imageArray(payload.hero?.showcaseImages),
      },
      aboutSection: {
        artistImages: imageItemArray(payload.aboutSection?.artistImages),
      },
      socialSection: {
        instagramIcon: imageField(payload.socialSection?.instagramIcon?.assetId),
        facebookIcon: imageField(payload.socialSection?.facebookIcon?.assetId),
        whatsappIcon: imageField(payload.socialSection?.whatsappIcon?.assetId),
        googleIcon: imageField(payload.socialSection?.googleIcon?.assetId),
      },
      services: {
        bridal: {
          categoryImage: imageField(payload.services?.bridal?.categoryImage?.assetId),
          carouselImage: imageField(payload.services?.bridal?.carouselImage?.assetId),
          galleryCover: imageField(payload.services?.bridal?.galleryCover?.assetId),
          galleryImages: imageArray(payload.services?.bridal?.galleryImages),
        },
        engagement: {
          categoryImage: imageField(payload.services?.engagement?.categoryImage?.assetId),
          carouselImage: imageField(payload.services?.engagement?.carouselImage?.assetId),
          galleryCover: imageField(payload.services?.engagement?.galleryCover?.assetId),
          galleryImages: imageArray(payload.services?.engagement?.galleryImages),
        },
        portrait: {
          categoryImage: imageField(payload.services?.portrait?.categoryImage?.assetId),
          carouselImage: imageField(payload.services?.portrait?.carouselImage?.assetId),
          galleryCover: imageField(payload.services?.portrait?.galleryCover?.assetId),
          galleryImages: imageArray(payload.services?.portrait?.galleryImages),
        },
        babyShower: {
          categoryImage: imageField(payload.services?.babyShower?.categoryImage?.assetId),
          carouselImage: imageField(payload.services?.babyShower?.carouselImage?.assetId),
          galleryCover: imageField(payload.services?.babyShower?.galleryCover?.assetId),
          galleryImages: imageArray(payload.services?.babyShower?.galleryImages),
        },
        festival: {
          categoryImage: imageField(payload.services?.festival?.categoryImage?.assetId),
          carouselImage: imageField(payload.services?.festival?.carouselImage?.assetId),
          galleryCover: imageField(payload.services?.festival?.galleryCover?.assetId),
          galleryImages: imageArray(payload.services?.festival?.galleryImages),
        },
        guest: {
          categoryImage: imageField(payload.services?.guest?.categoryImage?.assetId),
          carouselImage: imageField(payload.services?.guest?.carouselImage?.assetId),
          galleryCover: imageField(payload.services?.guest?.galleryCover?.assetId),
          galleryImages: imageArray(payload.services?.guest?.galleryImages),
        },
      },
      testimonials: imageItemArray(payload.testimonials),
    })
    .commit();

  return json(200, { ok: true });
}
