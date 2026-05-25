import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@package": resolve(__dirname, "src/package"),
    },
  },
  build:
    mode === "lib"
      ? {
          lib: {
            entry: resolve(__dirname, "src/package/index.js"),
            name: "NovaTextEditor",
            formats: ["es", "cjs"],
            cssFileName: "styles",
            fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
          },
          rollupOptions: {
            external: ["react", "react-dom", "@tiptap/react", "@tiptap/starter-kit"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },
          cssCodeSplit: false,
        }
      : undefined,
}));
