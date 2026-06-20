import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Mirror the `@/*` path alias from tsconfig.json so unit tests can import
// modules the same way app code does.
export default defineConfig({
  test: {
    environment: "node",
    // Tests live in the top-level `tests/` folder, mirroring the source layout.
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
