"use client";

import { useParams } from "next/navigation";

// 기본 워크스페이스 슬러그 — shared는 entities에 의존하지 않으므로 상수로 둠.
// 실제 앱에서는 [workspace] 라우트 하위라 항상 param이 존재. (없을 때만 폴백)
const DEFAULT_WORKSPACE_SLUG = "jigeum-lab";

/** 현재 URL의 워크스페이스 슬러그 */
export function useWorkspaceSlug(): string {
  const params = useParams<{ workspace?: string }>();
  return params?.workspace ?? DEFAULT_WORKSPACE_SLUG;
}
