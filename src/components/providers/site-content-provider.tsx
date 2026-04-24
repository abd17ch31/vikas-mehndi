import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { fetchSiteContent } from "@/lib/cms/fetch-site-content";
import { defaultSiteContent } from "@/lib/cms/default-site-content";
import { isSanityConfigured } from "@/lib/cms/sanity";
import type { SiteContent } from "@/lib/cms/types";

type SiteContentContextValue = {
  siteContent: SiteContent;
  isCmsEnabled: boolean;
  isLoading: boolean;
};

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

export function SiteContentProvider({ children }: PropsWithChildren) {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(isSanityConfigured);

  useEffect(() => {
    let isMounted = true;

    fetchSiteContent()
      .then((content) => {
        if (isMounted) {
          setSiteContent(content);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      siteContent,
      isCmsEnabled: isSanityConfigured,
      isLoading,
    }),
    [isLoading, siteContent]
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export const useSiteContent = (): SiteContentContextValue => {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider.");
  }

  return context;
};
