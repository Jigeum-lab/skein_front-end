export type Workspace = {
  id: string;
  /** URL 스코프 (예: /jigeum-lab/dashboard) */
  slug: string;
  name: string;
  plan: "Beta" | "Pro" | "Agency";
};

export const workspaces: Workspace[] = [
  { id: "ws_jigeum", slug: "jigeum-lab", name: "지금.lab", plan: "Beta" },
  { id: "ws_demo", slug: "demo-agency", name: "Demo Agency", plan: "Agency" },
];

export const defaultWorkspace = workspaces[0];

export function getWorkspaceBySlug(slug: string): Workspace | undefined {
  return workspaces.find((w) => w.slug === slug);
}
