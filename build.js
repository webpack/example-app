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
run("node ./node_modules/webpack/bin/webpack --no-colors --script-src-prefix js/[hash]/ lib/client.js js/[hash]/web.js", function(output) {
	// Extract Hash (with --json it would be easier output.hash)
	var pos = output.indexOf("Hash: ");
	var hash = "ERROR";
	if(pos != -1) {
		hash = output.substring(pos+6);
		pos = hash.indexOf("\n");
		if(pos != -1) {
			hash = hash.substring(0, pos);
		} else hash = "ERROR";
	}
	console.log("compiling index.jade...");
	require("fs").writeFile("index.html", require("./index.jade")({output: output, hash: hash}), "utf-8", function(err) {
		console.log("Ok");
	});
});