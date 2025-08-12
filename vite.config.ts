import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/doc-in-a-box-ai/',  // 👈 exact repo name here
  plugins: [react()],
})
