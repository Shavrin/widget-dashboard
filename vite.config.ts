import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import stylelint from "vite-plugin-stylelint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), stylelint()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    root: "src",
  },
});
