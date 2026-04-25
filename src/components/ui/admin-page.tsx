import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  LoaderCircle,
  Lock,
  LogOut,
  RefreshCcw,
  RotateCcw,
} from "lucide-react";

import {
  clearAdminSession,
  fetchAdminImages,
  getAdminSession,
  loginAdmin,
  saveAdminImages,
  uploadAdminImage,
  uploadAdminImageFromUrl,
} from "@/lib/admin/api";
import type {
  AdminImage,
  AdminImagesState,
  AdminServiceImages,
} from "@/lib/admin/types";
import { defaultSiteContent } from "@/lib/cms/default-site-content";

type SaveState = "idle" | "saving" | "saved" | "error";

const asDefaultImage = (url: string): AdminImage => ({
  assetId: `default:${url}`,
  url,
});

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

const serviceEntries: Array<{
  key: keyof AdminImagesState["services"];
  label: string;
}> = [
  { key: "bridal", label: "Bridal" },
  { key: "engagement", label: "Engagement" },
  { key: "portrait", label: "Portrait" },
  { key: "babyShower", label: "Baby Shower" },
  { key: "festival", label: "Festival / Stylish" },
  { key: "guest", label: "Guest" },
];

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

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-amber-300/35 bg-white/80 p-6 shadow-[0_18px_45px_rgba(176,106,31,0.10)]">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-[#5a2a17]">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-[#7a5842]">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SingleImageEditor({
  label,
  image,
  defaultImage,
  onReset,
  onReplace,
}: {
  label: string;
  image?: AdminImage;
  defaultImage?: AdminImage;
  onReset: () => Promise<void>;
  onReplace: (file: File) => Promise<void>;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      await onReplace(file);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await onReset();
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="rounded-[1.5rem] border border-amber-200/60 bg-[#fffaf0] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5a1a]">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!defaultImage || isResetting}
            onClick={() => void handleReset()}
            className="inline-flex items-center justify-center rounded-full bg-[#fff3dd] p-2 text-[#7a4b24] transition hover:bg-[#ffe7b9] disabled:opacity-40"
            aria-label={`Reset ${label} to default`}
            title="Reset to default"
          >
            {isResetting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
          </button>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-[#2a120d] transition hover:bg-amber-300">
            {isUploading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}
            Replace
            <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
          </label>
        </div>
      </div>
      <div className="overflow-hidden rounded-[1.2rem] border border-amber-200/60 bg-white">
        {image ? (
          <img
            src={image.url}
            alt={label}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 items-center justify-center text-sm text-[#8a654e]">
            No image uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}

function ImageListEditor({
  title,
  images,
  defaultImages,
  onAdd,
  onResetAt,
  onReplaceAt,
  onMove,
}: {
  title: string;
  images: AdminImage[];
  defaultImages: AdminImage[];
  onAdd: (file: File) => Promise<void>;
  onResetAt: (index: number) => Promise<void>;
  onReplaceAt: (index: number, file: File) => Promise<void>;
  onMove: (from: number, to: number) => Promise<void>;
}) {
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const handleAdd = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusyKey("add");
    try {
      await onAdd(file);
    } finally {
      setBusyKey(null);
      event.target.value = "";
    }
  };

  const handleReplace =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setBusyKey(`replace-${index}`);
      try {
        await onReplaceAt(index, file);
      } finally {
        setBusyKey(null);
        event.target.value = "";
      }
    };

  const handleReset = async (index: number) => {
    setBusyKey(`reset-${index}`);
    try {
      await onResetAt(index);
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <div className="rounded-[1.5rem] border border-amber-200/60 bg-[#fffaf0] p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5a1a]">
          {title}
        </p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-[#2a120d] transition hover:bg-amber-300">
          {busyKey === "add" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          Add Image
          <input type="file" accept="image/*" className="hidden" onChange={handleAdd} />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="rounded-[1.2rem] border border-dashed border-amber-300/70 px-4 py-10 text-center text-sm text-[#8a654e]">
          No images yet. Use "Add Image" to create the list.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={`${image.assetId}-${index}`}
              className="overflow-hidden rounded-[1.2rem] border border-amber-200/60 bg-white"
            >
              <img
                src={image.url}
                alt={`${title} ${index + 1}`}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="flex items-center justify-between gap-2 p-3">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a654e]">
                  #{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => void onMove(index, index - 1)}
                    className="rounded-full border border-amber-200 bg-white p-2 text-[#7a4b24] disabled:opacity-40"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === images.length - 1}
                    onClick={() => void onMove(index, index + 1)}
                    className="rounded-full border border-amber-200 bg-white p-2 text-[#7a4b24] disabled:opacity-40"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={!defaultImages[index] || busyKey === `reset-${index}`}
                    onClick={() => void handleReset(index)}
                    className="rounded-full bg-[#fff3dd] p-2 text-[#7a4b24] transition hover:bg-[#ffe7b9] disabled:opacity-40"
                    aria-label={`Reset ${title} ${index + 1} to default`}
                    title="Reset to default"
                  >
                    {busyKey === `reset-${index}` ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                  </button>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#fff3dd] px-3 py-2 text-xs font-semibold text-[#7a4b24] transition hover:bg-[#ffe7b9]">
                    {busyKey === `replace-${index}` ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="h-4 w-4" />
                    )}
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleReplace(index)}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceEditor({
  label,
  service,
  defaultService,
  onResetSingle,
  onReplaceSingle,
  onAddGalleryImage,
  onResetGalleryImage,
  onReplaceGalleryImage,
  onMoveGalleryImage,
}: {
  label: string;
  service: AdminServiceImages;
  defaultService: AdminServiceImages;
  onResetSingle: (
    field: keyof Omit<AdminServiceImages, "galleryImages">
  ) => Promise<void>;
  onReplaceSingle: (
    field: keyof Omit<AdminServiceImages, "galleryImages">,
    file: File
  ) => Promise<void>;
  onAddGalleryImage: (file: File) => Promise<void>;
  onResetGalleryImage: (index: number) => Promise<void>;
  onReplaceGalleryImage: (index: number, file: File) => Promise<void>;
  onMoveGalleryImage: (from: number, to: number) => Promise<void>;
}) {
  return (
    <div className="space-y-4 rounded-[1.7rem] border border-amber-200/60 bg-[#fff8ee] p-5">
      <h3 className="text-xl font-semibold text-[#5a2a17]">{label}</h3>
      <div className="grid gap-4 lg:grid-cols-3">
        <SingleImageEditor
          label="Category Image"
          image={service.categoryImage}
          defaultImage={defaultService.categoryImage}
          onReset={() => onResetSingle("categoryImage")}
          onReplace={(file) => onReplaceSingle("categoryImage", file)}
        />
        <SingleImageEditor
          label="Carousel Image"
          image={service.carouselImage}
          defaultImage={defaultService.carouselImage}
          onReset={() => onResetSingle("carouselImage")}
          onReplace={(file) => onReplaceSingle("carouselImage", file)}
        />
        <SingleImageEditor
          label="Gallery Cover"
          image={service.galleryCover}
          defaultImage={defaultService.galleryCover}
          onReset={() => onResetSingle("galleryCover")}
          onReplace={(file) => onReplaceSingle("galleryCover", file)}
        />
      </div>
      <ImageListEditor
        title={`${label} Gallery Images`}
        images={service.galleryImages}
        defaultImages={defaultService.galleryImages}
        onAdd={onAddGalleryImage}
        onResetAt={onResetGalleryImage}
        onReplaceAt={onReplaceGalleryImage}
        onMove={onMoveGalleryImage}
      />
    </div>
  );
}

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [images, setImages] = useState<AdminImagesState>(emptyState);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    const existing = getAdminSession();
    if (!existing) {
      setIsLoading(false);
      return;
    }

    setToken(existing);
  }, []);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    fetchAdminImages(token)
      .then((data) => {
        setImages({
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
        setError(null);
      })
      .catch((err: Error) => {
        clearAdminSession();
        setToken(null);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const save = async (nextState: AdminImagesState) => {
    if (!token) return;

    setImages(nextState);
    setSaveState("saving");
    setError(null);

    try {
      await saveAdminImages(token, nextState);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    } catch (err) {
      setSaveState("error");
      setError(err instanceof Error ? err.message : "Failed to save changes.");
    }
  };

  const uploadAndGetImage = async (file: File) => {
    if (!token) {
      throw new Error("Missing session.");
    }

    return uploadAdminImage(token, file);
  };

  const restoreDefaultImage = async (defaultImage?: AdminImage) => {
    if (!token || !defaultImage) {
      throw new Error("Missing default image.");
    }

    const fileName =
      defaultImage.url.split("/").pop()?.split("?")[0] ?? `default-${Date.now()}.jpg`;

    return uploadAdminImageFromUrl(token, defaultImage.url, fileName);
  };

  const authStatusLabel = useMemo(() => {
    if (saveState === "saving") return "Saving";
    if (saveState === "saved") return "Saved";
    if (saveState === "error") return "Error";
    return "Ready";
  }, [saveState]);

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

  const handleLogout = () => {
    clearAdminSession();
    setToken(null);
    setImages(emptyState);
  };

  if (!token) {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[2rem] border border-amber-300/35 bg-white/80 p-8 shadow-[0_24px_70px_rgba(176,106,31,0.10)] backdrop-blur-md"
        >
          <div className="mb-6 flex items-center gap-3 text-[#5a2a17]">
            <div className="rounded-2xl bg-amber-100 p-3">
              <Lock className="h-6 w-6 text-[#9a5a1a]" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a5a1a]">
                Owner Access
              </p>
              <h1 className="text-2xl font-semibold">Image Dashboard</h1>
            </div>
          </div>

          <label className="block text-sm font-medium text-[#7a5842]">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border border-amber-300/45 bg-white px-4 text-[#5a2a17] outline-none ring-0 transition focus:border-amber-400"
              placeholder="Enter owner password"
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isAuthLoading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-semibold text-[#2a120d] transition hover:bg-amber-300 disabled:opacity-60"
          >
            {isAuthLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            Unlock Dashboard
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-amber-300/35 bg-white/80 p-6 shadow-[0_18px_45px_rgba(176,106,31,0.10)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9a5a1a]">
                Owner Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#5a2a17]">
                Manage Website Images
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7a5842]">
                Upload, replace, and reorder images. Every change is saved to Sanity immediately.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-amber-200 bg-[#fff8ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a4b24]">
                {authStatusLabel}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-white px-4 py-2 text-sm font-semibold text-[#7a4b24] transition hover:bg-[#fff4e4]"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          </div>
          {error ? (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}
        </header>

        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-[2rem] border border-amber-300/35 bg-white/70">
            <LoaderCircle className="h-8 w-8 animate-spin text-[#9a5a1a]" />
          </div>
        ) : (
          <>
            <Section title="Branding">
              <SingleImageEditor
                label="Logo"
                image={images.business.logo}
                defaultImage={defaultImagesState.business.logo}
                onReset={async () => {
                  const nextImage = await restoreDefaultImage(defaultImagesState.business.logo);
                  await save({
                    ...images,
                    business: {
                      logo: nextImage,
                    },
                  });
                }}
                onReplace={async (file) => {
                  const nextImage = await uploadAndGetImage(file);
                  await save({
                    ...images,
                    business: {
                      logo: nextImage,
                    },
                  });
                }}
              />
            </Section>

            <Section
              title="Homepage"
              description="These images power the top showcase and the artist section."
            >
              <div className="space-y-4">
                <ImageListEditor
                  title="Hero Showcase Images"
                  images={images.hero.showcaseImages}
                  defaultImages={defaultImagesState.hero.showcaseImages}
                  onAdd={async (file) => {
                    const uploaded = await uploadAndGetImage(file);
                    await save({
                      ...images,
                      hero: {
                        showcaseImages: [...images.hero.showcaseImages, uploaded],
                      },
                    });
                  }}
                  onResetAt={async (index) => {
                    const uploaded = await restoreDefaultImage(
                      defaultImagesState.hero.showcaseImages[index]
                    );
                    const next = [...images.hero.showcaseImages];
                    next[index] = uploaded;
                    await save({
                      ...images,
                      hero: { showcaseImages: next },
                    });
                  }}
                  onReplaceAt={async (index, file) => {
                    const uploaded = await uploadAndGetImage(file);
                    const next = [...images.hero.showcaseImages];
                    next[index] = uploaded;
                    await save({
                      ...images,
                      hero: { showcaseImages: next },
                    });
                  }}
                  onMove={async (from, to) => {
                    const next = [...images.hero.showcaseImages];
                    const [moved] = next.splice(from, 1);
                    next.splice(to, 0, moved);
                    await save({
                      ...images,
                      hero: { showcaseImages: next },
                    });
                  }}
                />

                <ImageListEditor
                  title="About Section Artist Images"
                  images={images.aboutSection.artistImages}
                  defaultImages={defaultImagesState.aboutSection.artistImages}
                  onAdd={async (file) => {
                    const uploaded = await uploadAndGetImage(file);
                    await save({
                      ...images,
                      aboutSection: {
                        artistImages: [...images.aboutSection.artistImages, uploaded],
                      },
                    });
                  }}
                  onResetAt={async (index) => {
                    const uploaded = await restoreDefaultImage(
                      defaultImagesState.aboutSection.artistImages[index]
                    );
                    const next = [...images.aboutSection.artistImages];
                    next[index] = uploaded;
                    await save({
                      ...images,
                      aboutSection: { artistImages: next },
                    });
                  }}
                  onReplaceAt={async (index, file) => {
                    const uploaded = await uploadAndGetImage(file);
                    const next = [...images.aboutSection.artistImages];
                    next[index] = uploaded;
                    await save({
                      ...images,
                      aboutSection: { artistImages: next },
                    });
                  }}
                  onMove={async (from, to) => {
                    const next = [...images.aboutSection.artistImages];
                    const [moved] = next.splice(from, 1);
                    next.splice(to, 0, moved);
                    await save({
                      ...images,
                      aboutSection: { artistImages: next },
                    });
                  }}
                />
              </div>
            </Section>

            <Section title="Social Icons">
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                <SingleImageEditor
                  label="Instagram Icon"
                  image={images.socialSection.instagramIcon}
                  defaultImage={defaultImagesState.socialSection.instagramIcon}
                  onReset={async () => {
                    const uploaded = await restoreDefaultImage(
                      defaultImagesState.socialSection.instagramIcon
                    );
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        instagramIcon: uploaded,
                      },
                    });
                  }}
                  onReplace={async (file) => {
                    const uploaded = await uploadAndGetImage(file);
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        instagramIcon: uploaded,
                      },
                    });
                  }}
                />
                <SingleImageEditor
                  label="Facebook Icon"
                  image={images.socialSection.facebookIcon}
                  defaultImage={defaultImagesState.socialSection.facebookIcon}
                  onReset={async () => {
                    const uploaded = await restoreDefaultImage(
                      defaultImagesState.socialSection.facebookIcon
                    );
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        facebookIcon: uploaded,
                      },
                    });
                  }}
                  onReplace={async (file) => {
                    const uploaded = await uploadAndGetImage(file);
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        facebookIcon: uploaded,
                      },
                    });
                  }}
                />
                <SingleImageEditor
                  label="WhatsApp Icon"
                  image={images.socialSection.whatsappIcon}
                  defaultImage={defaultImagesState.socialSection.whatsappIcon}
                  onReset={async () => {
                    const uploaded = await restoreDefaultImage(
                      defaultImagesState.socialSection.whatsappIcon
                    );
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        whatsappIcon: uploaded,
                      },
                    });
                  }}
                  onReplace={async (file) => {
                    const uploaded = await uploadAndGetImage(file);
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        whatsappIcon: uploaded,
                      },
                    });
                  }}
                />
                <SingleImageEditor
                  label="Google Icon"
                  image={images.socialSection.googleIcon}
                  defaultImage={defaultImagesState.socialSection.googleIcon}
                  onReset={async () => {
                    const uploaded = await restoreDefaultImage(
                      defaultImagesState.socialSection.googleIcon
                    );
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        googleIcon: uploaded,
                      },
                    });
                  }}
                  onReplace={async (file) => {
                    const uploaded = await uploadAndGetImage(file);
                    await save({
                      ...images,
                      socialSection: {
                        ...images.socialSection,
                        googleIcon: uploaded,
                      },
                    });
                  }}
                />
              </div>
            </Section>

            <Section
              title="Services and Galleries"
              description="Each service has three main images plus a reorderable gallery."
            >
              <div className="space-y-5">
                {serviceEntries.map((entry) => (
                  <ServiceEditor
                    key={entry.key}
                    label={entry.label}
                    service={images.services[entry.key]}
                    defaultService={defaultImagesState.services[entry.key]}
                    onResetSingle={async (field) => {
                      const uploaded = await restoreDefaultImage(
                        defaultImagesState.services[entry.key][field]
                      );
                      await save({
                        ...images,
                        services: {
                          ...images.services,
                          [entry.key]: {
                            ...images.services[entry.key],
                            [field]: uploaded,
                          },
                        },
                      });
                    }}
                    onReplaceSingle={async (field, file) => {
                      const uploaded = await uploadAndGetImage(file);
                      await save({
                        ...images,
                        services: {
                          ...images.services,
                          [entry.key]: {
                            ...images.services[entry.key],
                            [field]: uploaded,
                          },
                        },
                      });
                    }}
                    onAddGalleryImage={async (file) => {
                      const uploaded = await uploadAndGetImage(file);
                      await save({
                        ...images,
                        services: {
                          ...images.services,
                          [entry.key]: {
                            ...images.services[entry.key],
                            galleryImages: [
                              ...images.services[entry.key].galleryImages,
                              uploaded,
                            ],
                          },
                        },
                      });
                    }}
                    onResetGalleryImage={async (index) => {
                      const uploaded = await restoreDefaultImage(
                        defaultImagesState.services[entry.key].galleryImages[index]
                      );
                      const next = [...images.services[entry.key].galleryImages];
                      next[index] = uploaded;
                      await save({
                        ...images,
                        services: {
                          ...images.services,
                          [entry.key]: {
                            ...images.services[entry.key],
                            galleryImages: next,
                          },
                        },
                      });
                    }}
                    onReplaceGalleryImage={async (index, file) => {
                      const uploaded = await uploadAndGetImage(file);
                      const next = [...images.services[entry.key].galleryImages];
                      next[index] = uploaded;
                      await save({
                        ...images,
                        services: {
                          ...images.services,
                          [entry.key]: {
                            ...images.services[entry.key],
                            galleryImages: next,
                          },
                        },
                      });
                    }}
                    onMoveGalleryImage={async (from, to) => {
                      const next = [...images.services[entry.key].galleryImages];
                      const [moved] = next.splice(from, 1);
                      next.splice(to, 0, moved);
                      await save({
                        ...images,
                        services: {
                          ...images.services,
                          [entry.key]: {
                            ...images.services[entry.key],
                            galleryImages: next,
                          },
                        },
                      });
                    }}
                  />
                ))}
              </div>
            </Section>

            <Section title="Testimonials">
              <ImageListEditor
                title="Testimonial Images"
                images={images.testimonials}
                defaultImages={defaultImagesState.testimonials}
                onAdd={async (file) => {
                  const uploaded = await uploadAndGetImage(file);
                  await save({
                    ...images,
                    testimonials: [...images.testimonials, uploaded],
                  });
                }}
                onResetAt={async (index) => {
                  const uploaded = await restoreDefaultImage(
                    defaultImagesState.testimonials[index]
                  );
                  const next = [...images.testimonials];
                  next[index] = uploaded;
                  await save({
                    ...images,
                    testimonials: next,
                  });
                }}
                onReplaceAt={async (index, file) => {
                  const uploaded = await uploadAndGetImage(file);
                  const next = [...images.testimonials];
                  next[index] = uploaded;
                  await save({
                    ...images,
                    testimonials: next,
                  });
                }}
                onMove={async (from, to) => {
                  const next = [...images.testimonials];
                  const [moved] = next.splice(from, 1);
                  next.splice(to, 0, moved);
                  await save({
                    ...images,
                    testimonials: next,
                  });
                }}
              />
            </Section>
          </>
        )}
      </div>
    </main>
  );
}
