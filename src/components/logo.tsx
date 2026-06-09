import Link from "next/link";
import { cn } from "@/lib/utils";

// Skein 로고 — "실타래"를 감는 형태의 간단한 마크 + 워드마크
export function Logo({
  className,
  href = "/",
  showWord = true,
}: {
  className?: string;
  href?: string;
  showWord?: boolean;
}) {
  const mark = (
    <span className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-7 text-primary"
        aria-hidden
      >
        <rect width="24" height="24" rx="7" fill="currentColor" />
        <path
          d="M7 9c2.5-2 7.5-2 10 0M6.5 12c3-2.2 8-2.2 11 0M7 15c2.5-2 7.5-2 10 0"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {showWord && (
        <span className="text-lg font-semibold tracking-tight">Skein</span>
      )}
    </span>
  );

  if (!href) return <div className={cn("inline-flex", className)}>{mark}</div>;

  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      {mark}
    </Link>
  );
}
