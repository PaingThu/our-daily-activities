import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Tell Vite that the "root" of your website is the public folder
  base: './',
  root: 'public',

  build: {
    // Since root is 'public', we need to tell it to output 
    // the build to '../dist' (one level up)
    outDir: '../dist',
    
    // Clean the dist folder before each build
    emptyOutDir: true,

    rollupOptions: {
      // List every HTML file that serves as a "door" to your JS
      input: {
        main: resolve(__dirname, 'public/index.html'),
        admin: resolve(__dirname, 'public/admin/index.html'),
        'admin/login': resolve(__dirname, 'public/admin/login/index.html'),
        // Add more here, e.g., login: resolve(__dirname, 'public/login.html')
      },
    },
  },
});