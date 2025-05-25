import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import * as dotenv from 'dotenv'

dotenv.config()

const host = process.env.VITE_BASE_URL

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
  },
  server: {
    port: 5050,
    strictPort: true,
    host: true,
    origin: 'http://${host}',
    
  },
})
