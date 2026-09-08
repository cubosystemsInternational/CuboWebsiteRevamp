import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored as-is from the React Bits registry (reactbits.dev) — not
    // authored by this project, kept unmodified so it stays a clean drop-in
    // when upstream ships updates.
    "src/components/OptionWheel.jsx",
  ]),
]);

export default eslintConfig;
