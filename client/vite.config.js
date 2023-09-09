import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000', // Replace with your backend server URL
        changeOrigin: true,
      },
    },
  }, // the server option here has been given by the developer to avoid cors policy in development
});
