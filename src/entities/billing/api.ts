import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";
import { USE_MOCK } from "@/shared/config/env";
import type { components } from "@/shared/api/types";

import { currentUsage, type UsageType } from "./model";

// 백엔드 응답 DTO (GET /api/workspaces/:id/usage). 핸드오프 문서 기준.
export type ApiUsage = {
  workspaceId: string;
  cycleStart: string;
  cycleEnd: string;
  creditsUsed: number;
  byType: Record<UsageType, number>;
  byBrand: { brandId: string; credits: number }[];
};

// POST 바디는 OpenAPI에서 생성된 타입을 그대로 사용 (서버가 크레딧 단가 결정 — 보내지 않음)
export type RecordUsageBody = components["schemas"]["RecordUsageDto"];

export type UsageEvent = {
  id: string;
  workspaceId: string;
  type: UsageType;
  brandId?: string;
  credits: number;
  createdAt: string;
};

/** GET /api/workspaces/:workspaceId/usage — 이번 주기 크레딧 사용량 */
export async function getUsage(workspaceId: string): Promise<ApiUsage> {
  if (USE_MOCK) {
    const { planId: _planId, ...usage } = currentUsage;
    void _planId;
    return usage;
  }
  return apiClient<ApiUsage>(`/workspaces/${workspaceId}/usage`);
}

/** POST /api/workspaces/:workspaceId/usage/events — 과금 액션 기록 */
export async function recordUsage(
  workspaceId: string,
  body: RecordUsageBody,
): Promise<UsageEvent> {
  if (USE_MOCK) {
    return {
      id: "evt_mock",
      workspaceId,
      type: body.type,
      brandId: body.brandId,
      credits: 0,
      createdAt: "2026-01-01T00:00:00.000Z",
    };
  }
  return apiClient<UsageEvent>(`/workspaces/${workspaceId}/usage/events`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useUsage(workspaceId: string) {
  return useQuery({
    queryKey: ["usage", workspaceId],
    queryFn: () => getUsage(workspaceId),
    enabled: !!workspaceId,
  });
}

export function useRecordUsage(workspaceId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: RecordUsageBody) => recordUsage(workspaceId, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["usage", workspaceId] }),
  });
}
