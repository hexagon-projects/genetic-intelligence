import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import 'dotenv/config'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Jatidiri.app',
        short_name: 'Jatidiri.app',
        description: 'Jatidiri.app - Temukan Jatidirimu',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'jatidiri.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'jatidiri.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['chart.js/auto']
  }
})
