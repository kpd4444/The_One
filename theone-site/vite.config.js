import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'node:process'

function previewRobotsPlugin() {
  return {
    name: 'preview-robots',
    transformIndexHtml(html) {
      if (env.VERCEL_ENV === 'production') return html
      return html.replace(
        '<meta name="robots" content="index,follow" />',
        '<meta name="robots" content="noindex,nofollow" />',
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), previewRobotsPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          router: ["react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
