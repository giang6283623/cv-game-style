import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  base: "/",
  build: {
    assetsInlineLimit: 0, // Disable inlining of assets
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep the original folder structure for PNG files
          // Use 'names' array instead of deprecated 'name' property
          const fileName = assetInfo.names?.[0] || '';
          if (fileName && fileName.endsWith(".png")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    fs: {
      allow: [".", "./assets"],
    },
  },
});
