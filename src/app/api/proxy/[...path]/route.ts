import { NextRequest, NextResponse } from "next/server";

import { BASE_URL } from "@/shared/config/env";
import { createClient } from "@/shared/lib/supabase/server";

/**
 * 백엔드(NestJS) 프록시. 클라이언트는 `/api/proxy/*`로 호출하고,
 * 여기서 Supabase 세션 토큰을 주입해 실 백엔드로 포워딩한다.
 * 네트워크 탭에 실 백엔드 URL/토큰이 노출되지 않는다.
 */
async function handle(
  request: NextRequest,
  params: { path: string[] },
  method: string,
) {
  const path = `/${params.path.join("/")}`;
  const qs = request.nextUrl.searchParams.toString();
  const url = qs ? `${BASE_URL}${path}?${qs}` : `${BASE_URL}${path}`;

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const hasBody = method !== "GET" && method !== "DELETE";
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: hasBody ? await request.text() : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  return handle(req, await params, "GET");
}
export async function POST(req: NextRequest, { params }: Ctx) {
  return handle(req, await params, "POST");
}
export async function PUT(req: NextRequest, { params }: Ctx) {
  return handle(req, await params, "PUT");
}
export async function PATCH(req: NextRequest, { params }: Ctx) {
  return handle(req, await params, "PATCH");
}
export async function DELETE(req: NextRequest, { params }: Ctx) {
  return handle(req, await params, "DELETE");
}
