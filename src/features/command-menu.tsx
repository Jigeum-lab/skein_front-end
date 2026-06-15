"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  PenLine,
  ImageIcon,
  Library,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/ui/command";
import { brands } from "@/lib/mock-data";
import { useWorkspaceSlug } from "@/shared/lib/use-workspace";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const ws = useWorkspaceSlug();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  // 외부 트리거(상단바 버튼)에서 열기
  React.useEffect(() => {
    const open = () => setOpen(true);
    document.addEventListener("skein:command-open", open);
    return () => document.removeEventListener("skein:command-open", open);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="명령 검색 — 브랜드 전환, 생성, 이동…" />
      <CommandList>
        <CommandEmpty>결과 없음.</CommandEmpty>
        <CommandGroup heading="이동">
          <CommandItem onSelect={() => go(`/${ws}/dashboard`)}>
            <LayoutDashboard />
            대시보드
          </CommandItem>
          <CommandItem onSelect={() => go(`/${ws}/settings/workspace`)}>
            <Settings />
            설정
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="브랜드 전환">
          {brands.map((b) => (
            <CommandItem
              key={b.id}
              onSelect={() => go(`/${ws}/b/${b.id}/room`)}
            >
              <span
                className="flex size-4 items-center justify-center rounded text-[10px] font-bold text-white"
                style={{ backgroundColor: b.color }}
              >
                {b.initial}
              </span>
              {b.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="만들기">
          <CommandItem onSelect={() => go(`/${ws}/b/${brands[0].id}/write`)}>
            <PenLine />
            카피 생성
          </CommandItem>
          <CommandItem onSelect={() => go(`/${ws}/b/${brands[0].id}/visual`)}>
            <ImageIcon />
            비주얼 생성
          </CommandItem>
          <CommandItem onSelect={() => go(`/${ws}/b/${brands[0].id}/room`)}>
            <Sparkles />
            브랜드 룸 열기
          </CommandItem>
          <CommandItem onSelect={() => go(`/${ws}/b/${brands[0].id}/library`)}>
            <Library />
            라이브러리
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
