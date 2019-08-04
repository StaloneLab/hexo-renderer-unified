/* global hexo */

"use strict";

const unified = require("unified");
const markdown = require("remark-parse");
const remarkHexoMore = require("./utils/rehype-hexo-more");
const remarkMath = require("remark-math");
const remark2rehype = require("remark-rehype");
const highlight = require("rehype-highlight");
const rehypeMath = require("rehype-katex");
const rehypeLineNumbers = require("./utils/rehype-line-numbers");
const htmlFormat = require("rehype-format");
const html = require("rehype-stringify");
const hexoNbsp = require("./utils/hexo-add-nbsp");

const config = Object.assign({
	gfm: true,
	pedantic: false,
	commonmark: false,
	footnotes: true,
	math: false,
	code: false,
	code_ln: false,
	add_nbsp: false,
}, hexo.config.unified);

const engine = unified()
	.use(markdown, {
		gfm: config.gfm,
		commonmark: config.commonmark,
		pedantic: config.pedantic,
		footnotes: config.footnotes,
	})
	.use(remarkHexoMore);

if(config.math) engine.use(remarkMath);

engine.use(remark2rehype, { allowDangerousHTML: true, handlers: { excerptDelimitor: remark2rehypeHexoMoreHandler } });

if(config.math) engine.use(rehypeMath);

if(config.code && config.code_ln) engine.use(rehypeLineNumbers);

if(config.code) engine.use(highlight, { ignoreMissing: true });

engine.use(htmlFormat)
	.use(html);

function renderer(data) {
	return String(engine.processSync(data.text));
}

function remark2rehypeHexoMoreHandler(h, node) {
	const newNode = h(node);
	newNode.type = "comment";
	newNode.value = "more";

	delete newNode.tagName;

	return newNode;
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
