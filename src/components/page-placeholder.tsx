import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta?: string;
  /** 다음 단계 안내 — 이 화면이 어떤 기능 화면인지 라벨 */
  stage?: string;
};

// 화면 셸 단계의 빈 상태 — 기능 화면은 추후 단계에서 채움 (헤드라인 → 설명 → 단일 CTA)
export function PagePlaceholder({
  icon: Icon,
  title,
  description,
  cta,
  stage,
}: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {stage && (
        <span className="mb-4 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          {stage}
        </span>
      )}
      <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <Icon className="size-7" />
      </div>
      <h2 className="mt-5 text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {cta && (
        <Button className="mt-6" disabled>
          {cta}
        </Button>
      )}
    </div>
  );
}
