import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoPlugin } from './seo/plugin.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Split vendor code so page navigation reuses cached chunks instead of
    // re-downloading one large bundle (better LCP/TBT on repeat views).
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('contentful') || id.includes('axios')) return 'contentful'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'react'
          }
          if (id.includes('@radix-ui') || id.includes('lucide-react')) return 'ui'
          return 'vendor'
        },
      },
    },
  },
})
