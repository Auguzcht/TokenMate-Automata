import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/TokenMate/',
  
  // Add assetsInclude for JFF files
  assetsInclude: ['**/*.jff', '**/*.xml'],
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    
    // Configure public directory handling
    publicDir: 'public',
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/jff|xml/i.test(extType)) {
            extType = 'automata';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
  },
  
  // Add server configuration for better development experience
  server: {
    watch: {
      usePolling: true,
      include: ['**/*.jff', '**/*.xml']
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  },

  // Add resolve aliases for easier imports
  resolve: {
    alias: {
      '@': '/src',
      '@automata': '/src/automata'
    }
  }
})
