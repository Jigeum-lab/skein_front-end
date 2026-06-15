import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";
import { USE_MOCK } from "@/shared/config/env";

import { workspaces } from "./model";

// 백엔드 응답 DTO (GET /api/workspaces). Swagger에 응답 스키마가 없어 핸드오프 문서 기준 수동 정의.
// ⚠️ 백엔드 Workspace에는 slug가 없음 — 프론트 라우팅(/[workspace])은 slug 기반이라 추후 백엔드 추가 필요.
export type ApiWorkspace = {
  id: string;
  name: string;
  plan: string;
  ownerId: string;
  role: string;
  createdAt: string;
};

export type Me = { id: string; email?: string };

/** GET /api/me — 현재 로그인 유저 (mock 모드에선 호출 안 함) */
export async function getMe(): Promise<Me> {
  return apiClient<Me>("/me");
}

/** GET /api/workspaces — 내 워크스페이스 목록 (데이터 없으면 []) */
export async function listWorkspaces(): Promise<ApiWorkspace[]> {
  if (USE_MOCK) {
    return workspaces.map((w) => ({
      id: w.id,
      name: w.name,
      plan: w.plan,
      ownerId: "me",
      role: "owner",
      createdAt: "2026-01-01T00:00:00.000Z",
    }));
  }
  return apiClient<ApiWorkspace[]>("/workspaces");
}

export function useMe() {
  return useQuery({ queryKey: ["me"], queryFn: getMe, enabled: !USE_MOCK });
}

export function useWorkspaces() {
  return useQuery({ queryKey: ["workspaces"], queryFn: listWorkspaces });
}
