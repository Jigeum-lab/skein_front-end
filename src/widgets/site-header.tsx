"use client";

import * as React from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Search, ChevronsUpDown, Check, Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { brands, getBrand } from "@/lib/mock-data";
import { useWorkspaceSlug } from "@/shared/lib/use-workspace";

const LABELS: Record<string, string> = {
  dashboard: "대시보드",
  room: "브랜드 룸",
  write: "카피 생성",
  visual: "비주얼 생성",
  library: "라이브러리",
  settings: "설정",
  workspace: "워크스페이스",
  members: "멤버",
};

function useCrumbs() {
  const pathname = usePathname();
  const segs = pathname.split("/").filter(Boolean);
  const crumbs: string[] = [];
  // 첫 세그먼트(워크스페이스 슬러그)는 브레드크럼에서 생략
  for (let i = 1; i < segs.length; i++) {
    const s = segs[i];
    if (s === "b") {
      const brand = getBrand(segs[i + 1]);
      if (brand) crumbs.push(brand.name);
      i++; // skip brandId
      continue;
    }
    crumbs.push(LABELS[s] ?? s);
  }
  return crumbs.length ? crumbs : ["대시보드"];
}

// 헤더 브랜드 셀렉터 — 사이드바에서 빠진 브랜드 전환을 상단 바에서 처리
function HeaderBrandSelector() {
  const router = useRouter();
  const params = useParams<{ brandId?: string }>();
  const ws = useWorkspaceSlug();
  const current = (params?.brandId && getBrand(params.brandId)) || brands[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 px-2 font-medium"
          >
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: current.color }}
            />
            <span className="max-w-32 truncate">{current.name}</span>
            <ChevronsUpDown className="size-3.5 opacity-50" />
          </Button>
        }
      />
      <DropdownMenuContent align="start" className="min-w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          브랜드 ({brands.length})
        </DropdownMenuLabel>
        {brands.map((b) => (
          <DropdownMenuItem
            key={b.id}
            onClick={() => router.push(`/${ws}/b/${b.id}/room`)}
            className="gap-2"
          >
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: b.color }}
            />
            <span className="flex-1 truncate">{b.name}</span>
            {b.id === current.id && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-muted-foreground">
          <Plus className="size-4" />새 브랜드 추가
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const crumbs = useCrumbs();

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={
                    i < crumbs.length - 1 ? "text-muted-foreground font-normal" : ""
                  }
                >
                  {c}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />
      <HeaderBrandSelector />

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          document.dispatchEvent(new CustomEvent("skein:command-open"))
        }
        className="ml-auto h-8 gap-2 text-muted-foreground"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">검색·명령</span>
        <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </Button>
    </header>
  );
}
