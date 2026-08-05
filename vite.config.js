import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Keep the animation libraries in their own long-cache chunks.
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)/.test(id)) return 'motion'
          return undefined
        },
      },
    },
  },
})
