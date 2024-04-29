import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
dotenv.config();
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '~': "/src",
    },
  },
  define: {
    'process.env': process.env,
  },
  assetsInclude: ['src/assets/**'],
})
