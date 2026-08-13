import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        obras: resolve(__dirname, 'obras.html'),
        sobreMi: resolve(__dirname, 'sobre-mi.html'),
      },
    },
  },
})
