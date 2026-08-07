import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ── Dev server startup ──────────────────────────────────────────────────
  // The slow first load on `npm run dev` is Vite's on-demand dependency
  // pre-bundle: the very first time the browser requests a module, esbuild
  // stops to bundle heavy deps (framer-motion, gsap) and the page hangs on
  // "[optimizer] bundling dependencies...". Listing them here makes that
  // happen once, eagerly, at server boot — so the first page hit is instant.
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap', 'gsap/ScrollTrigger', 'lenis'],
  },

  server: {
    // Transform the hero chain up front instead of waiting for the browser to
    // request each file, so the above-the-fold view is ready sooner.
    warmup: {
      clientFiles: [
        './src/main.jsx',
        './src/App.jsx',
        './src/components/Hero.jsx',
        './src/components/Navbar.jsx',
        './src/components/brand/BrandAssemble.jsx',
      ],
    },
  },

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
