import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const clientPath = "src/client";
const buildPath = "dist/client";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.join(__dirname, `${clientPath}`),
  base: `./`,
  publicDir: path.join(__dirname, `${clientPath}/public`),
  build: {
    outDir: path.join(__dirname, `${buildPath}`),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, `src`),
    },
  },
  server: {
    port: 8000,
    proxy: {
      "^/(api)/.*": {
        target: "http://localhost:8000",
      },
    },
  },
});
