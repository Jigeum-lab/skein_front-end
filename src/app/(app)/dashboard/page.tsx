import Link from "next/link";
import { Plus, PenLine, ImageIcon, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { UsageMeter } from "@/components/usage-meter";
import { brands } from "@/lib/mock-data";

export default function DashboardPage() {
  const totalContent = brands.reduce((s, b) => s + b.contentCount, 0);
  const liveBrands = brands.filter((b) => b.roomReady > 0).length;

  return (
    <div className="flex flex-col gap-8">
      {/* 헤더 */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            지금.lab 워크스페이스
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            브랜드 {brands.length}개 · 활성 {liveBrands}개 · 생성 콘텐츠{" "}
            {totalContent}건
          </p>
        </div>
        <Button render={<Link href="/b/new" />}>
          <Plus />새 브랜드
        </Button>
      </div>

      {/* 사용량 요약 */}
      <UsageMeter compact />

      {/* 브랜드 카드 그리드 */}
      <section>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          브랜드
        </h2>
        <div className="grid grid-cols-1 gap-4 @2xl/main:grid-cols-2 @4xl/main:grid-cols-3 @6xl/main:grid-cols-4">
          {brands.map((b) => (
            <Card key={b.id} className="group overflow-hidden">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <div
                  className="flex size-11 items-center justify-center rounded-xl text-lg font-semibold text-white"
                  style={{ backgroundColor: b.color }}
                >
                  {b.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{b.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {b.voiceProfile}
                  </p>
                </div>
                {b.roomReady === 100 ? (
                  <Badge variant="secondary">준비됨</Badge>
                ) : b.roomReady > 0 ? (
                  <Badge variant="outline">{b.roomReady}%</Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    미설정
                  </Badge>
                )}
              </CardHeader>

              <CardContent>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${b.roomReady}%`,
                      backgroundColor: b.color,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  브랜드 룸 {b.roomReady}% · 콘텐츠 {b.contentCount}건
                </p>
              </CardContent>

              <CardFooter className="gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 justify-start px-2"
                  render={<Link href={`/b/${b.id}/write`} />}
                >
                  <PenLine className="text-muted-foreground" />
                  카피
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 justify-start px-2"
                  render={<Link href={`/b/${b.id}/visual`} />}
                >
                  <ImageIcon className="text-muted-foreground" />
                  비주얼
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/b/${b.id}/room`} />}
                >
                  열기
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* 새 브랜드 추가 카드 */}
          <Link
            href="/b/new"
            className="flex min-h-[14rem] flex-col items-center justify-center rounded-xl border border-dashed text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent/40 hover:text-primary"
          >
            <Plus className="size-6" />
            <span className="mt-2 text-sm font-medium">새 브랜드 추가</span>
            <span className="mt-1 text-xs">로고·톤·금지어를 등록해 시작</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
