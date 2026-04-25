import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { sanityConfig } from "@/lib/cms/sanity";
import { schemaTypes } from "@/studio/schema";

export const studioConfig = defineConfig({
  basePath: sanityConfig.studioBasePath,
  projectId: sanityConfig.projectId || "missing-project-id",
  dataset: sanityConfig.dataset,
  title: "Vikas Mehndi Images",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Images")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
    visionTool(),
  ],
});
