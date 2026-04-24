import { Studio } from "sanity";

import { isSanityConfigured } from "@/lib/cms/sanity";
import { studioConfig } from "@/studio/config";

export function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="relative z-10 mx-auto min-h-screen max-w-4xl px-4 py-16 text-[#5a2a17]">
        <div className="rounded-[2rem] border border-amber-300/35 bg-white/75 p-8 shadow-[0_24px_70px_rgba(176,106,31,0.10)] backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]">
            Sanity Setup Needed
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Connect your Sanity project</h1>
          <p className="mt-4 text-base leading-7 text-[#7a5842]">
            Add `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and optional
            `VITE_SANITY_API_VERSION` values in your environment, then reload the app.
            After that, this route will open the embedded Sanity Studio.
          </p>
        </div>
      </main>
    );
  }

  return <Studio config={studioConfig} />;
}
