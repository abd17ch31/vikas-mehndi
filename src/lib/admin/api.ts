import type { AdminImage, AdminImagesState } from "@/lib/admin/types";

const ADMIN_SESSION_KEY = "image-admin-session";

const api = async <T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> => {
  const response = await fetch(`/.netlify/functions/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const fallback = `Request failed (${response.status}).`;
    const error = await response
      .clone()
      .json()
      .catch(async () => ({ error: await response.text().catch(() => fallback) }));
    throw new Error(error.error || fallback);
  }

  return response.json() as Promise<T>;
};

export const saveAdminSession = (token: string) => {
  localStorage.setItem(ADMIN_SESSION_KEY, token);
};

export const getAdminSession = () => localStorage.getItem(ADMIN_SESSION_KEY);

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const loginAdmin = async (password: string) => {
  const result = await api<{ token: string }>("admin-auth", {
    method: "POST",
    body: JSON.stringify({ password }),
  });

  saveAdminSession(result.token);
  return result.token;
};

export const fetchAdminImages = (token: string) =>
  api<AdminImagesState>("admin-images-get", { method: "GET" }, token);

export const saveAdminImages = (token: string, payload: AdminImagesState) =>
  api<{ ok: boolean }>(
    "admin-images-save",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Failed to read file."));
        return;
      }

      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });

export const uploadAdminImage = async (token: string, file: File) => {
  const base64 = await fileToBase64(file);
  return api<AdminImage>(
    "admin-images-upload",
    {
      method: "POST",
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        base64,
      }),
    },
    token
  );
};

export const uploadAdminImageFromUrl = async (
  token: string,
  sourceUrl: string,
  filename: string,
  contentType = "image/jpeg"
) =>
  api<AdminImage>(
    "admin-images-upload",
    {
      method: "POST",
      body: JSON.stringify({
        sourceUrl,
        filename,
        contentType,
      }),
    },
    token
  );
