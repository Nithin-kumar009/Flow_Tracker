import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,
      // In dev, proxy /api calls to the local Express server
      // so the browser doesn't hit CORS issues
      proxy: {
        "/api": {
          target:       env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000",
          changeOrigin: true,
          secure:       false,
        },
      },
    },
    build: {
      outDir:        "dist",
      sourcemap:     false,
      rollupOptions: {
        output: {
          // Split large vendor chunks for faster page loads
          manualChunks: {
            vendor:   ["react", "react-dom"],
            recharts: ["recharts"],
          },
        },
      },
    },
  };
});