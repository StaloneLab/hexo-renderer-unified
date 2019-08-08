const CHAR_LIST = [
	":",
	";",
	"?",
	"!",
	"€",
	"%"
];

const SPACE = "\\s";
const NBSP = "&nbsp;";

module.exports = function(hexo) {
	const regex = regexFactory(CHAR_LIST);

	hexo.extend.filter.register("after_post_render", (data) => {
		data.content = data.content.replace(regex, (v) => NBSP + v[1]);
		return data;
	});

	function regexFactory(list) {
		let regexStr = SPACE + "(";

		for(let c = 0; c < list.length; c++) {
			regexStr += "\\" + list[c] + "|";
		}

		regexStr = regexStr.slice(0, -1) + ")";
		const regex = new RegExp(regexStr, "g");

		return regex;
	}
};
