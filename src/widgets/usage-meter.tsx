import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import {
  currentUsage,
  getPlan,
  getBrand,
  USAGE_LABEL,
  type UsageType,
} from "@/entities";

function fmtCycle(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const m = (d: Date) => `${d.getMonth() + 1}.${d.getDate()}`;
  return `${m(s)} – ${m(e)}`;
}

/** 워크스페이스 크레딧 사용량 카드 — 한도 인지 + 향후 과금 설계 가시화 */
export function UsageMeter({ compact = false }: { compact?: boolean }) {
  const u = currentUsage;
  const plan = getPlan(u.planId);
  const pct = Math.min(100, Math.round((u.creditsUsed / plan.creditsIncluded) * 100));
  const remaining = Math.max(0, plan.creditsIncluded - u.creditsUsed);
  const near = pct >= 80;

  const types = (Object.keys(u.byType) as UsageType[]).filter((t) => u.byType[t] > 0);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <p className="text-sm font-medium">크레딧 사용량</p>
          <p className="text-xs text-muted-foreground">
            {plan.name} 플랜 · {fmtCycle(u.cycleStart, u.cycleEnd)}
          </p>
        </div>
        <Badge variant={near ? "destructive" : "secondary"}>
          {u.creditsUsed.toLocaleString()} / {plan.creditsIncluded.toLocaleString()}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="크레딧 사용률"
        >
          <div
            className={`h-full rounded-full transition-all ${near ? "bg-destructive" : "bg-primary"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {pct}% 사용 · 잔여 {remaining.toLocaleString()} 크레딧
          {near && " · 한도 임박"}
        </p>

        {!compact && (
          <div className="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-3">
            {types.map((t) => (
              <div key={t} className="rounded-lg border bg-card px-3 py-2">
                <p className="text-xs text-muted-foreground">{USAGE_LABEL[t]}</p>
                <p className="text-sm font-semibold tabular-nums">
                  {u.byType[t].toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {!compact && (
          <div className="space-y-2 pt-1">
            <p className="text-xs font-medium text-muted-foreground">브랜드별</p>
            {u.byBrand
              .filter((b) => b.credits > 0)
              .map((b) => {
                const brand = getBrand(b.brandId);
                const w = Math.round((b.credits / u.creditsUsed) * 100);
                return (
                  <div key={b.brandId} className="flex items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: brand?.color }}
                    />
                    <span className="w-28 shrink-0 truncate text-xs">
                      {brand?.name ?? b.brandId}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${w}%`, backgroundColor: brand?.color }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                      {b.credits}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
