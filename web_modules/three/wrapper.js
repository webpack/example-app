require = require("webpack/require-polyfill")(require.valueOf());
module.exports = require("raw!./Three.min.js") + "; module.exports = THREE";