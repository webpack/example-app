require = require("webpack/require-polyfill")(require.valueOf());

var cp = require('child_process');
function run(cmd, cb) {
	cp.exec(cmd, function (error, stdout, stderr) {
		console.log(stdout);
		if(error) console.error(error);
		console.error(stderr);
		cb(stdout);
	});
}

console.log("compiling javascript...");
run("node ./node_modules/webpack/bin/webpack --colors --script-src-prefix js/ lib/client.js js/web.js", function() {
	console.log("compiling index.jade...");
	require("fs").writeFile("index.html", require("./index.jade")({}), "utf-8", function(err) {
		console.log("Ok");
	});
});