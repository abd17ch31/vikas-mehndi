import { createSessionToken, json, verifyPassword } from "./admin-utils.mjs";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed." });
    }

    const { password } = JSON.parse(event.body || "{}");

    if (!verifyPassword(password)) {
      return json(401, { error: "Invalid password." });
    }

    return json(200, { token: createSessionToken() });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : "Admin login failed.",
    });
  }
}
