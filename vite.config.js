import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss()
  ],
  preview: {
    port: 5050,
    strictPort: true,
    origin: 'http://0.0.0.0:5050'
  },
  server: {
    port: 5050,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:5050'
    
  },
})
