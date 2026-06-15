import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // FSD 레이어 경계 강제 — import는 상→하만 (app→views→widgets→features→entities→shared)
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "views", pattern: "src/views/**" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "app", allow: ["app", "views", "widgets", "features", "entities", "shared"] },
            { from: "views", allow: ["views", "widgets", "features", "entities", "shared"] },
            { from: "widgets", allow: ["widgets", "features", "entities", "shared"] },
            { from: "features", allow: ["features", "entities", "shared"] },
            { from: "entities", allow: ["entities", "shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
