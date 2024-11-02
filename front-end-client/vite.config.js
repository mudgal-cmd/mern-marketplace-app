import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 5001,
    proxy:{
      "/api":{
        target:"https://mern-marketplace-app-1.onrender.com",
        secure: false
      }
    }
  },
  plugins: [react()],

})
