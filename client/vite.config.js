import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // adding proxy
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        seccure:false,
      }
    }
  },
  plugins: [react()],
})
