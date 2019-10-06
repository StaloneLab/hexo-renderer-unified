const HTML_COMMENT_OPEN = "<!--";
const HTML_COMMENT_CLOSE = "-->";

module.exports = function() {
	function blockTokenizer(eat, value, silent) {
        const keepEnd = value.indexOf(HTML_COMMENT_CLOSE);

        if(value.indexOf(HTML_COMMENT_OPEN) !== 0 || keepEnd === -1) return;
        if(silent) return true;
        
        const comment = value.substring(HTML_COMMENT_OPEN.length, keepEnd);

		return eat(HTML_COMMENT_OPEN + comment + HTML_COMMENT_CLOSE)({
            type: "comments",
            value: comment
		});
	}

    const Parser = this.Parser;

	// Inject blockTokenizer
	const blockTokenizers = Parser.prototype.blockTokenizers;
	const blockMethods = Parser.prototype.blockMethods;
	blockTokenizers.htmlComments = blockTokenizer;
    blockMethods.splice(blockMethods.indexOf("html"), 0, "htmlComments");
};
