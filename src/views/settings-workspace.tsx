import { Check } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { UsageMeter } from "@/widgets/usage-meter";
import { plans, currentUsage, workspaces } from "@/entities";

export default function WorkspaceSettingsPage() {
  const ws = workspaces.find((w) => w.id === currentUsage.workspaceId) ?? workspaces[0];
  const currentPlanId = currentUsage.planId;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">워크스페이스 설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {ws.name} · 플랜 · 사용량 · 청구를 관리합니다.
        </p>
      </div>

      {/* 사용량 */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">사용량</h2>
        <UsageMeter />
      </section>

      {/* 플랜 */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">플랜</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const isCurrent = p.id === currentPlanId;
            return (
              <Card
                key={p.id}
                className={
                  p.highlight
                    ? "border-primary/50 ring-1 ring-primary/20"
                    : undefined
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    {isCurrent ? (
                      <Badge variant="secondary">현재 플랜</Badge>
                    ) : p.highlight ? (
                      <Badge>추천</Badge>
                    ) : null}
                  </div>
                  <CardDescription>
                    {p.priceMonthly === null ? (
                      <span className="text-foreground">
                        <span className="text-xl font-semibold">무료</span> · 베타
                      </span>
                    ) : (
                      <span className="text-foreground">
                        <span className="text-xl font-semibold">${p.priceMonthly}</span>
                        <span className="text-muted-foreground"> / seat · 월</span>
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={isCurrent ? "outline" : p.highlight ? "default" : "outline"}
                    disabled={isCurrent}
                  >
                    {isCurrent ? "사용 중" : p.priceMonthly === null ? "다운그레이드" : "업그레이드"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 청구 */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">청구</h2>
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
            <div>
              <p className="text-sm font-medium">결제 수단</p>
              <p className="text-sm text-muted-foreground">
                베타 기간에는 청구되지 않습니다. 정식 출시 시 카드 등록이 필요합니다.
              </p>
            </div>
            <Button variant="outline" disabled>
              결제 수단 추가
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
