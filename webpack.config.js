import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
	entry: {
		main: './dist/src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	
	mode: 'production',
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
	],
};
