"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import { BrandSwitcher } from "@/components/brand-switcher";
import { NavMain } from "@/components/nav-main";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Notion 스타일: 상단에 워크스페이스(계정 포함) 단일 진입점. 하단 계정 제거. */}
      <SidebarHeader className="gap-1.5">
        <WorkspaceSwitcher />
        <BrandSwitcher />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
