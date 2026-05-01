import crypto from "node:crypto";

import { createClient } from "@sanity/client";

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION || "2025-02-19";
const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const adminPassword = process.env.ADMIN_DASHBOARD_PASSWORD || process.env.ADMIN_PASSWORD;
const sessionSecret = process.env.ADMIN_SESSION_SECRET;

export const imageQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  business{
    "logo": select(
      defined(logo.asset) || defined(logo.url) => {
        "assetId": coalesce(logo.asset->_id, logo.assetId),
        "url": coalesce(logo.asset->url, logo.url)
      }
    )
  },
  hero{
    showcaseImages[]{
      "assetId": coalesce(asset->_id, assetId),
      "url": coalesce(asset->url, url)
    }
  },
  aboutSection{
    artistImages[]{
      "assetId": coalesce(image.asset->_id, image.assetId),
      "url": coalesce(image.asset->url, image.url)
    }
  },
  socialSection{
    "instagramIcon": select(
      defined(instagramIcon.asset) || defined(instagramIcon.url) => {
        "assetId": coalesce(instagramIcon.asset->_id, instagramIcon.assetId),
        "url": coalesce(instagramIcon.asset->url, instagramIcon.url)
      }
    ),
    "facebookIcon": select(
      defined(facebookIcon.asset) || defined(facebookIcon.url) => {
        "assetId": coalesce(facebookIcon.asset->_id, facebookIcon.assetId),
        "url": coalesce(facebookIcon.asset->url, facebookIcon.url)
      }
    ),
    "whatsappIcon": select(
      defined(whatsappIcon.asset) || defined(whatsappIcon.url) => {
        "assetId": coalesce(whatsappIcon.asset->_id, whatsappIcon.assetId),
        "url": coalesce(whatsappIcon.asset->url, whatsappIcon.url)
      }
    ),
    "googleIcon": select(
      defined(googleIcon.asset) || defined(googleIcon.url) => {
        "assetId": coalesce(googleIcon.asset->_id, googleIcon.assetId),
        "url": coalesce(googleIcon.asset->url, googleIcon.url)
      }
    )
  },
  services{
    bridal{
      "categoryImage": select(defined(categoryImage.asset) || defined(categoryImage.url) => {
        "assetId": coalesce(categoryImage.asset->_id, categoryImage.assetId),
        "url": coalesce(categoryImage.asset->url, categoryImage.url)
      }),
      "carouselImage": select(defined(carouselImage.asset) || defined(carouselImage.url) => {
        "assetId": coalesce(carouselImage.asset->_id, carouselImage.assetId),
        "url": coalesce(carouselImage.asset->url, carouselImage.url)
      }),
      "galleryCover": select(defined(galleryCover.asset) || defined(galleryCover.url) => {
        "assetId": coalesce(galleryCover.asset->_id, galleryCover.assetId),
        "url": coalesce(galleryCover.asset->url, galleryCover.url)
      }),
      galleryImages[]{
        "assetId": coalesce(asset->_id, assetId),
        "url": coalesce(asset->url, url)
      }
    },
    engagement{
      "categoryImage": select(defined(categoryImage.asset) || defined(categoryImage.url) => {
        "assetId": coalesce(categoryImage.asset->_id, categoryImage.assetId),
        "url": coalesce(categoryImage.asset->url, categoryImage.url)
      }),
      "carouselImage": select(defined(carouselImage.asset) || defined(carouselImage.url) => {
        "assetId": coalesce(carouselImage.asset->_id, carouselImage.assetId),
        "url": coalesce(carouselImage.asset->url, carouselImage.url)
      }),
      "galleryCover": select(defined(galleryCover.asset) || defined(galleryCover.url) => {
        "assetId": coalesce(galleryCover.asset->_id, galleryCover.assetId),
        "url": coalesce(galleryCover.asset->url, galleryCover.url)
      }),
      galleryImages[]{
        "assetId": coalesce(asset->_id, assetId),
        "url": coalesce(asset->url, url)
      }
    },
    portrait{
      "categoryImage": select(defined(categoryImage.asset) || defined(categoryImage.url) => {
        "assetId": coalesce(categoryImage.asset->_id, categoryImage.assetId),
        "url": coalesce(categoryImage.asset->url, categoryImage.url)
      }),
      "carouselImage": select(defined(carouselImage.asset) || defined(carouselImage.url) => {
        "assetId": coalesce(carouselImage.asset->_id, carouselImage.assetId),
        "url": coalesce(carouselImage.asset->url, carouselImage.url)
      }),
      "galleryCover": select(defined(galleryCover.asset) || defined(galleryCover.url) => {
        "assetId": coalesce(galleryCover.asset->_id, galleryCover.assetId),
        "url": coalesce(galleryCover.asset->url, galleryCover.url)
      }),
      galleryImages[]{
        "assetId": coalesce(asset->_id, assetId),
        "url": coalesce(asset->url, url)
      }
    },
    babyShower{
      "categoryImage": select(defined(categoryImage.asset) || defined(categoryImage.url) => {
        "assetId": coalesce(categoryImage.asset->_id, categoryImage.assetId),
        "url": coalesce(categoryImage.asset->url, categoryImage.url)
      }),
      "carouselImage": select(defined(carouselImage.asset) || defined(carouselImage.url) => {
        "assetId": coalesce(carouselImage.asset->_id, carouselImage.assetId),
        "url": coalesce(carouselImage.asset->url, carouselImage.url)
      }),
      "galleryCover": select(defined(galleryCover.asset) || defined(galleryCover.url) => {
        "assetId": coalesce(galleryCover.asset->_id, galleryCover.assetId),
        "url": coalesce(galleryCover.asset->url, galleryCover.url)
      }),
      galleryImages[]{
        "assetId": coalesce(asset->_id, assetId),
        "url": coalesce(asset->url, url)
      }
    },
    festival{
      "categoryImage": select(defined(categoryImage.asset) || defined(categoryImage.url) => {
        "assetId": coalesce(categoryImage.asset->_id, categoryImage.assetId),
        "url": coalesce(categoryImage.asset->url, categoryImage.url)
      }),
      "carouselImage": select(defined(carouselImage.asset) || defined(carouselImage.url) => {
        "assetId": coalesce(carouselImage.asset->_id, carouselImage.assetId),
        "url": coalesce(carouselImage.asset->url, carouselImage.url)
      }),
      "galleryCover": select(defined(galleryCover.asset) || defined(galleryCover.url) => {
        "assetId": coalesce(galleryCover.asset->_id, galleryCover.assetId),
        "url": coalesce(galleryCover.asset->url, galleryCover.url)
      }),
      galleryImages[]{
        "assetId": coalesce(asset->_id, assetId),
        "url": coalesce(asset->url, url)
      }
    },
    guest{
      "categoryImage": select(defined(categoryImage.asset) || defined(categoryImage.url) => {
        "assetId": coalesce(categoryImage.asset->_id, categoryImage.assetId),
        "url": coalesce(categoryImage.asset->url, categoryImage.url)
      }),
      "carouselImage": select(defined(carouselImage.asset) || defined(carouselImage.url) => {
        "assetId": coalesce(carouselImage.asset->_id, carouselImage.assetId),
        "url": coalesce(carouselImage.asset->url, carouselImage.url)
      }),
      "galleryCover": select(defined(galleryCover.asset) || defined(galleryCover.url) => {
        "assetId": coalesce(galleryCover.asset->_id, galleryCover.assetId),
        "url": coalesce(galleryCover.asset->url, galleryCover.url)
      }),
      galleryImages[]{
        "assetId": coalesce(asset->_id, assetId),
        "url": coalesce(asset->url, url)
      }
    }
  },
  testimonials[]{
    "assetId": coalesce(image.asset->_id, image.assetId),
    "url": coalesce(image.asset->url, image.url)
  }
}`;

export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});

export const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const base64UrlEncode = (value) => Buffer.from(value).toString("base64url");

const base64UrlDecode = (value) => Buffer.from(value, "base64url").toString("utf8");

export const createSessionToken = () => {
  if (!sessionSecret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  const payload = JSON.stringify({
    exp: Date.now() + 1000 * 60 * 60 * 12,
  });
  const encodedPayload = base64UrlEncode(payload);
  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
};

export const verifySessionToken = (token) => {
  if (!token || !sessionSecret) return false;

  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return false;

    const expectedSignature = crypto
      .createHmac("sha256", sessionSecret)
      .update(encodedPayload)
      .digest("base64url");

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (signatureBuffer.length !== expectedBuffer.length) return false;
    if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
};

export const getBearerToken = (headers = {}) => {
  const authHeader = headers.authorization || headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length);
};

export const requireSession = (headers) => {
  const token = getBearerToken(headers);
  return verifySessionToken(token);
};

export const verifyPassword = (password) =>
  Boolean(adminPassword) && password === adminPassword;

export const ref = (assetId) =>
  assetId && !assetId.startsWith("default:")
    ? { _type: "reference", _ref: assetId }
    : undefined;

export const imageField = (image) => {
  if (!image?.assetId && !image?.url) return undefined;

  const asset = ref(image.assetId);
  return asset
    ? { _type: "image", asset }
    : { _type: "image", assetId: image.assetId, url: image.url };
};

const keyFor = (item, index) =>
  Buffer.from(`${item?.assetId || item?.url || "image"}-${index}`)
    .toString("base64url")
    .slice(0, 12);

export const imageArray = (items = []) =>
  items
    .filter((item) => item?.assetId || item?.url)
    .map((item, index) => ({
      _key: keyFor(item, index),
      _type: "image",
      ...(ref(item.assetId)
        ? { asset: ref(item.assetId) }
        : { assetId: item.assetId, url: item.url }),
    }));

export const imageItemArray = (items = []) =>
  items
    .filter((item) => item?.assetId || item?.url)
    .map((item, index) => ({
      _key: keyFor(item, index),
      _type: "imageItem",
      image: imageField(item),
    }));
