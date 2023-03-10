import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteEslint from 'vite-plugin-eslint';
import viteStylelink from 'vite-plugin-stylelint';
import postCssPxToRem from 'postcss-pxtorem';

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
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://106.14.223.52',
				changeOrigin: true
			},
			'/public': {
				target: 'http://106.14.223.52',
				changeOrigin: true
			}
		}
	},
	css: {
		postcss: {
			plugins: [
				postCssPxToRem({
					rootValue: 37.5,
					propList: ['*'],
					unitPrecision: 5,
					selectorBlackList: ['html'],
					replace: true,
					mediaQuery: false,
					minPixelValue: 0,
					exclude: /node_modules/i
				})
			]
		},
		preprocessorOptions: {
			scss: {
				plugins: [
					postCssPxToRem({
						rootValue: 37.5,
						propList: ['*'],
						unitPrecision: 5,
						selectorBlackList: ['html'],
						replace: true,
						mediaQuery: false,
						minPixelValue: 0,
						exclude: /node_modules/i
					})
				]
			}
		}
	}
});
