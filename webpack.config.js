import HTMLWebpackPlugin from 'html-webpack-plugin';
import HTMLInlineScriptPlugin from 'html-inline-script-webpack-plugin';

import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
    entry: {
		main: './dist/src/index.js',
		
		hello: './dist/tests/hello.js',
	},
    output: {
        path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
    },
	 
	mode: 'development',
	optimization: {
		 minimize: false
	},
	devtool: 'source-map',

	resolve: {
		alias: {
			'rynth': path.resolve(__dirname, 'dist/src/'),
		},
	},

	plugins: [
		new HTMLWebpackPlugin({
			title: 'Hello, Rynth!',

			// template: './tests/hello.html',
			filename: 'hello.html',
			chunks: ['hello'],
		}),
		new HTMLInlineScriptPlugin(),
	],
};
