var webpack = require("webpack");
var path = require("path");

module.exports = {
	context: __dirname,
	entry: "./app/app.js",
	output: {
		path: path.join(__dirname, "assets"),
		publicPath: "assets/", // relative path for github pages
		filename: "main.js", // no hash in main.js because index.html is a static page
		chunkFilename: "[hash]/js/[id].js"
	},
	module: {
		rules: [
			{ test: /\.json$/, loader: "json-loader" },
			{ test: /\.coffee$/, loader: "coffee-loader" },
			{ test: /\.css$/,  loader: "style-loader!css-loader" },
      { test: /\.less$/, use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
      },
			{ test: /\.pug$/,  loader: "pug-loader" },
			{ test: /\.png$/,  loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.jpg$/,  loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.gif$/,  loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.eot$/,  loader: "file-loader?prefix=font/" },
			{ test: /\.ttf$/,  loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,  loader: "file-loader?prefix=font/" },
		],
	},
  resolve: {
      alias: {
          jquery: "jquery/src/jquery"
      }
  },
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 })
	]
};