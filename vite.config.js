import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5050,
    strictPort: true,
    origin: 'http://0.0.0.0:5050',
  },
  preview: {
    host: '0.0.0.0',
    port: 5050,
    strictPort: true,
    origin: 'http://0.0.0.0:5050',
  }
})