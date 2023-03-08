import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteEslint from 'vite-plugin-eslint';
import viteStylelink from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteEslint(),
		viteStylelink({
			exclude: ['node_modules'],
			fix: true
		})
	],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
	}
});
