"use client";

import { useParams } from "next/navigation";

import { defaultWorkspace } from "@/lib/mock-data";

/** 현재 URL의 워크스페이스 슬러그 (없으면 기본 워크스페이스) */
export function useWorkspaceSlug(): string {
  const params = useParams<{ workspace?: string }>();
  return params?.workspace ?? defaultWorkspace.slug;
}
