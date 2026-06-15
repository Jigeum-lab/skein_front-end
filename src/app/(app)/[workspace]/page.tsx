import { redirect } from "next/navigation";

// /[workspace] → /[workspace]/dashboard
export default async function WorkspaceIndex({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  redirect(`/${workspace}/dashboard`);
}
