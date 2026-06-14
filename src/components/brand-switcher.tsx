"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronsUpDown, Plus, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { brands, getBrand } from "@/lib/mock-data";

export function BrandSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const params = useParams<{ brandId?: string }>();
  const current = (params?.brandId && getBrand(params.brandId)) || brands[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: current.color }}
              >
                {current.initial}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{current.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {current.voiceProfile}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-60" />
            </SidebarMenuButton>
          } />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              브랜드 ({brands.length})
            </DropdownMenuLabel>
            {brands.map((b) => (
              <DropdownMenuItem
                key={b.id}
                onClick={() => router.push(`/b/${b.id}/room`)}
                className="gap-2 p-2"
              >
                <div
                  className="flex size-6 items-center justify-center rounded-md text-xs font-semibold text-white"
                  style={{ backgroundColor: b.color }}
                >
                  {b.initial}
                </div>
                <span className="flex-1 truncate">{b.name}</span>
                {b.id === current.id && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2 text-muted-foreground">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              새 브랜드 추가
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
