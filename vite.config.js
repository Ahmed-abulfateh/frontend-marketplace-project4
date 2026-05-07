import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/index-fC-vG223.js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css' || assetInfo.name?.endsWith('.css')) {
                        return 'assets/index-rBjRCZA4.css';
                    }

                    return 'assets/[name][extname]';
                },
            },
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    plugins: [react()],
});
