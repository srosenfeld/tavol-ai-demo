import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Project Pages URL: https://srosenfeld.github.io/tavol-ai-demo/
  base: process.env.VITE_BASE ?? '/tavol-ai-demo/',
})
