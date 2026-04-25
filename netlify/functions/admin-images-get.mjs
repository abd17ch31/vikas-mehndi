import { imageQuery, json, readClient, requireSession } from "./admin-utils.mjs";

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed." });
  }

  if (!requireSession(event.headers)) {
    return json(401, { error: "Unauthorized." });
  }

  const content = await readClient.fetch(imageQuery);
  return json(200, content || {});
}
