module.exports = function(lib) {
	return "module.exports = eval(" + JSON.stringify(lib + "; return THREE") + ")";
}
module.exports.seperable = true;