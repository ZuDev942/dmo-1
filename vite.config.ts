import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
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
        '@': resolve(__dirname, './src'),
      },
    },
  })
}
