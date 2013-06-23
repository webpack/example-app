module.exports = function(content) {
	var version = this.options.fakeUpdateVersion;
	var versions = content.split("\n------");
	var current = "";
	while(!current) {
		current = versions[version--];
		if(current) current = current.replace(/^[\r\n]*|[\r\n]*$/g, "");
	}
	this.cacheable();
	return current;
}