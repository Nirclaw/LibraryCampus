import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Agrega tu variable de entorno aquí
    "process.env.MY_VARIABLE": JSON.stringify(process.env.MY_VARIABLE || ""),
  },
});
