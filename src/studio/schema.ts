import { defineField, defineType } from "sanity";

const serviceImageSet = defineType({
  name: "serviceImageSet",
  title: "Service Images",
  type: "object",
  fields: [
    defineField({ name: "categoryImage", title: "Category Image", type: "image" }),
    defineField({ name: "carouselImage", title: "Carousel Image", type: "image" }),
    defineField({ name: "galleryCover", title: "Gallery Cover", type: "image" }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});

const imageItem = defineType({
  name: "imageItem",
  title: "Image Item",
  type: "object",
  fields: [defineField({ name: "image", title: "Image", type: "image" })],
  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Image",
        media,
      };
    },
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Images",
  type: "document",
  fields: [
    defineField({
      name: "business",
      title: "Business",
      type: "object",
      fields: [defineField({ name: "logo", title: "Logo", type: "image" })],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "showcaseImages",
          title: "Showcase Images",
          type: "array",
          of: [{ type: "image" }],
        }),
      ],
    }),
    defineField({
      name: "aboutSection",
      title: "About Section",
      type: "object",
      fields: [
        defineField({
          name: "artistImages",
          title: "Artist Images",
          type: "array",
          of: [{ type: "imageItem" }],
        }),
      ],
    }),
    defineField({
      name: "socialSection",
      title: "Social Icons",
      type: "object",
      fields: [
        defineField({ name: "instagramIcon", title: "Instagram Icon", type: "image" }),
        defineField({ name: "facebookIcon", title: "Facebook Icon", type: "image" }),
        defineField({ name: "whatsappIcon", title: "WhatsApp Icon", type: "image" }),
        defineField({ name: "googleIcon", title: "Google Icon", type: "image" }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      fields: [
        defineField({ name: "bridal", title: "Bridal", type: "serviceImageSet" }),
        defineField({ name: "engagement", title: "Engagement", type: "serviceImageSet" }),
        defineField({ name: "portrait", title: "Portrait", type: "serviceImageSet" }),
        defineField({ name: "babyShower", title: "Baby Shower", type: "serviceImageSet" }),
        defineField({ name: "festival", title: "Festival / Stylish", type: "serviceImageSet" }),
        defineField({ name: "guest", title: "Guest", type: "serviceImageSet" }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonial Images",
      type: "array",
      of: [{ type: "imageItem" }],
    }),
  ],
});

export const schemaTypes = [imageItem, serviceImageSet, siteSettings];
