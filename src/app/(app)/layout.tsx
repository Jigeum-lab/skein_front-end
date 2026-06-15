import { redirect } from "next/navigation";

import { USE_MOCK } from "@/shared/config/env";
import { createClient } from "@/shared/lib/supabase/server";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/widgets/app-sidebar";
import { SiteHeader } from "@/widgets/site-header";
import { CommandMenu } from "@/features/command-menu";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // mock 모드에선 자유롭게 둘러보기 허용. 실 API 모드일 때만 로그인 강제.
  if (!USE_MOCK) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="@container/main flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
      <CommandMenu />
    </SidebarProvider>
  );
}
