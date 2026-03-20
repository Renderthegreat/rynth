export default {
    entry: './dist/index.js',
    output: {
        filename: './bundle.js',
    },
	 
	mode: 'production',
	optimization: {
		// minimize: false
	},
	// devtool: 'source-map',
};
