const HEXO_EXCERPT_DELIMITOR = "<+++>";

module.exports = function() {
	function locator(value, fromIndex) {
		return value.indexOf(HEXO_EXCERPT_DELIMITOR, fromIndex);
	}

	function inlineTokenizer(eat, value, silent) {
		if(value.indexOf(HEXO_EXCERPT_DELIMITOR) === -1) return;
		if(silent) return true;

		return eat(HEXO_EXCERPT_DELIMITOR)({
			type: "excerptDelimitor"
		});
	}

	inlineTokenizer.locator = locator;

	const Parser = this.Parser;

	// Inject inlineTokenizer
	const inlineTokenizers = Parser.prototype.inlineTokenizers;
	const inlineMethods = Parser.prototype.inlineMethods;
	inlineTokenizers.hexoMore = inlineTokenizer;
	inlineMethods.splice(inlineMethods.indexOf("text"), 0, "hexoMore");
};
