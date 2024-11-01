import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
<<<<<<< HEAD
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
=======

export default defineConfig({
  plugins: [vue()],
>>>>>>> 365e395c2f79193004d3bb41c9a6d1b80a512d65
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})