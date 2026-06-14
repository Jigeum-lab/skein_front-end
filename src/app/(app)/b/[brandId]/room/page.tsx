"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Sparkles, Link2, Plus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import {
  brands,
  getBrand,
  getReferences,
  getToneProfile,
  PLATFORM_LABEL,
  type ReferenceItem,
  type RefPlatform,
} from "@/lib/mock-data";

// URL에서 플랫폼 감지 (어댑터 라우팅의 첫 단계)
function detectPlatform(url: string): RefPlatform {
  const u = url.toLowerCase();
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("threads.net") || u.includes("threads.com")) return "threads";
  if (u.includes("tiktok.com")) return "tiktok";
  return "manual";
}

const MIN_REFS = 3;

export default function BrandRoomPage() {
  const params = useParams<{ brandId: string }>();
  const brandId = params?.brandId ?? brands[0].id;
  const brand = getBrand(brandId) ?? brands[0];
  const tone = getToneProfile(brandId);

  const [refs, setRefs] = React.useState<ReferenceItem[]>(() => getReferences(brandId));
  const [url, setUrl] = React.useState("");
  const [manual, setManual] = React.useState("");

  const extractedCount = refs.filter((r) => r.status === "extracted").length;
  const contextActive = extractedCount >= MIN_REFS && !!tone;

  function addFromLink() {
    const trimmed = url.trim();
    if (!trimmed) return;
    const platform = detectPlatform(trimmed);
    const id = `ref_${Date.now()}`;
    // 비동기 추출 시뮬레이션: pending → extracted
    const pending: ReferenceItem = {
      id,
      brandId,
      platform,
      channel: platform === "youtube" ? "유튜브 자막" : `${PLATFORM_LABEL[platform]} 캡션`,
      sourceUrl: trimmed,
      text: "",
      status: "pending",
    };
    setRefs((r) => [pending, ...r]);
    setUrl("");
    window.setTimeout(() => {
      setRefs((r) =>
        r.map((x) =>
          x.id === id
            ? {
                ...x,
                status: "extracted",
                text: "추출된 텍스트 (데모) — 실제로는 어댑터가 캡션·자막을 가져옵니다.",
              }
            : x,
        ),
      );
    }, 1200);
  }

  function addManual() {
    const trimmed = manual.trim();
    if (!trimmed) return;
    setRefs((r) => [
      {
        id: `ref_${Date.now()}`,
        brandId,
        platform: "manual",
        channel: "직접 입력",
        text: trimmed,
        status: "extracted",
      },
      ...r,
    ]);
    setManual("");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-xl text-lg font-semibold text-white"
            style={{ backgroundColor: brand.color }}
          >
            {brand.initial}
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{brand.name} · 브랜드 룸</h1>
            <p className="text-sm text-muted-foreground">
              레퍼런스를 더하면 톤을 자동 추출해 카피 생성에 주입합니다.
            </p>
          </div>
        </div>
        {contextActive ? (
          <Badge className="gap-1">
            <CheckCircle2 className="size-3.5" /> 컨텍스트 활성화
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1 text-muted-foreground">
            <AlertCircle className="size-3.5" /> 비활성 · 레퍼런스 {extractedCount}/{MIN_REFS}
          </Badge>
        )}
      </div>

      <Tabs defaultValue="tone">
        <TabsList>
          <TabsTrigger value="tone">
            <Sparkles className="size-4" /> 톤 프로필
          </TabsTrigger>
          <TabsTrigger value="refs">레퍼런스 ({refs.length})</TabsTrigger>
        </TabsList>

        {/* 톤 프로필 */}
        <TabsContent value="tone" className="space-y-4 pt-4">
          {tone ? (
            <>
              <Card>
                <CardContent className="space-y-1 pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">추출된 보이스 요약</p>
                    <Badge variant="secondary">신뢰도 {tone.confidence}%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tone.summary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 pt-6">
                  <p className="text-sm font-medium">보이스 축</p>
                  {tone.attributes.map((a) => (
                    <div key={a.label} className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{a.left}</span>
                        <span className="font-medium text-foreground">{a.label}</span>
                        <span>{a.right}</span>
                      </div>
                      <div className="relative h-1.5 rounded-full bg-muted">
                        <div
                          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary"
                          style={{ left: `${a.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium">선호 어휘</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tone.lexicon.preferred.map((w) => (
                        <Badge key={w} variant="secondary">
                          {w}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium">금지 어휘</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tone.lexicon.avoid.map((w) => (
                        <Badge
                          key={w}
                          variant="outline"
                          className="border-destructive/40 text-destructive"
                        >
                          {w}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
                <Sparkles className="size-7 text-muted-foreground" />
                <p className="text-sm font-medium">아직 톤 프로필이 없습니다</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  레퍼런스를 {MIN_REFS}개 이상 추가하면 톤을 자동 추출합니다.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 레퍼런스 */}
        <TabsContent value="refs" className="space-y-4 pt-4">
          {/* 추가: 3 모드 */}
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">계정 연동 (P1)</Label>
                <div className="flex flex-wrap gap-2">
                  {(["instagram", "youtube", "threads", "tiktok"] as const).map((p) => (
                    <Button key={p} variant="outline" size="sm" disabled>
                      {PLATFORM_LABEL[p]} 연동
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ref-url" className="text-xs text-muted-foreground">
                  링크 붙여넣기 (IG · YouTube · Threads · TikTok)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="ref-url"
                    placeholder="https://instagram.com/p/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addFromLink()}
                  />
                  <Button onClick={addFromLink} disabled={!url.trim()}>
                    <Link2 /> 추출
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ref-manual" className="text-xs text-muted-foreground">
                  텍스트 직접 입력 (비공개·미지원 폴백)
                </Label>
                <Textarea
                  id="ref-manual"
                  placeholder="잘 쓴 브랜드 카피를 붙여넣으세요…"
                  rows={3}
                  value={manual}
                  onChange={(e) => setManual(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addManual}
                  disabled={!manual.trim()}
                >
                  <Plus /> 레퍼런스 추가
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 목록 */}
          <div className="space-y-2">
            {refs.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                아직 레퍼런스가 없습니다. 링크나 텍스트로 추가하세요.
              </p>
            )}
            {refs.map((r) => (
              <Card key={r.id}>
                <CardContent className="flex items-start gap-3 py-3">
                  <Badge variant="outline" className="mt-0.5 shrink-0">
                    {PLATFORM_LABEL[r.platform]}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{r.channel}</p>
                    {r.status === "pending" ? (
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Loader2 className="size-3.5 animate-spin" /> 텍스트 추출 중…
                      </p>
                    ) : r.status === "failed" ? (
                      <p className="flex items-center gap-1.5 text-sm text-destructive">
                        <AlertCircle className="size-3.5" /> 추출 실패 — 직접 입력해 주세요
                      </p>
                    ) : (
                      <p className="line-clamp-2 text-sm">{r.text}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
