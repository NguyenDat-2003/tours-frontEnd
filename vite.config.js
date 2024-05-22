import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // --- Cho phép Vite sử dụng dc process.env, mặc định chỉ dùng được import.meta.env
  plugins: [react()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
