const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devtool: 'inline-source-map',
	target: 'electron-renderer',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, /public/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [[
							'@babel/preset-env', {
								targets: {
									esmodules: true
								}
							}],
							'@babel/preset-react']
					}
				}
			},
			{
				test: [/\.s[ac]ss$/i, /\.css$/i],
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg|ttf)$/i,
				type: 'asset/resource',
			}
		]
	},
	resolve: {
		extensions: ['.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
};
