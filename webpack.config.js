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
		loaders: [
			{ test: /\.json$/,   loader: "json-loader" },
			{ test: /\.coffee$/, loader: "coffee-loader" },
			{ test: /\.css$/,    loader: "style-loader!css-loader" },
			{ test: /\.less$/,   loader: "style-loader!css-loader!less-loader" },
			{ test: /\.jade$/,   loader: "jade-loader?self" },
			{ test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000&minetype=image/png" },
			{ test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000&minetype=image/jpg" },
			{ test: /\.gif$/,    loader: "url-loader?prefix=img/&limit=5000&minetype=image/gif" },
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&minetype=application/font-woff" }
		],
		preLoaders: [
			{
				test: /\.js$/,
				include: pathToRegExp(path.join(__dirname, "app")),
				loader: "jshint-loader"
			}
		]
	},
	resolve: {
		root: path.join(__dirname, "jam")
	},
	console: true,
	cache: true,
	amd: { jQuery: true },
	optimize: {
		// minChunkSize: 10000, // we don't want this for demo purposes
		maxChunks: 20,
	},
	plugins: [
	]
};
function escapeRegExpString(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); }
function pathToRegExp(p) { return new RegExp("^" + escapeRegExpString(p)); }