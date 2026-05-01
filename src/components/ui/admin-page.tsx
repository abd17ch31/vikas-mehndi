import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  clearAdminSession,
  fetchAdminImages,
  getAdminSession,
  loginAdmin,
  saveAdminImages,
  uploadAdminImage,
} from "@/lib/admin/api";
import type { AdminImage, AdminImagesState } from "@/lib/admin/types";
import { defaultSiteContent } from "@/lib/cms/default-site-content";

type SaveState = "idle" | "saving" | "saved" | "error";
type ServiceKey = keyof AdminImagesState["services"];
type SearchItem = {
  id: string;
  title: string;
  image?: AdminImage;
  defaultImage?: AdminImage;
  reset: () => Promise<void>;
  replace: (file: File) => Promise<void>;
};

const asDefaultImage = (url: string): AdminImage => ({
  assetId: `default:${url}`,
  url,
});

const serviceEntries: Array<{ key: ServiceKey; label: string }> = [
  { key: "bridal", label: "Bridal" },
  { key: "engagement", label: "Engagement" },
  { key: "portrait", label: "Portrait" },
  { key: "babyShower", label: "Baby Shower" },
  { key: "festival", label: "Stylish" },
  { key: "guest", label: "Guest" },
];

const homeIds = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

const galleryIds = "abcdefghijklmnopqrstuvwxyz".split("");

const defaultImagesState: AdminImagesState = {
  business: {
    logo: asDefaultImage(defaultSiteContent.business.logoUrl),
  },
  hero: {
    showcaseImages: defaultSiteContent.hero.showcaseImages.map(asDefaultImage),
  },
  aboutSection: {
    artistImages: defaultSiteContent.aboutSection.artistImages.map((item) =>
      asDefaultImage(item.src)
    ),
  },
  socialSection: {
    instagramIcon: asDefaultImage(defaultSiteContent.socialSection.links[0].image),
    facebookIcon: asDefaultImage(defaultSiteContent.socialSection.links[1].image),
    whatsappIcon: asDefaultImage(defaultSiteContent.socialSection.links[2].image),
    googleIcon: asDefaultImage(defaultSiteContent.socialSection.links[3].image),
  },
  services: {
    bridal: {
      categoryImage: asDefaultImage(defaultSiteContent.services[0].categoryImage),
      carouselImage: asDefaultImage(defaultSiteContent.services[0].carouselImage),
      galleryCover: asDefaultImage(defaultSiteContent.services[0].galleryCover),
      galleryImages: defaultSiteContent.services[0].galleryImages.map(asDefaultImage),
    },
    engagement: {
      categoryImage: asDefaultImage(defaultSiteContent.services[1].categoryImage),
      carouselImage: asDefaultImage(defaultSiteContent.services[1].carouselImage),
      galleryCover: asDefaultImage(defaultSiteContent.services[1].galleryCover),
      galleryImages: defaultSiteContent.services[1].galleryImages.map(asDefaultImage),
    },
    portrait: {
      categoryImage: asDefaultImage(defaultSiteContent.services[2].categoryImage),
      carouselImage: asDefaultImage(defaultSiteContent.services[2].carouselImage),
      galleryCover: asDefaultImage(defaultSiteContent.services[2].galleryCover),
      galleryImages: defaultSiteContent.services[2].galleryImages.map(asDefaultImage),
    },
    babyShower: {
      categoryImage: asDefaultImage(defaultSiteContent.services[3].categoryImage),
      carouselImage: asDefaultImage(defaultSiteContent.services[3].carouselImage),
      galleryCover: asDefaultImage(defaultSiteContent.services[3].galleryCover),
      galleryImages: defaultSiteContent.services[3].galleryImages.map(asDefaultImage),
    },
    festival: {
      categoryImage: asDefaultImage(defaultSiteContent.services[4].categoryImage),
      carouselImage: asDefaultImage(defaultSiteContent.services[4].carouselImage),
      galleryCover: asDefaultImage(defaultSiteContent.services[4].galleryCover),
      galleryImages: defaultSiteContent.services[4].galleryImages.map(asDefaultImage),
    },
    guest: {
      categoryImage: asDefaultImage(defaultSiteContent.services[5].categoryImage),
      carouselImage: asDefaultImage(defaultSiteContent.services[5].carouselImage),
      galleryCover: asDefaultImage(defaultSiteContent.services[5].galleryCover),
      galleryImages: defaultSiteContent.services[5].galleryImages.map(asDefaultImage),
    },
  },
  testimonials: defaultSiteContent.testimonials.map((item) =>
    asDefaultImage(item.image)
  ),
};

const emptyState: AdminImagesState = {
  business: {},
  hero: { showcaseImages: [] },
  aboutSection: { artistImages: [] },
  socialSection: {},
  services: {
    bridal: { galleryImages: [] },
    engagement: { galleryImages: [] },
    portrait: { galleryImages: [] },
    babyShower: { galleryImages: [] },
    festival: { galleryImages: [] },
    guest: { galleryImages: [] },
  },
  testimonials: [],
};

const mergeImages = (data: AdminImagesState): AdminImagesState => ({
  ...emptyState,
  ...data,
  business: {
    logo: data.business?.logo,
  },
  hero: {
    showcaseImages: data.hero?.showcaseImages ?? [],
  },
  aboutSection: {
    artistImages: data.aboutSection?.artistImages ?? [],
  },
  socialSection: {
    instagramIcon: data.socialSection?.instagramIcon,
    facebookIcon: data.socialSection?.facebookIcon,
    whatsappIcon: data.socialSection?.whatsappIcon,
    googleIcon: data.socialSection?.googleIcon,
  },
  services: {
    bridal: data.services?.bridal ?? emptyState.services.bridal,
    engagement: data.services?.engagement ?? emptyState.services.engagement,
    portrait: data.services?.portrait ?? emptyState.services.portrait,
    babyShower: data.services?.babyShower ?? emptyState.services.babyShower,
    festival: data.services?.festival ?? emptyState.services.festival,
    guest: data.services?.guest ?? emptyState.services.guest,
  },
  testimonials: data.testimonials ?? [],
});

function ImageRow({
  id,
  title,
  image,
  defaultImage,
  onReset,
  onReplace,
}: {
  id: string;
  title: string;
  image?: AdminImage;
  defaultImage?: AdminImage;
  onReset: () => Promise<void>;
  onReplace: (file: File) => Promise<void>;
}) {
  const [busy, setBusy] = useState<"reset" | "replace" | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const replaceFile = async (file?: File) => {
    if (!file) return;

    setBusy("replace");
    try {
      await onReplace(file);
    } finally {
      setBusy(null);
    }
  };

  const handleReplace = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await replaceFile(event.target.files?.[0]);
    } finally {
      event.target.value = "";
    }
  };

  const handleReset = async () => {
    if (!defaultImage) return;

    setBusy("reset");
    try {
      await onReset();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        void replaceFile(event.dataTransfer.files?.[0]);
      }}
      className={`flex flex-col gap-3 border p-4 sm:flex-row sm:items-center ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-neutral-300"
      }`}
    >
      <div className="w-36 shrink-0">
        <div className="font-semibold text-neutral-900">{id}</div>
        <div className="text-sm text-neutral-600">{title}</div>
      </div>

      <div className="h-24 w-24 shrink-0 overflow-hidden border border-neutral-300 bg-neutral-100">
        {image?.url ? (
          <img src={image.url} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-500">
            empty
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 text-xs text-neutral-500">
        <div className="truncate">{image?.url ?? "No image set"}</div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!defaultImage || busy !== null}
          onClick={() => void handleReset()}
          className="border border-neutral-400 px-3 py-2 text-sm disabled:opacity-50"
        >
          {busy === "reset" ? "Resetting..." : "Reset"}
        </button>

        <label className="cursor-pointer border border-neutral-400 px-3 py-2 text-sm">
          {busy === "replace" ? "Uploading..." : "Replace"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy !== null}
            onChange={handleReplace}
          />
        </label>
      </div>
    </div>
  );
}

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [images, setImages] = useState<AdminImagesState>(emptyState);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const imagesRef = useRef(images);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      setToken(session);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    fetchAdminImages(token)
      .then((data) => {
        const nextImages = mergeImages(data);
        imagesRef.current = nextImages;
        setImages(nextImages);
        setError(null);
      })
      .catch((err: Error) => {
        clearAdminSession();
        setToken(null);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const commitImages = async (
    updater: (current: AdminImagesState) => AdminImagesState
  ) => {
    if (!token) {
      setError("Session not found. Login again.");
      return;
    }

    const nextImages = updater(imagesRef.current);
    imagesRef.current = nextImages;
    setImages(nextImages);
    setSaveState("saving");
    setError(null);

    try {
      await saveAdminImages(token, nextImages);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    } catch (err) {
      setSaveState("error");
      setError(err instanceof Error ? err.message : "Save failed.");
    }
  };

  const upload = async (file: File) => {
    if (!token) throw new Error("Session not found. Login again.");
    return uploadAdminImage(token, file);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAuthLoading(true);
    setError(null);

    try {
      const nextToken = await loginAdmin(password);
      setToken(nextToken);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    clearAdminSession();
    setToken(null);
    imagesRef.current = emptyState;
    setImages(emptyState);
  };

  const replaceHomeImage = async (index: number, file: File) => {
    const uploaded = await upload(file);
    await commitImages((current) => {
      const showcaseImages = [...current.hero.showcaseImages];
      showcaseImages[index] = uploaded;
      return { ...current, hero: { showcaseImages } };
    });
  };

  const resetHomeImage = async (index: number) => {
    const defaultImage = defaultImagesState.hero.showcaseImages[index];
    if (!defaultImage) return;

    await commitImages((current) => {
      const showcaseImages = [...current.hero.showcaseImages];
      showcaseImages[index] = defaultImage;
      return { ...current, hero: { showcaseImages } };
    });
  };

  const replaceGalleryCover = async (serviceKey: ServiceKey, file: File) => {
    const uploaded = await upload(file);
    await commitImages((current) => ({
      ...current,
      services: {
        ...current.services,
        [serviceKey]: {
          ...current.services[serviceKey],
          galleryCover: uploaded,
        },
      },
    }));
  };

  const resetGalleryCover = async (serviceKey: ServiceKey) => {
    const defaultImage = defaultImagesState.services[serviceKey].galleryCover;
    if (!defaultImage) return;

    await commitImages((current) => ({
      ...current,
      services: {
        ...current.services,
        [serviceKey]: {
          ...current.services[serviceKey],
          galleryCover: defaultImage,
        },
      },
    }));
  };

  const replaceGalleryImage = async (
    serviceKey: ServiceKey,
    index: number,
    file: File
  ) => {
    const uploaded = await upload(file);
    await commitImages((current) => {
      const galleryImages = [...current.services[serviceKey].galleryImages];
      galleryImages[index] = uploaded;
      return {
        ...current,
        services: {
          ...current.services,
          [serviceKey]: {
            ...current.services[serviceKey],
            galleryImages,
          },
        },
      };
    });
  };

  const resetGalleryImage = async (serviceKey: ServiceKey, index: number) => {
    const defaultImage = defaultImagesState.services[serviceKey].galleryImages[index];
    if (!defaultImage) return;

    await commitImages((current) => {
      const galleryImages = [...current.services[serviceKey].galleryImages];
      galleryImages[index] = defaultImage;
      return {
        ...current,
        services: {
          ...current.services,
          [serviceKey]: {
            ...current.services[serviceKey],
            galleryImages,
          },
        },
      };
    });
  };

  const searchItems: SearchItem[] = [
    ...images.hero.showcaseImages.map((image, index) => ({
      id: homeIds[index] ?? `home-${index + 1}`,
      title: "Home hero image",
      image,
      defaultImage: defaultImagesState.hero.showcaseImages[index],
      reset: () => resetHomeImage(index),
      replace: (file: File) => replaceHomeImage(index, file),
    })),
    ...serviceEntries.flatMap((entry) => [
      {
        id: `${entry.key} cover`,
        title: `${entry.label} gallery cover`,
        image: images.services[entry.key].galleryCover,
        defaultImage: defaultImagesState.services[entry.key].galleryCover,
        reset: () => resetGalleryCover(entry.key),
        replace: (file: File) => replaceGalleryCover(entry.key, file),
      },
      ...images.services[entry.key].galleryImages.map((image, index) => ({
        id: `${entry.key} ${galleryIds[index] ?? `image-${index + 1}`}`,
        title: `${entry.label} gallery image`,
        image,
        defaultImage: defaultImagesState.services[entry.key].galleryImages[index],
        reset: () => resetGalleryImage(entry.key, index),
        replace: (file: File) => replaceGalleryImage(entry.key, index, file),
      })),
    ]),
  ];

  const normalize = (value: string) =>
    value.trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");

  const foundItem =
    submittedQuery.trim().length > 0
      ? searchItems.find((item) => normalize(item.id) === normalize(submittedQuery))
      : undefined;

  if (!token) {
    return (
      <main className="min-h-screen bg-white p-6 text-neutral-900">
        <form onSubmit={handleLogin} className="mx-auto mt-20 max-w-sm space-y-4 border p-4">
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full border px-3 py-2"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={isAuthLoading}
            className="w-full border border-neutral-500 px-3 py-2"
          >
            {isAuthLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4 text-neutral-900 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-neutral-600">Status: {saveState}</p>
          </div>
          <button type="button" onClick={logout} className="border px-3 py-2">
            Logout
          </button>
        </header>

        {error ? <p className="border border-red-300 p-3 text-red-700">{error}</p> : null}

        {isLoading ? <p>Loading...</p> : null}

        {!isLoading ? (
          <section className="space-y-4 border border-neutral-300 p-4">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmittedQuery(query);
              }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold" htmlFor="image-search">
                Search image ID
              </label>
              <input
                id="image-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try: one, two, bridal a, bridal cover"
                className="w-full border border-neutral-400 px-3 py-2"
              />
              <p className="text-xs text-neutral-500">
                Home IDs: one, two, three... Gallery IDs: bridal a, bridal b,
                engagement cover, guest a...
              </p>
            </form>

            {submittedQuery && !foundItem ? (
              <p className="border border-yellow-300 p-3 text-sm">
                No image found for "{submittedQuery}".
              </p>
            ) : null}

            {foundItem ? (
              <ImageRow
                id={foundItem.id}
                title={foundItem.title}
                image={foundItem.image}
                defaultImage={foundItem.defaultImage}
                onReset={foundItem.reset}
                onReplace={foundItem.replace}
              />
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
}
