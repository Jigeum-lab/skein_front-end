"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  PenLine,
  ImageIcon,
  Library,
  Settings,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { BrandSwitcher } from "@/components/brand-switcher";
import { brands, getBrand } from "@/lib/mock-data";

export function NavMain() {
  const pathname = usePathname();
  const params = useParams<{ brandId?: string }>();
  const brand = (params?.brandId && getBrand(params.brandId)) || brands[0];
  const base = `/b/${brand.id}`;

  const workspaceNav = [
    { title: "대시보드", url: "/dashboard", icon: LayoutDashboard },
  ];

  const brandNav = [
    { title: "브랜드 룸", url: `${base}/room`, icon: Sparkles },
    { title: "카피 생성", url: `${base}/write`, icon: PenLine },
    { title: "비주얼 생성", url: `${base}/visual`, icon: ImageIcon },
    { title: "라이브러리", url: `${base}/library`, icon: Library },
  ];

  const settingsNav = [
    { title: "설정", url: "/settings/workspace", icon: Settings },
  ];

  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/");

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>워크스페이스</SidebarGroupLabel>
        <SidebarMenu>
          {workspaceNav.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                isActive={isActive(item.url)}
                render={<Link href={item.url} />}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        {/* 브랜드 스위처 — 최상단이 아니라 브랜드 nav 섹션 머리에 위치 */}
        <BrandSwitcher />
        <SidebarMenu>
          {brandNav.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                isActive={isActive(item.url)}
                render={<Link href={item.url} />}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarMenu>
          {settingsNav.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                isActive={isActive(item.url)}
                render={<Link href={item.url} />}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
