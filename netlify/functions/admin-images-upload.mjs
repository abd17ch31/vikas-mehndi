import { json, requireSession, writeClient } from "./admin-utils.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  if (!requireSession(event.headers)) {
    return json(401, { error: "Unauthorized." });
  }

  const { base64, contentType, filename, sourceUrl } = JSON.parse(event.body || "{}");

  if (!contentType || (!base64 && !sourceUrl)) {
    return json(400, { error: "Missing image payload." });
  }

  let buffer;

  if (base64) {
    buffer = Buffer.from(base64, "base64");
  } else {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      return json(400, { error: "Failed to fetch default image." });
    }

    buffer = Buffer.from(await response.arrayBuffer());
  }

  const asset = await writeClient.assets.upload("image", buffer, {
    contentType,
    filename: filename || `upload-${Date.now()}`,
  });

  return json(200, {
    assetId: asset._id,
    url: asset.url,
  });
}
