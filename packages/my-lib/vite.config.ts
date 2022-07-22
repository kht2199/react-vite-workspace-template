import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

const config = require('./package.json');

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: config.name,
            formats: ['es', 'umd'],
            fileName: (format) => `${config.name}.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'styled-components'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'styled-components': 'styled',
                },
            },
        },
    },
});
