<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Skein — 디자인 시스템 규칙 (필수)

스택: Next 16 + Tailwind v4 + **shadcn/ui (Base UI 기반)** + **react-bits** (애니메이션).

## 절대 규칙: 디자인 하드코딩 금지
UI는 항상 **shadcn 컴포넌트 + 디자인 토큰**으로 조립한다. 애니메이션/이펙트는 **react-bits**를 쓴다.
- ❌ 페이지/컴포넌트에 임의의 hex·oklch·rgb 색, 매직 픽셀값 직접 박지 말 것.
- ✅ 색은 토큰 유틸리티로만: `bg-primary text-muted-foreground border-border bg-accent` 등. 토큰 정의는 `src/app/globals.css`.
- ✅ 새 UI 부품이 필요하면 먼저 `npx shadcn@latest add <name>` 로 가져온다.
- ✅ 애니메이션이 필요하면 react-bits에서: `npx shadcn@latest add "https://reactbits.dev/r/<ComponentName>-TS-TW"` (이 프로젝트는 TS+Tailwind).
- 예외: 브랜드 식별 색은 **데이터**다 — `src/lib/mock-data.ts`의 brand.color 처럼 데이터 레이어에만 둔다(디자인 하드코딩 아님).

## shadcn은 Base UI 기반 — Radix 아님
- 폴리모픽은 `asChild` ❌ → **`render` prop** ✅: `<Button render={<Link href="..." />}>라벨</Button>`.
- `TooltipProvider`에 `delayDuration` 없음.
- Radix식 API 가정 금지. 의심되면 `src/components/ui/<comp>.tsx` 원본을 먼저 읽을 것.

## react-bits 사용 시 주의
- 설치된 파일은 `src/components/<Name>.tsx`. 훅을 쓰므로 **맨 위에 `"use client"` 추가** 필요(기본 미포함).
- 일부 컴포넌트는 다크 전용 색이 하드코딩됨(예 SpotlightCard `bg-neutral-900`, Beams 검은 캔버스) → **토큰으로 리테마**한 뒤 사용(친근 라이트 테마 유지).
- Three.js 기반(Beams 등)은 `next/dynamic` `ssr:false` 클라이언트 래퍼로 감쌀 것.

## 테마
친근 라이트 (Jasper/Notion 톤), 소프트 퍼플 액센트 `oklch(0.55 0.18 292)`, Inter. 다크 토큰도 globals.css에 있으나 현재 라이트 기본.
