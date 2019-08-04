const visit = require("unist-util-visit");

const CHAR_LIST = [
	":",
	";",
	"?",
	"!",
];

const SPACE = "\\s";
const NBSP = "\u00A0";

module.exports = function() {
	const regex = regexFactory(CHAR_LIST);

	function transformer(tree) {
		visit(tree, "text", visitor);
	}

	function visitor(node, index, parent) {
		if(node.type !== "text") return;

		node.value = node.value.replace(regex, (v) => {
			return NBSP + v[1];
		});
	}

	function regexFactory(list) {
		let regexStr = SPACE + "(";

		for(let c = 0; c < list.length; c++) {
			regexStr += "\\" + list[c] + "|";
		}

		regexStr = regexStr.slice(0, -1) + ")";
		const regex = new RegExp(regexStr, "g");

		return regex;
	}

	return transformer;
};
