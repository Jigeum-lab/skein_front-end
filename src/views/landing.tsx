import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Logo } from "@/shared/ui/logo";
import { Button } from "@/shared/ui/button";
import { HeroPreview } from "@/widgets/hero-preview";

const stats = [
  { value: "5+", label: "오가던 제작 도구를 하나로" },
  { value: "30분", label: "브랜드 룸 첫 셋업" },
  { value: "20+", label: "한 곳에서 관리하는 브랜드" },
];

const capabilities = [
  {
    title: "브랜드 룸",
    desc: "톤 가이드를 사람 머릿속에서 꺼내, 팀의 기억으로. 잘된 콘텐츠·금지어까지 한 곳에 담아 누가 만들어도 같은 톤을 유지합니다.",
  },
  {
    title: "AI 카피 생성",
    desc: "브랜드 룸이 아는 톤 그대로, 광고·SNS 카피를 여러 안으로. 매번 톤을 다시 설명하지 않습니다.",
  },
  {
    title: "AI 비주얼 생성",
    desc: "카피를 확정하면, 같은 화면에서 온브랜드 비주얼이 따라옵니다. 카피와 디자인 사이의 핸드오프가 사라집니다.",
  },
  {
    title: "콘텐츠 라이브러리",
    desc: "만든 콘텐츠를 저장·검색하고, Draft → Review → Approved 승인까지 한 흐름으로.",
  },
  {
    title: "멀티브랜드 워크스페이스",
    desc: "워크스페이스 › 브랜드 › 콘텐츠. 클라이언트가 늘어도 톤은 섞이지 않습니다.",
  },
];

const compare = [
  "흩어진 톤 가이드 PDF·노션 대신, 학습되는 브랜드 룸",
  "카피 따로·비주얼 따로가 아니라, 한 워크플로로",
  "브랜드가 늘어도 흔들리지 않는 일관성",
  "신입도 첫날부터 온브랜드 — 암묵지를 시스템으로",
];

const trust = [
  {
    title: "브랜드 간 기본 격리",
    desc: "한 클라이언트의 톤이 다른 곳에 새지 않습니다. 데이터는 기본값으로 분리됩니다.",
  },
  {
    title: "투명한 톤 학습",
    desc: "당신의 브랜드 자산이 톤 학습에 어떻게 쓰이는지, 처음부터 끝까지 보입니다.",
  },
  {
    title: "함께 만드는 베타",
    desc: "미국 타깃 뷰티 D2C 대행사와 비공개 베타로 검증하며 만들고 있습니다.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Logo />
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" render={<Link href="/login" />}>
              로그인
            </Button>
            <Button size="sm" render={<Link href="/signup" />}>
              베타 데모 신청
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero — 좌측 정렬 에디토리얼 */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-14 sm:pt-28">
        <p className="text-sm font-medium text-muted-foreground">
          멀티브랜드 마케팅 대행사를 위한 콘텐츠 작업실
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          브랜드 톤을, 더는 설명하지 마세요.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          브랜드별 톤을 학습한 브랜드 룸에서, 카피와 비주얼을 온브랜드로
          생성합니다. 대행사가 굴리는 모든 브랜드를 한 워크스페이스에서, 격리된
          채로.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Button size="lg" render={<Link href="/signup" />}>
            베타 데모 신청
            <ArrowRight />
          </Button>
          <Link
            href="/dashboard"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            작동 방식 보기 →
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          미국 타깃 뷰티 D2C 대행사와 비공개 베타 · 브랜드 간 데이터 기본 격리
        </p>
      </section>

      {/* 앱 프리뷰 */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-24">
        <HeroPreview />
      </div>

      {/* Stats */}
      <section className="border-y">
        <div className="mx-auto grid max-w-5xl divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-10">
              <div className="text-4xl font-semibold tracking-tight">
                {s.value}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities — 번호 매긴 리스트 */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-[260px_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              한 워크스페이스 안에 다 있습니다
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              기획부터 비주얼까지, 탭을 갈아타지 않고.
            </p>
          </div>
          <div className="border-t">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className="flex gap-6 border-b py-6"
              >
                <span className="pt-0.5 text-sm tabular-nums text-muted-foreground">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">
            흩어진 도구로는 풀 수 없던 것
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            카피 도구와 비주얼 도구를 오가며 브랜드 톤을 수동으로 맞추는 시대는
            끝났습니다. 멀티브랜드 대행사의 워크플로에 맞춰 설계됐습니다.
          </p>
          <div className="mt-12 grid gap-x-12 sm:grid-cols-2">
            {compare.map((c) => (
              <div key={c} className="flex items-start gap-3 border-t py-5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight">
          신뢰를 기능처럼 설계했습니다
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className="border-t pt-5">
              <h3 className="font-medium">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight">
            당신의 첫 브랜드 룸부터 시작하세요
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            첫 브랜드를 등록하고 카피 5안·비주얼 3안을 만들어보는 데 30분이면
            충분합니다.
          </p>
          <Button size="lg" className="mt-8" render={<Link href="/signup" />}>
            베타 데모 신청
            <ArrowRight />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© 2026 Skein · 지금랩</p>
        </div>
      </footer>
    </div>
  );
}
