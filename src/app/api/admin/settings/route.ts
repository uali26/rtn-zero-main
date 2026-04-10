import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

function parseEnvFile(content: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    map.set(key, val);
  }
  return map;
}

function setEnvValue(content: string, key: string, value: string): string {
  const regex = new RegExp(`^(${key}\\s*=\\s*).*$`, "m");
  const quoted = `"${value}"`;
  if (regex.test(content)) {
    return content.replace(regex, `$1${quoted}`);
  }
  return content + `\n${key}=${quoted}\n`;
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const envPath = join(process.cwd(), ".env.local");
  let envContent = await readFile(envPath, "utf-8");
  const envMap = parseEnvFile(envContent);

  // Update email
  if (body.email && typeof body.email === "string") {
    envContent = setEnvValue(envContent, "ADMIN_USER", body.email);
    await writeFile(envPath, envContent, "utf-8");
    return NextResponse.json({ message: "Email updated. Restart the server or sign in again." });
  }

  // Update password
  if (body.newPassword && typeof body.newPassword === "string") {
    const currentPassword = envMap.get("ADMIN_PASSWORD") || "";
    if (body.currentPassword !== currentPassword) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
    }
    envContent = setEnvValue(envContent, "ADMIN_PASSWORD", body.newPassword);
    await writeFile(envPath, envContent, "utf-8");
    return NextResponse.json({ message: "Password updated." });
  }

  return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
}
