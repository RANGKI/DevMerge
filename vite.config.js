import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // 👈 add this
import tailwindcss from '@tailwindcss/vite';
import path from "path"

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(), // 👈 enable React support
        tailwindcss(),
    ],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./resources/js"),
    },
  },
});