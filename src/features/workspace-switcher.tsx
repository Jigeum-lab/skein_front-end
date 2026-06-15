"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronsUpDown,
  Plus,
  Check,
  Sparkles,
  BadgeCheck,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import { workspaces, getWorkspaceBySlug } from "@/lib/mock-data";
import { useWorkspaceSlug } from "@/shared/lib/use-workspace";

const user = {
  name: "김민지",
  email: "minji@jigeum.lab",
};

// Notion 스타일: 상단 단일 진입점 = 워크스페이스 + 계정(드롭다운에 흡수)
export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const wsSlug = useWorkspaceSlug();
  const active = getWorkspaceBySlug(wsSlug) ?? workspaces[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-semibold">
                  {active.name.charAt(0)}
                </span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{active.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {active.plan} 워크스페이스
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
            {/* 계정 */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-medium">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* 워크스페이스 */}
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              워크스페이스
            </DropdownMenuLabel>
            {workspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => router.push(`/${ws.slug}/dashboard`)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background text-xs font-semibold">
                  {ws.name.charAt(0)}
                </div>
                <span className="flex-1 truncate">{ws.name}</span>
                {ws.id === active.id && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="gap-2 p-2 text-muted-foreground">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              새 워크스페이스
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* 계정 액션 */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                플랜 업그레이드
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BadgeCheck />
                계정 설정
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/login")}>
              <LogOut />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
