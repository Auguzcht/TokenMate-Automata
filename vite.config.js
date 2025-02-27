import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/TokenMate/',
  
  assetsInclude: ['**/*.jff', '**/*.xml'],
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    publicDir: 'public',
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/jff|xml/i.test(extType)) {
            return `assets/automata/[name]-[hash][extname]`;
          } else if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  
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

  resolve: {
    alias: {
      '@': '/src',
      '@automata': '/src/automata',
      '@assets': '/src/assets'
    }
  }
})
