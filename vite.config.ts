import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      services: path.resolve(__dirname, "./src/services"),
      utils: path.resolve(__dirname, "./src/utils"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      router: path.resolve(__dirname, "./src/router"),
      pages: path.resolve(__dirname, "./src/pages"),
      config: path.resolve(__dirname, "./src/config"),
      styles: path.resolve(__dirname, "./src/styles"),
    },
  },
});
