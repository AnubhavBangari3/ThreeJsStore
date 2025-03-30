import { defineConfig } from "vite";

export default defineConfig({
  root: "public", // Serve from 'public' folder
  server: {
    host: true, // Enables access from other devices
    port: 5173, // You can change the port if needed
  },
});
