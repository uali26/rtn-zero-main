import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { backendFetch } from "@/lib/backend";

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const { path } = await params;
  const res = await backendFetch(`/api/v1/leads/${path.join("/")}`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const { path } = await params;
  const body = await req.json();
  const res = await backendFetch(`/api/v1/leads/${path.join("/")}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const { path } = await params;
  const body = await req.json();
  const res = await backendFetch(`/api/v1/leads/${path.join("/")}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const { path } = await params;
  const res = await backendFetch(`/api/v1/leads/${path.join("/")}`, {
    method: "DELETE",
  });

  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
