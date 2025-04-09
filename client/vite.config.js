import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows external access (for VM, WSL, etc.)
    port: 5173, // Ensure this is free, or change if needed
    strictPort: true, // Prevents automatic port switching
    hmr: {
      clientPort: 5173, // Ensure HMR connects correctly
    },
  },
});
