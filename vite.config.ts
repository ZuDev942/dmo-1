import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({})],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#00904a',
        },
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `
            @import "./src/assets/styles/common/_variable.scss";
          `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
