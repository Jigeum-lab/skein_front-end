"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  PenLine,
  Sparkles,
  AlertCircle,
  Loader2,
  Copy,
  RefreshCw,
  Save,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import {
  brands,
  getBrand,
  getToneProfile,
  CHANNELS,
  FORMATS,
} from "@/lib/mock-data";

function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <Button
          key={o}
          type="button"
          variant={value === o ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(o)}
        >
          {o}
        </Button>
      ))}
    </div>
  );
}

export default function WritePage() {
  const params = useParams<{ brandId: string }>();
  const brandId = params?.brandId ?? brands[0].id;
  const brand = getBrand(brandId) ?? brands[0];
  const tone = getToneProfile(brandId);

  const [channel, setChannel] = React.useState(CHANNELS[0]);
  const [format, setFormat] = React.useState(FORMATS[0]);
  const [brief, setBrief] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<string[]>([]);

  function generate() {
    if (!brief.trim()) {
      toast.error("작업 지시를 입력해주세요");
      return;
    }
    setLoading(true);
    setResults([]);
    window.setTimeout(() => {
      // 데모: 룸 톤 컨텍스트를 주입해 N안 생성
      const variants = [
        `${brief.trim()} — ${brand.name}의 ${tone?.summary ?? "브랜드"} 톤으로.`,
        `[${channel}·${format}] ${brief.trim()} 데이터로 말하는 ${brand.name}.`,
        `${brief.trim()} 과장 없이, 진정성 있게. #${brand.name.replace(/\s/g, "")}`,
      ];
      setResults(variants);
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-xl text-lg font-semibold text-white"
          style={{ backgroundColor: brand.color }}
        >
          {brand.initial}
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {brand.name} · 카피 생성
          </h1>
          <p className="text-sm text-muted-foreground">
            룸 톤 컨텍스트를 주입해 온브랜드 카피를 생성합니다.
          </p>
        </div>
      </div>

      {!tone && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-300/60 bg-amber-50/60 px-3 py-2 text-sm text-amber-700">
          <AlertCircle className="size-4 shrink-0" />
          브랜드 룸 컨텍스트가 없습니다. 생성은 가능하지만 톤이 약할 수 있어요.
        </div>
      )}

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">채널</Label>
            <Segmented options={CHANNELS} value={channel} onChange={setChannel} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">포맷</Label>
            <Segmented options={FORMATS} value={format} onChange={setFormat} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="brief" className="text-xs text-muted-foreground">
              작업 지시
            </Label>
            <Textarea
              id="brief"
              rows={3}
              placeholder="예: 신제품 진정 세럼 신상 출시 안내, 혜택 강조"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </div>
          <Button onClick={generate} disabled={loading || !brief.trim()}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> 생성 중…
              </>
            ) : (
              <>
                <Sparkles /> 생성 (3안)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* 결과 */}
      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">결과 (3안)</p>
          {results.map((r, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 pt-5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{i + 1}안</Badge>
                  <Badge variant="secondary">
                    {channel} · {format}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed">{r}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => toast.success("Draft로 저장됨 (라이브러리)")}
                  >
                    <Save /> Draft 저장
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard?.writeText(r);
                      toast.success("복사됨");
                    }}
                  >
                    <Copy /> 복사
                  </Button>
                  <Button variant="ghost" size="sm" onClick={generate}>
                    <RefreshCw /> 재생성
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {results.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
          <PenLine className="size-7" />
          <p className="text-sm">채널·포맷·지시를 입력하고 생성을 눌러보세요.</p>
        </div>
      )}
    </div>
  );
}
