/* global hexo */

"use strict";

const unified = require("unified");
const markdown = require("remark-parse");
const remarkHtmlComments = require("./utils/remark-html-comments");
const remarkMath = require("remark-math");
const remark2rehype = require("remark-rehype");
const highlight = require("rehype-highlight");
const rehypeMath = require("rehype-katex");
const rehypeLineNumbers = require("./utils/rehype-line-numbers");
const htmlFormat = require("rehype-format");
const html = require("rehype-stringify");
const hexoNbsp = require("./utils/hexo-add-nbsp");

const createWrapper = require("./utils/create-wrapper");
const visit = require("unist-util-visit");

const config = Object.assign({
	gfm: true,
	pedantic: false,
	commonmark: false,
	footnotes: true,
	math: false,
	code: false,
	code_ln: false,
	add_nbsp: false,
	titles_inc: 0
}, hexo.config.unified);

const wrappers = {
	table: [
		createWrapper("table", "div", ["table-wrapper"])
	]
};

const engine = unified()
	.use(markdown, {
		gfm: config.gfm,
		commonmark: config.commonmark,
		pedantic: config.pedantic,
		footnotes: config.footnotes,
	})
	.use(() => (tree) => {
		visit(tree, "heading", (node) => {
			node.depth += config.titles_inc;

			if(node.depth > 6) {
				node.depth = 6;
			}
		});
	})
	.use(remarkHtmlComments);

if(config.math) engine.use(remarkMath);

engine.use(remark2rehype, { allowDangerousHTML: true, handlers: {
	comments: function(_, node) {
		return {
			type: "comment",
			value: node.value
		}
	}
}});

if(config.math) engine.use(rehypeMath);

if(config.code && config.code_ln) engine.use(rehypeLineNumbers);

if(config.code) engine.use(highlight, { ignoreMissing: true });

engine.use(htmlFormat)
	.use(() => (tree) => {
		Object.keys(wrappers).forEach(nodeName =>
			wrappers[nodeName].forEach(wrapper => {
				visit(tree, wrapper);
			}))
	})
	.use(html);

function renderer(data) {
	return String(engine.processSync(data.text));
}

if(typeof hexo !== "undefined") {
	hexo.extend.renderer.register("md", "html", renderer, true);
	hexo.extend.renderer.register("markdown", "html", renderer, true);
	hexo.extend.renderer.register("mkd", "html", renderer, true);
	hexo.extend.renderer.register("mkdn", "html", renderer, true);
	hexo.extend.renderer.register("mdwn", "html", renderer, true);
	hexo.extend.renderer.register("mdtxt", "html", renderer, true);
	hexo.extend.renderer.register("mdtext", "html", renderer, true);

	if(config.add_nbsp) hexoNbsp(hexo);
}

module.exports = renderer;
