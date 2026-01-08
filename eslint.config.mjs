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
  ]),
  {
    rules: {
      // Disable React hooks effect warnings
      "react-hooks/exhaustive-deps": "off",
      // Disable TypeScript any warnings
      "@typescript-eslint/no-explicit-any": "off",
      // Disable Tailwind gradient warnings
      "tailwindcss/no-custom-classname": "off",
    },
  },
]);

export default eslintConfig;
