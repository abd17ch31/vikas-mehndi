import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? "2025-01-01",
  studioBasePath: import.meta.env.VITE_SANITY_STUDIO_BASE_PATH ?? "/studio",
};

export const isSanityConfigured = Boolean(
  sanityConfig.projectId && sanityConfig.dataset
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: false,
    })
  : null;
