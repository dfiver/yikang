var webpack = require('webpack');
var path = require('path');

module.exports = {
	devServer: {
		historyApiFallback: true,
	},
	context: __dirname + '/src',
	entry: "./js/index.js",
	devtool: "source-map", // 为了可以在控制台跟踪到自己的代码位置，精确到行
	module: {
		loaders: [{
			test: require.resolve('jquery'),
			loader: 'expose-loader?jQuery!expose-loader?$'
		}, {
			test: /\.js?$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['stage-3','react'],
				plugins: ['react-html-attrs'],
			}
		}, {
			test: /\.css?$/,
			loader: 'style-loader!css-loader'
		}]
	},
	output: {
		path: __dirname + "/src/",
		filename: "bundle.js"
	}
};