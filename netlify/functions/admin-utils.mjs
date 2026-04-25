import crypto from "node:crypto";

import { createClient } from "@sanity/client";

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION || "2025-02-19";
const writeToken = process.env.SANITY_API_WRITE_TOKEN;
const adminPassword = process.env.ADMIN_DASHBOARD_PASSWORD;
const sessionSecret = process.env.ADMIN_SESSION_SECRET;

export const imageQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  business{
    "logo": select(
      defined(logo.asset) => {
        "assetId": logo.asset->_id,
        "url": logo.asset->url
      }
    )
  },
  hero{
    showcaseImages[]{
      "assetId": asset->_id,
      "url": asset->url
    }
  },
  aboutSection{
    artistImages[]{
      "assetId": image.asset->_id,
      "url": image.asset->url
    }
  },
  socialSection{
    "instagramIcon": select(
      defined(instagramIcon.asset) => {
        "assetId": instagramIcon.asset->_id,
        "url": instagramIcon.asset->url
      }
    ),
    "facebookIcon": select(
      defined(facebookIcon.asset) => {
        "assetId": facebookIcon.asset->_id,
        "url": facebookIcon.asset->url
      }
    ),
    "whatsappIcon": select(
      defined(whatsappIcon.asset) => {
        "assetId": whatsappIcon.asset->_id,
        "url": whatsappIcon.asset->url
      }
    ),
    "googleIcon": select(
      defined(googleIcon.asset) => {
        "assetId": googleIcon.asset->_id,
        "url": googleIcon.asset->url
      }
    )
  },
  services{
    bridal{
      "categoryImage": select(
        defined(categoryImage.asset) => {
          "assetId": categoryImage.asset->_id,
          "url": categoryImage.asset->url
        }
      ),
      "carouselImage": select(
        defined(carouselImage.asset) => {
          "assetId": carouselImage.asset->_id,
          "url": carouselImage.asset->url
        }
      ),
      "galleryCover": select(
        defined(galleryCover.asset) => {
          "assetId": galleryCover.asset->_id,
          "url": galleryCover.asset->url
        }
      ),
      galleryImages[]{
        "assetId": asset->_id,
        "url": asset->url
      }
    },
    engagement{
      "categoryImage": select(
        defined(categoryImage.asset) => {
          "assetId": categoryImage.asset->_id,
          "url": categoryImage.asset->url
        }
      ),
      "carouselImage": select(
        defined(carouselImage.asset) => {
          "assetId": carouselImage.asset->_id,
          "url": carouselImage.asset->url
        }
      ),
      "galleryCover": select(
        defined(galleryCover.asset) => {
          "assetId": galleryCover.asset->_id,
          "url": galleryCover.asset->url
        }
      ),
      galleryImages[]{
        "assetId": asset->_id,
        "url": asset->url
      }
    },
    portrait{
      "categoryImage": select(
        defined(categoryImage.asset) => {
          "assetId": categoryImage.asset->_id,
          "url": categoryImage.asset->url
        }
      ),
      "carouselImage": select(
        defined(carouselImage.asset) => {
          "assetId": carouselImage.asset->_id,
          "url": carouselImage.asset->url
        }
      ),
      "galleryCover": select(
        defined(galleryCover.asset) => {
          "assetId": galleryCover.asset->_id,
          "url": galleryCover.asset->url
        }
      ),
      galleryImages[]{
        "assetId": asset->_id,
        "url": asset->url
      }
    },
    babyShower{
      "categoryImage": select(
        defined(categoryImage.asset) => {
          "assetId": categoryImage.asset->_id,
          "url": categoryImage.asset->url
        }
      ),
      "carouselImage": select(
        defined(carouselImage.asset) => {
          "assetId": carouselImage.asset->_id,
          "url": carouselImage.asset->url
        }
      ),
      "galleryCover": select(
        defined(galleryCover.asset) => {
          "assetId": galleryCover.asset->_id,
          "url": galleryCover.asset->url
        }
      ),
      galleryImages[]{
        "assetId": asset->_id,
        "url": asset->url
      }
    },
    festival{
      "categoryImage": select(
        defined(categoryImage.asset) => {
          "assetId": categoryImage.asset->_id,
          "url": categoryImage.asset->url
        }
      ),
      "carouselImage": select(
        defined(carouselImage.asset) => {
          "assetId": carouselImage.asset->_id,
          "url": carouselImage.asset->url
        }
      ),
      "galleryCover": select(
        defined(galleryCover.asset) => {
          "assetId": galleryCover.asset->_id,
          "url": galleryCover.asset->url
        }
      ),
      galleryImages[]{
        "assetId": asset->_id,
        "url": asset->url
      }
    },
    guest{
      "categoryImage": select(
        defined(categoryImage.asset) => {
          "assetId": categoryImage.asset->_id,
          "url": categoryImage.asset->url
        }
      ),
      "carouselImage": select(
        defined(carouselImage.asset) => {
          "assetId": carouselImage.asset->_id,
          "url": carouselImage.asset->url
        }
      ),
      "galleryCover": select(
        defined(galleryCover.asset) => {
          "assetId": galleryCover.asset->_id,
          "url": galleryCover.asset->url
        }
      ),
      galleryImages[]{
        "assetId": asset->_id,
        "url": asset->url
      }
    }
  },
  testimonials[]{
    "assetId": image.asset->_id,
    "url": image.asset->url
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

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return false;
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  return payload.exp > Date.now();
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
  assetId ? { _type: "reference", _ref: assetId } : undefined;

export const imageField = (assetId) =>
  assetId ? { _type: "image", asset: ref(assetId) } : undefined;

export const imageArray = (items = []) =>
  items
    .filter((item) => item?.assetId)
    .map((item) => ({
      _type: "image",
      asset: ref(item.assetId),
    }));

export const imageItemArray = (items = []) =>
  items
    .filter((item) => item?.assetId)
    .map((item) => ({
      _type: "imageItem",
      image: imageField(item.assetId),
    }));
