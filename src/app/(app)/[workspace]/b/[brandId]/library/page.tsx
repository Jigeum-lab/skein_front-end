"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Library, Copy, Send, Check, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  brands,
  getBrand,
  getContents,
  CONTENT_STATUS_LABEL,
  type ContentItem,
  type ContentStatus,
} from "@/entities";

const FILTERS: ("all" | ContentStatus)[] = ["all", "draft", "review", "approved"];
const FILTER_LABEL: Record<string, string> = {
  all: "전체",
  draft: "Draft",
  review: "Review",
  approved: "Approved",
};

function statusBadge(s: ContentStatus) {
  if (s === "approved")
    return (
      <Badge className="border-green-300 bg-green-100 text-green-700">
        Approved
      </Badge>
    );
  if (s === "review") return <Badge variant="secondary">Review</Badge>;
  return <Badge variant="outline">Draft</Badge>;
}

export default function LibraryPage() {
  const params = useParams<{ brandId: string }>();
  const brandId = params?.brandId ?? brands[0].id;
  const brand = getBrand(brandId) ?? brands[0];

  const [items, setItems] = React.useState<ContentItem[]>(() =>
    getContents(brandId),
  );
  const [filter, setFilter] = React.useState<"all" | ContentStatus>("all");

  const shown = items.filter((c) => filter === "all" || c.status === filter);

  function move(id: string, status: ContentStatus, label: string) {
    setItems((arr) => arr.map((c) => (c.id === id ? { ...c, status } : c)));
    toast.success(label);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {brand.name} · 라이브러리
          </h1>
          <p className="text-sm text-muted-foreground">
            Draft → Review → Approved 승인 루프 · 채택률 계측
          </p>
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {FILTER_LABEL[f]}
            </Button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-muted-foreground">
          <Library className="size-8" />
          <p className="text-sm">아직 생성된 콘텐츠가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2 @6xl/main:grid-cols-3">
          {shown.map((c) => (
            <Card key={c.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-3 pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{c.channel}</Badge>
                    <span className="text-xs text-muted-foreground">{c.format}</span>
                  </div>
                  {statusBadge(c.status)}
                </div>

                <Dialog>
                  <DialogTrigger
                    render={
                      <button className="flex-1 cursor-pointer text-left text-sm leading-relaxed hover:text-primary">
                        <span className="line-clamp-3">{c.text}</span>
                      </button>
                    }
                  />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {c.channel} · {c.format}
                      </DialogTitle>
                      <DialogDescription>
                        {CONTENT_STATUS_LABEL[c.status]} · 수정 {c.revisionCount}회
                        {c.edited ? " · 승인 전 편집됨" : ""}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs font-medium text-muted-foreground">
                          현재
                        </p>
                        <p className="rounded-lg border bg-card p-3 text-sm">
                          {c.text}
                        </p>
                      </div>
                      {c.edited && (
                        <div>
                          <p className="mb-1 text-xs font-medium text-muted-foreground">
                            AI 원본 (generated_text)
                          </p>
                          <p className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground line-through">
                            {c.generatedText}
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="mt-auto flex flex-wrap gap-2 border-t pt-3">
                  {c.status === "draft" && (
                    <Button
                      size="sm"
                      onClick={() => move(c.id, "review", "리뷰 요청됨")}
                    >
                      <Send /> 리뷰 요청
                    </Button>
                  )}
                  {c.status === "review" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => move(c.id, "approved", "승인됨")}
                      >
                        <Check /> 승인
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => move(c.id, "draft", "재작업 요청 (Draft)")}
                      >
                        <Undo2 /> 재작업
                      </Button>
                    </>
                  )}
                  {c.status === "approved" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard?.writeText(c.text);
                        toast.success("복사됨");
                      }}
                    >
                      <Copy /> 텍스트 복사
                    </Button>
                  )}
                  <span className="ml-auto self-center text-xs text-muted-foreground">
                    {c.createdAt}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
