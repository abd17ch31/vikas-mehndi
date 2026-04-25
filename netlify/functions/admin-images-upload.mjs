import { json, requireSession, writeClient } from "./admin-utils.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  if (!requireSession(event.headers)) {
    return json(401, { error: "Unauthorized." });
  }

  const { base64, contentType, filename } = JSON.parse(event.body || "{}");

  if (!base64 || !contentType) {
    return json(400, { error: "Missing image payload." });
  }

  const buffer = Buffer.from(base64, "base64");
  const asset = await writeClient.assets.upload("image", buffer, {
    contentType,
    filename: filename || `upload-${Date.now()}`,
  });

  return json(200, {
    assetId: asset._id,
    url: asset.url,
  });
}
