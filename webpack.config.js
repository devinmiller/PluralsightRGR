module.exports = {
	entry: './app/app.jsx',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js?/, 
			exclude: /(node_modules)/, 
			loader: 'babel',
			query: { 
				presets: ['react', 'es2015']
			}
		}]
	},
	resolve: {
    	extensions: ['', '.js', '.jsx'] 
 	}
};