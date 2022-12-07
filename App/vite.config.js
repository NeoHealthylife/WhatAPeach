import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      //se notifica al user que hay una versión nueva de la app
      registerType: "prompt",
      injectRegister: "auto",
      // devOptions: {
      //   enabled: true,
      // },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Healthy life",
        description: "PWA que te ayudará a tener una vida más saludable",
        theme_color: "orange",
        start_url: "https://paginadeinicio.app/?mode=pwa",
        icons: [
          //completar cuando tengamos el front y los logos
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo2.png",
            sizes: "512x512",
            type: "image2/png",
          },
        ],
        categories: ["fitness", "food", "health", "lifestyle", "sports"],
        dir: "ltr",
        display_override: ["standalone", "fullscreen"],
        display: "standalone",
        //completar
        background_color: "",
        lang: "es-Es",
        orientacion: "any",
        prefer_related_application: false,
        scope: "/",
        shortcuts: {
          //investigar donde se pondría el shortcut en nuestra app
          name: "Ir a tus retos actuales",
          short_name: "retos",
          description: "ve directamente a tus retos",
          url: "https://",
          icons: "",
        },
      },
    }),
  ],
});
