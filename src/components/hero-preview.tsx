import { Sparkles, PenLine, ImageIcon, Library, LayoutDashboard } from "lucide-react";
import { brands } from "@/lib/mock-data";

// 랜딩 히어로용 정적 앱 프리뷰 목업 — 실제 토큰으로 Skein 앱 셸을 재현
export function HeroPreview() {
  const shown = brands.slice(0, 4);
  const nav = [
    { icon: LayoutDashboard, label: "대시보드", active: false },
    { icon: Sparkles, label: "브랜드 룸", active: true },
    { icon: PenLine, label: "카피 생성", active: false },
    { icon: ImageIcon, label: "비주얼 생성", active: false },
    { icon: Library, label: "라이브러리", active: false },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-2xl ring-1 ring-black/5">
      {/* 윈도우 바 */}
      <div className="flex h-9 items-center gap-1.5 border-b bg-muted/40 px-3.5">
        <span className="size-2.5 rounded-full bg-muted-foreground/25" />
        <span className="size-2.5 rounded-full bg-muted-foreground/25" />
        <span className="size-2.5 rounded-full bg-muted-foreground/25" />
        <div className="mx-auto flex h-5 items-center rounded-md bg-background px-3 text-[11px] text-muted-foreground">
          skein.app / 지금.lab
        </div>
      </div>

      <div className="flex">
        {/* 사이드바 */}
        <aside className="hidden w-48 shrink-0 border-r bg-sidebar p-3 sm:block">
          <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
              우
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold leading-none">
                지금.lab
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">
                Beta 워크스페이스
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-0.5">
            {nav.map((n) => (
              <div
                key={n.label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                  n.active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <n.icon className="size-3.5" />
                {n.label}
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3">
            <p className="mb-1.5 px-2 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
              브랜드
            </p>
            {shown.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] text-muted-foreground"
              >
                <span
                  className="size-3 rounded-[4px]"
                  style={{ backgroundColor: b.color }}
                />
                <span className="truncate">{b.name}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* 메인 */}
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">브랜드 룸</p>
              <p className="text-[11px] text-muted-foreground">
                4개 브랜드 · 톤 학습 완료 2개
              </p>
            </div>
            <div className="flex h-7 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-[11px] font-medium text-primary-foreground">
              <Sparkles className="size-3.5" />
              생성
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {shown.map((b) => (
              <div key={b.id} className="rounded-lg border bg-background p-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="flex size-7 items-center justify-center rounded-lg text-[11px] font-semibold text-white"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium leading-none">
                      {b.name}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                      {b.voiceProfile}
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${b.roomReady}%`,
                      backgroundColor: b.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
