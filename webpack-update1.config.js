module.exports = require("./webpack.config.js");
module.exports.output.filename = "ignored";
module.exports.recordsPath = module.exports.recordsOutputPath;
module.exports.fakeUpdateVersion = 1;
