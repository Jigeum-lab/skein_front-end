"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useWorkspaceSlug } from "@/shared/lib/use-workspace";

const COLORS = [
  "oklch(0.62 0.19 293)",
  "oklch(0.66 0.2 12)",
  "oklch(0.7 0.14 160)",
  "oklch(0.72 0.15 75)",
  "oklch(0.6 0.16 250)",
  "oklch(0.45 0.04 285)",
];

export default function NewBrandPage() {
  const router = useRouter();
  const ws = useWorkspaceSlug();
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState(COLORS[0]);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  function create() {
    if (!name.trim()) {
      toast.error("브랜드 이름을 입력해주세요");
      return;
    }
    // 데모: 실제로는 POST /workspaces/:id/brands → 새 brandId
    toast.success(`"${name}" 브랜드 생성됨 — 브랜드 룸으로 이동`);
    router.push(`/${ws}/dashboard`);
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">새 브랜드 만들기</h1>
        <p className="text-sm text-muted-foreground">
          브랜드를 만들면 다음 단계에서 톤앤매너를 학습합니다.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-5 pt-6">
          {/* 미리보기 */}
          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <div
              className="flex size-11 items-center justify-center rounded-xl text-lg font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {initial}
            </div>
            <div>
              <p className="font-medium">{name.trim() || "브랜드 이름"}</p>
              <p className="text-xs text-muted-foreground">미설정 · 톤 학습 전</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">브랜드 이름</Label>
            <Input
              id="name"
              placeholder="예: Lumea Skincare"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && create()}
            />
          </div>

          <div className="space-y-1.5">
            <Label>브랜드 컬러</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="flex size-9 items-center justify-center rounded-lg ring-offset-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: c,
                    outline: color === c ? "2px solid var(--ring)" : "none",
                    outlineOffset: "2px",
                  }}
                  aria-label="브랜드 컬러 선택"
                >
                  {color === c && <Check className="size-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={create} disabled={!name.trim()}>
            브랜드 만들기 <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
