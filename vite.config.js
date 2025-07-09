import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 9000, // Default is 500
    rollupOptions: {
      output: {
        // manualChunks allows you to split your code into custom chunks.
        // This is particularly useful for large third-party libraries.
        manualChunks(id) {
          // If a module belongs to 'country-state-city', put it in a separate 'vendor-csc' chunk.
          if (id.includes('node_modules/country-state-city')) {
            return 'vendor-csc';
          }
          // You can add more conditions here for other large libraries if needed.
          // For example, to put all other node_modules into a 'vendor' chunk:
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
