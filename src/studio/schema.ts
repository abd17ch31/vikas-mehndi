import { defineField, defineType } from "sanity";

const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "image", title: "Icon URL", type: "url" }),
    defineField({ name: "href", title: "Link", type: "url" }),
  ],
});

const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "icon", title: "Icon Name", type: "string" }),
    defineField({ name: "popupTitle", title: "Popup Title", type: "string" }),
    defineField({
      name: "popupText",
      title: "Popup Text",
      type: "text",
      rows: 5,
    }),
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

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "username", title: "Username", type: "string" }),
    defineField({ name: "text", title: "Review", type: "text", rows: 4 }),
    defineField({ name: "social", title: "Profile Link", type: "url" }),
    defineField({ name: "image", title: "Avatar", type: "image" }),
  ],
});

const artistImage = defineType({
  name: "artistImage",
  title: "Artist Image",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "alt", title: "Alt Text", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image" }),
  ],
});

const whyChooseFeature = defineType({
  name: "whyChooseFeature",
  title: "Why Choose Feature",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "icon", title: "Icon Name", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "points",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "business",
      title: "Business",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Business Name", type: "string" }),
        defineField({ name: "owner", title: "Owner", type: "string" }),
        defineField({ name: "location", title: "Location", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({
          name: "whatsappNumber",
          title: "WhatsApp Number",
          type: "string",
        }),
        defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
        defineField({
          name: "instagramHandle",
          title: "Instagram Handle",
          type: "string",
        }),
        defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
        defineField({ name: "xUrl", title: "X URL", type: "url" }),
        defineField({ name: "mapsUrl", title: "Google Maps URL", type: "url" }),
        defineField({ name: "areaLabel", title: "Area Label", type: "string" }),
        defineField({ name: "regionLabel", title: "Region Label", type: "string" }),
        defineField({ name: "logo", title: "Logo", type: "image" }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "Href", type: "string" }),
              ],
            },
          ],
        }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
        defineField({
          name: "showcaseImages",
          title: "Showcase Images",
          type: "array",
          of: [{ type: "image" }],
        }),
      ],
    }),
    defineField({
      name: "homeServicesSection",
      title: "Home Services Section",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "testimonialsSection",
      title: "Testimonials Section",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "maxDisplayed", title: "Max Displayed", type: "number" }),
      ],
    }),
    defineField({
      name: "aboutSection",
      title: "About Section",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
        defineField({
          name: "artistImages",
          title: "Artist Images",
          type: "array",
          of: [{ type: "artistImage" }],
        }),
      ],
    }),
    defineField({
      name: "socialSection",
      title: "Social Section",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [{ type: "socialLink" }],
        }),
      ],
    }),
    defineField({
      name: "servicesPage",
      title: "Services Page",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "galleryPage",
      title: "Gallery Page",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "popupBadge", title: "Popup Badge", type: "string" }),
        defineField({ name: "popupSubtitle", title: "Popup Subtitle", type: "string" }),
      ],
    }),
    defineField({
      name: "whyChoosePage",
      title: "Why Choose Page",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "callLabel", title: "Call Label", type: "string" }),
        defineField({ name: "backLabel", title: "Back Label", type: "string" }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
              ],
            },
          ],
        }),
        defineField({
          name: "interactiveBadge",
          title: "Interactive Badge",
          type: "string",
        }),
        defineField({ name: "standardsBadge", title: "Standards Badge", type: "string" }),
        defineField({ name: "standardsTitle", title: "Standards Title", type: "string" }),
        defineField({
          name: "standardsParagraphs",
          title: "Standards Paragraphs",
          type: "array",
          of: [{ type: "text" }],
        }),
        defineField({ name: "contactBadge", title: "Contact Badge", type: "string" }),
        defineField({
          name: "features",
          title: "Features",
          type: "array",
          of: [{ type: "whyChooseFeature" }],
        }),
      ],
    }),
    defineField({
      name: "locatePage",
      title: "Locate Page",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "addressLabel", title: "Address Label", type: "string" }),
        defineField({ name: "contactLabel", title: "Contact Label", type: "string" }),
        defineField({
          name: "callButtonLabel",
          title: "Call Button Label",
          type: "string",
        }),
        defineField({
          name: "directionsButtonLabel",
          title: "Directions Button Label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "bookingPage",
      title: "Booking Page",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "formTitle", title: "Form Title", type: "string" }),
        defineField({
          name: "formDescription",
          title: "Form Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({ name: "exploreLabel", title: "Explore Label", type: "string" }),
        defineField({ name: "servicesLabel", title: "Services Label", type: "string" }),
        defineField({ name: "contactLabel", title: "Contact Label", type: "string" }),
        defineField({
          name: "copyrightText",
          title: "Copyright Text",
          type: "string",
        }),
        defineField({
          name: "serviceNames",
          title: "Service Names",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "service" }],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "testimonial" }],
    }),
  ],
});

export const schemaTypes = [
  socialLink,
  service,
  testimonial,
  artistImage,
  whyChooseFeature,
  siteSettings,
];
