import { SignJWT } from "jose";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

async function getAdminToken(): Promise<string> {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET env var is required");

  const key = new TextEncoder().encode(secret);

  return new SignJWT({
    userId: "system-admin",
    organizationId: "system",
    email: process.env.ADMIN_USER || "admin@rtnzero.ai",
    platformRole: "SUPER_ADMIN",
    isAdmin: true,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(key);
}

export async function backendFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const token = await getAdminToken();
  return fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
}
