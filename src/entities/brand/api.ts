import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";
import { USE_MOCK } from "@/shared/config/env";

import { brands } from "./model";

// 백엔드 응답 DTO (GET /api/workspaces/:id/brands, GET /api/brands/:id).
// 프론트 mock 모델(roomReady/contentCount)과 필드가 달라 직접 매핑하지 않고 API 형태로 노출.
export type ApiBrand = {
  id: string;
  workspaceId: string;
  name: string;
  color: string;
  initial: string;
  voiceSummary: string;
  toneProfile: string | null;
  createdAt: string;
};

function toApiBrand(workspaceId: string, b: (typeof brands)[number]): ApiBrand {
  return {
    id: b.id,
    workspaceId,
    name: b.name,
    color: b.color,
    initial: b.initial,
    voiceSummary: b.voiceProfile,
    toneProfile: null,
    createdAt: "2026-01-01T00:00:00.000Z",
  };
}

/** GET /api/workspaces/:workspaceId/brands */
export async function listBrands(workspaceId: string): Promise<ApiBrand[]> {
  if (USE_MOCK) return brands.map((b) => toApiBrand(workspaceId, b));
  return apiClient<ApiBrand[]>(`/workspaces/${workspaceId}/brands`);
}

/** GET /api/brands/:id (model.getBrand와 구분해 fetchBrand) */
export async function fetchBrand(id: string): Promise<ApiBrand> {
  if (USE_MOCK) {
    const b = brands.find((x) => x.id === id);
    if (!b) throw new Error(`brand ${id} 없음`);
    return toApiBrand("ws_jigeum", b);
  }
  return apiClient<ApiBrand>(`/brands/${id}`);
}

export function useBrands(workspaceId: string) {
  return useQuery({
    queryKey: ["brands", workspaceId],
    queryFn: () => listBrands(workspaceId),
    enabled: !!workspaceId,
  });
}

export function useBrand(id: string) {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => fetchBrand(id),
    enabled: !!id,
  });
}
