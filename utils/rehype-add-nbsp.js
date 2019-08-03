const visit = require("unist-util-visit");

const CHAR_LIST = [
	":",
	";",
	"?",
	"!",
];

const SPACE = " ";
const NBSP = "&nbsp;";

module.exports = function() {
	const regex = regexFactory(CHAR_LIST);
	console.log(regex);

	function transformer(tree) {
		console.log(tree)
		visit(tree, "element", visitor);
	}

	function visitor(node, index, parent) {
		console.log("h");
		if(node.type !== "text") return;

		console.log(node);

		node.value.replace(regex, (v) => {
			console.log(v);
			return NBSP + v;
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