"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBrand } from "@/lib/mock-data";

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
  for (let i = 0; i < segs.length; i++) {
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
