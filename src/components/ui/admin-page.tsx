import {
  useEffect,
  useMemo,
  useRef,
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
  UploadCloud,
} from "lucide-react";

import {
  clearAdminSession,
  fetchAdminImages,
  getAdminSession,
  loginAdmin,
  saveAdminImages,
  uploadAdminImage,
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

type MainTab = "home" | "gallery" | "services";
type ServiceKey = keyof AdminImagesState["services"];
type ServiceSingleField = keyof Omit<AdminServiceImages, "galleryImages">;

const mainTabs: Array<{ key: MainTab; label: string }> = [
  { key: "home", label: "Home" },
  { key: "gallery", label: "Gallery" },
  { key: "services", label: "Services" },
];

const getService = (state: AdminImagesState, key: ServiceKey) =>
  state.services[key] ?? emptyState.services[key];

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
    <section className="rounded-lg border border-amber-300/35 bg-white/85 p-4 shadow-[0_12px_30px_rgba(90,42,23,0.08)] sm:p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[#5a2a17]">{title}</h2>
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
  const [isDragging, setIsDragging] = useState(false);

  const replaceFile = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      await onReplace(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await replaceFile(event.target.files?.[0]);
    } finally {
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
    <div className="rounded-lg border border-amber-200/70 bg-[#fffaf0] p-3">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="min-w-0 text-sm font-semibold text-[#6b351d]">
          {label}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            disabled={!defaultImage || isResetting}
            onClick={() => void handleReset()}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#fff3dd] text-[#7a4b24] transition hover:bg-[#ffe7b9] disabled:opacity-40"
            aria-label={`Reset ${label} to default`}
            title="Reset to default"
          >
            {isResetting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
          </button>
          <label
            className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md bg-amber-400 px-3 text-xs font-semibold text-[#2a120d] transition hover:bg-amber-300"
            title="Choose replacement image"
          >
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
        className={`flex items-center gap-3 rounded-lg border border-dashed bg-white p-2 transition ${
          isDragging ? "border-emerald-500 ring-2 ring-emerald-100" : "border-amber-200/80"
        }`}
      >
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-md border border-amber-100 bg-[#fff8ee]">
          {image ? (
            <img
              src={image.url}
              alt={label}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-[#8a654e]">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 text-xs leading-5 text-[#7a5842]">
          <UploadCloud className="mb-1 h-4 w-4 text-[#9a5a1a]" />
          <p className="font-medium text-[#5a2a17]">Drop image here</p>
          <p className="truncate">{image?.url ?? "No image uploaded yet"}</p>
        </div>
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
  const [dragIndex, setDragIndex] = useState<number | "add" | null>(null);

  const addFile = async (file?: File) => {
    if (!file) return;
    setBusyKey("add");
    try {
      await onAdd(file);
    } finally {
      setBusyKey(null);
    }
  };

  const replaceFile = async (index: number, file?: File) => {
    if (!file) return;
    setBusyKey(`replace-${index}`);
    try {
      await onReplaceAt(index, file);
    } finally {
      setBusyKey(null);
    }
  };

  const handleAdd = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await addFile(event.target.files?.[0]);
    } finally {
      event.target.value = "";
    }
  };

  const handleReplace =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        await replaceFile(index, event.target.files?.[0]);
      } finally {
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
    <div className="rounded-lg border border-amber-200/70 bg-[#fffaf0] p-3">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#6b351d]">
          {title}
        </p>
        <label
          className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md bg-amber-400 px-3 text-xs font-semibold text-[#2a120d] transition hover:bg-amber-300"
          title="Add image"
        >
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
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            setDragIndex("add");
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragIndex(null)}
          onDrop={(event) => {
            event.preventDefault();
            setDragIndex(null);
            void addFile(event.dataTransfer.files?.[0]);
          }}
          className={`rounded-lg border border-dashed px-4 py-10 text-center text-sm text-[#8a654e] ${
            dragIndex === "add" ? "border-emerald-500 bg-emerald-50" : "border-amber-300/70"
          }`}
        >
          No images yet. Use "Add Image" to create the list.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={`${image.assetId}-${index}`}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragIndex(index);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragIndex(null)}
              onDrop={(event) => {
                event.preventDefault();
                setDragIndex(null);
                void replaceFile(index, event.dataTransfer.files?.[0]);
              }}
              className={`rounded-lg border bg-white p-2 transition ${
                dragIndex === index
                  ? "border-emerald-500 ring-2 ring-emerald-100"
                  : "border-amber-200/70"
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={image.url}
                  alt={`${title} ${index + 1}`}
                  className="h-28 w-28 shrink-0 rounded-md object-cover"
                  loading="lazy"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                  <span className="text-xs font-semibold text-[#8a654e]">
                  #{index + 1}
                </span>
                  <p className="truncate text-xs text-[#7a5842]">{image.url}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => void onMove(index, index - 1)}
                    className="rounded-md border border-amber-200 bg-white p-1.5 text-[#7a4b24] disabled:opacity-40"
                    aria-label={`Move ${title} ${index + 1} up`}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === images.length - 1}
                    onClick={() => void onMove(index, index + 1)}
                    className="rounded-md border border-amber-200 bg-white p-1.5 text-[#7a4b24] disabled:opacity-40"
                    aria-label={`Move ${title} ${index + 1} down`}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={!defaultImages[index] || busyKey === `reset-${index}`}
                    onClick={() => void handleReset(index)}
                    className="rounded-md bg-[#fff3dd] p-1.5 text-[#7a4b24] transition hover:bg-[#ffe7b9] disabled:opacity-40"
                    aria-label={`Reset ${title} ${index + 1} to default`}
                    title="Reset to default"
                  >
                    {busyKey === `reset-${index}` ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                  </button>
                  <label
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-[#fff3dd] px-2 py-1.5 text-xs font-semibold text-[#7a4b24] transition hover:bg-[#ffe7b9]"
                    title="Replace image"
                  >
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
}) {
  return (
    <div className="space-y-4 rounded-lg border border-amber-200/70 bg-[#fff8ee] p-4">
      <h3 className="text-lg font-semibold text-[#5a2a17]">{label}</h3>
      <div className="grid gap-4 lg:grid-cols-2">
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
      </div>
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
  const [activeTab, setActiveTab] = useState<MainTab>("home");
  const [activeGallery, setActiveGallery] = useState<ServiceKey>("bridal");
  const imagesRef = useRef(images);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

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
        const nextImages = {
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
        };
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
    if (!token) return;

    const nextState = updater(imagesRef.current);
    imagesRef.current = nextState;
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
    imagesRef.current = emptyState;
    setImages(emptyState);
  };

  const moveImage = (list: AdminImage[], from: number, to: number) => {
    const next = [...list];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
  };

  const updateHeroImages = async (
    updater: (currentImages: AdminImage[]) => AdminImage[]
  ) => {
    await commitImages((current) => ({
      ...current,
      hero: { showcaseImages: updater(current.hero.showcaseImages) },
    }));
  };

  const updateArtistImages = async (
    updater: (currentImages: AdminImage[]) => AdminImage[]
  ) => {
    await commitImages((current) => ({
      ...current,
      aboutSection: { artistImages: updater(current.aboutSection.artistImages) },
    }));
  };

  const updateTestimonials = async (
    updater: (currentImages: AdminImage[]) => AdminImage[]
  ) => {
    await commitImages((current) => ({
      ...current,
      testimonials: updater(current.testimonials),
    }));
  };

  const resetServiceSingle = async (
    serviceKey: ServiceKey,
    field: ServiceSingleField
  ) => {
    const defaultImage = defaultImagesState.services[serviceKey][field];
    if (!defaultImage) return;

    await commitImages((current) => ({
      ...current,
      services: {
        ...current.services,
        [serviceKey]: {
          ...getService(current, serviceKey),
          [field]: defaultImage,
        },
      },
    }));
  };

  const replaceServiceSingle = async (
    serviceKey: ServiceKey,
    field: ServiceSingleField,
    file: File
  ) => {
    const uploaded = await uploadAndGetImage(file);
    await commitImages((current) => ({
      ...current,
      services: {
        ...current.services,
        [serviceKey]: {
          ...getService(current, serviceKey),
          [field]: uploaded,
        },
      },
    }));
  };

  const updateServiceGallery = async (
    serviceKey: ServiceKey,
    updater: (currentImages: AdminImage[]) => AdminImage[]
  ) => {
    await commitImages((current) => ({
      ...current,
      services: {
        ...current.services,
        [serviceKey]: {
          ...getService(current, serviceKey),
          galleryImages: updater(getService(current, serviceKey).galleryImages),
        },
      },
    }));
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
          <div className="space-y-5">
            <nav className="rounded-lg border border-amber-300/35 bg-white/85 p-2 shadow-[0_12px_30px_rgba(90,42,23,0.08)]">
              <div className="grid gap-2 sm:grid-cols-3">
                {mainTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`h-11 rounded-md px-4 text-sm font-semibold transition ${
                      activeTab === tab.key
                        ? "bg-[#5a2a17] text-white shadow-sm"
                        : "bg-[#fff8ee] text-[#7a4b24] hover:bg-[#ffe7b9]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>

            {activeTab === "home" ? (
              <div className="space-y-5">
                <Section title="Home Images">
                  <div className="space-y-4">
                    <SingleImageEditor
                      label="Logo"
                      image={images.business.logo}
                      defaultImage={defaultImagesState.business.logo}
                      onReset={async () => {
                        const defaultImage = defaultImagesState.business.logo;
                        if (!defaultImage) return;
                        await commitImages((current) => ({
                          ...current,
                          business: { logo: defaultImage },
                        }));
                      }}
                      onReplace={async (file) => {
                        const uploaded = await uploadAndGetImage(file);
                        await commitImages((current) => ({
                          ...current,
                          business: { logo: uploaded },
                        }));
                      }}
                    />

                    <ImageListEditor
                      title="Hero Showcase Images"
                      images={images.hero.showcaseImages}
                      defaultImages={defaultImagesState.hero.showcaseImages}
                      onAdd={async (file) => {
                        const uploaded = await uploadAndGetImage(file);
                        await updateHeroImages((current) => [...current, uploaded]);
                      }}
                      onResetAt={async (index) => {
                        const defaultImage = defaultImagesState.hero.showcaseImages[index];
                        if (!defaultImage) return;
                        await updateHeroImages((current) => {
                          const next = [...current];
                          next[index] = defaultImage;
                          return next;
                        });
                      }}
                      onReplaceAt={async (index, file) => {
                        const uploaded = await uploadAndGetImage(file);
                        await updateHeroImages((current) => {
                          const next = [...current];
                          next[index] = uploaded;
                          return next;
                        });
                      }}
                      onMove={async (from, to) => {
                        await updateHeroImages((current) => moveImage(current, from, to));
                      }}
                    />

                    <ImageListEditor
                      title="About Section Artist Images"
                      images={images.aboutSection.artistImages}
                      defaultImages={defaultImagesState.aboutSection.artistImages}
                      onAdd={async (file) => {
                        const uploaded = await uploadAndGetImage(file);
                        await updateArtistImages((current) => [...current, uploaded]);
                      }}
                      onResetAt={async (index) => {
                        const defaultImage =
                          defaultImagesState.aboutSection.artistImages[index];
                        if (!defaultImage) return;
                        await updateArtistImages((current) => {
                          const next = [...current];
                          next[index] = defaultImage;
                          return next;
                        });
                      }}
                      onReplaceAt={async (index, file) => {
                        const uploaded = await uploadAndGetImage(file);
                        await updateArtistImages((current) => {
                          const next = [...current];
                          next[index] = uploaded;
                          return next;
                        });
                      }}
                      onMove={async (from, to) => {
                        await updateArtistImages((current) => moveImage(current, from, to));
                      }}
                    />
                  </div>
                </Section>

                <Section title="Social Icons">
                  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["instagramIcon", "Instagram Icon"],
                      ["facebookIcon", "Facebook Icon"],
                      ["whatsappIcon", "WhatsApp Icon"],
                      ["googleIcon", "Google Icon"],
                    ].map(([field, label]) => (
                      <SingleImageEditor
                        key={field}
                        label={label}
                        image={
                          images.socialSection[
                            field as keyof AdminImagesState["socialSection"]
                          ]
                        }
                        defaultImage={
                          defaultImagesState.socialSection[
                            field as keyof AdminImagesState["socialSection"]
                          ]
                        }
                        onReset={async () => {
                          const defaultImage =
                            defaultImagesState.socialSection[
                              field as keyof AdminImagesState["socialSection"]
                            ];
                          if (!defaultImage) return;
                          await commitImages((current) => ({
                            ...current,
                            socialSection: {
                              ...current.socialSection,
                              [field]: defaultImage,
                            },
                          }));
                        }}
                        onReplace={async (file) => {
                          const uploaded = await uploadAndGetImage(file);
                          await commitImages((current) => ({
                            ...current,
                            socialSection: {
                              ...current.socialSection,
                              [field]: uploaded,
                            },
                          }));
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
                      await updateTestimonials((current) => [...current, uploaded]);
                    }}
                    onResetAt={async (index) => {
                      const defaultImage = defaultImagesState.testimonials[index];
                      if (!defaultImage) return;
                      await updateTestimonials((current) => {
                        const next = [...current];
                        next[index] = defaultImage;
                        return next;
                      });
                    }}
                    onReplaceAt={async (index, file) => {
                      const uploaded = await uploadAndGetImage(file);
                      await updateTestimonials((current) => {
                        const next = [...current];
                        next[index] = uploaded;
                        return next;
                      });
                    }}
                    onMove={async (from, to) => {
                      await updateTestimonials((current) => moveImage(current, from, to));
                    }}
                  />
                </Section>
              </div>
            ) : null}

            {activeTab === "gallery" ? (
              <Section
                title="Gallery"
                description="Choose a gallery, then manage its cover and individual images in one compact panel."
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {serviceEntries.map((entry) => (
                    <button
                      key={entry.key}
                      type="button"
                      onClick={() => setActiveGallery(entry.key)}
                      className={`h-9 rounded-md px-3 text-xs font-semibold transition ${
                        activeGallery === entry.key
                          ? "bg-[#5a2a17] text-white"
                          : "bg-[#fff3dd] text-[#7a4b24] hover:bg-[#ffe7b9]"
                      }`}
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <SingleImageEditor
                    label={`${serviceEntries.find((entry) => entry.key === activeGallery)?.label} Cover Image`}
                    image={images.services[activeGallery].galleryCover}
                    defaultImage={defaultImagesState.services[activeGallery].galleryCover}
                    onReset={() => resetServiceSingle(activeGallery, "galleryCover")}
                    onReplace={(file) =>
                      replaceServiceSingle(activeGallery, "galleryCover", file)
                    }
                  />
                  <ImageListEditor
                    title={`${serviceEntries.find((entry) => entry.key === activeGallery)?.label} Gallery Images`}
                    images={images.services[activeGallery].galleryImages}
                    defaultImages={defaultImagesState.services[activeGallery].galleryImages}
                    onAdd={async (file) => {
                      const uploaded = await uploadAndGetImage(file);
                      await updateServiceGallery(activeGallery, (current) => [
                        ...current,
                        uploaded,
                      ]);
                    }}
                    onResetAt={async (index) => {
                      const defaultImage =
                        defaultImagesState.services[activeGallery].galleryImages[index];
                      if (!defaultImage) return;
                      await updateServiceGallery(activeGallery, (current) => {
                        const next = [...current];
                        next[index] = defaultImage;
                        return next;
                      });
                    }}
                    onReplaceAt={async (index, file) => {
                      const uploaded = await uploadAndGetImage(file);
                      await updateServiceGallery(activeGallery, (current) => {
                        const next = [...current];
                        next[index] = uploaded;
                        return next;
                      });
                    }}
                    onMove={async (from, to) => {
                      await updateServiceGallery(activeGallery, (current) =>
                        moveImage(current, from, to)
                      );
                    }}
                  />
                </div>
              </Section>
            ) : null}

            {activeTab === "services" ? (
              <Section
                title="Services"
                description="Manage each service category thumbnail and carousel image."
              >
                <div className="grid gap-4 xl:grid-cols-2">
                  {serviceEntries.map((entry) => (
                    <ServiceEditor
                      key={entry.key}
                      label={entry.label}
                      service={images.services[entry.key]}
                      defaultService={defaultImagesState.services[entry.key]}
                      onResetSingle={(field) => resetServiceSingle(entry.key, field)}
                      onReplaceSingle={(field, file) =>
                        replaceServiceSingle(entry.key, field, file)
                      }
                    />
                  ))}
                </div>
              </Section>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
