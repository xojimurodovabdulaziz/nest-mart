import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  base: "/nest-mart/",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    // Backend ba'zi endpoint'larda (masalan /api/public/vendors) CORS
    // sarlavhasini qaytarmayapti, shu sabab brauzer to'g'ridan-to'g'ri
    // so'rovni bloklaydi ("No 'Access-Control-Allow-Origin' header").
    // Dev serverda /api'ni backendga proxy qilib, so'rovlarni "bir xil
    // origin" holatiga keltiramiz — shunda CORS tekshiruvi umuman
    // ishlamaydi. Ishlab chiqarish (production) build'ida bu proxy
    // ishlamaydi, shu sabab u yerda backend CORS sozlamasi shart.
    proxy: {
      "/api": {
        target: "https://nestmart-api-core.lovable.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})