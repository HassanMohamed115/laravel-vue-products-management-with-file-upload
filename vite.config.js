import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue()
        
    ],
    // server: {
    //     port:3000,
    //     proxy: {
    //       '/url': {
    //         target: 'http://127.0.0.1:8000/api',
    //         changeOrigin: true,
    //         rewrite: (path) => path.replace(/^\/url/, ''),
    //       },
    //     },
    //   },
});
