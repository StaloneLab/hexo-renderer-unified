/* global hexo */

'use strict';

const unified = require("unified");
const markdown = require("remark-parse");
const remarkMath = require("remark-math");
const remark2rehype = require("remark-rehype");
const highlight = require("rehype-highlight");
const rehypeMath = require("rehype-katex");
const rehypeLineNumbers = require("./utils/rehype-line-numbers");
const htmlFormat = require("rehype-format");
const html = require("rehype-stringify");

const config = Object.assign({
	math: false,
	code: true,
	code_ln: false,
}, hexo.config.unified);

const engine = unified()
	.use(markdown, { gfm: true, commonmark: false, pedantic: false });

if(config.math) engine.use(remarkMath);

engine.use(remark2rehype, { allowDangerousHTML: true });

if(config.math) engine.use(rehypeMath);

if(config.code && config.code_ln) engine.use(rehypeLineNumbers);

if(config.code) engine.use(highlight, { ignoreMissing: true });
	
engine.use(htmlFormat)
	.use(html);

function renderer(data, options) {
	return String(engine.processSync(data.text));
}

hexo.extend.renderer.register("md", "html", renderer, true);
hexo.extend.renderer.register("markdown", "html", renderer, true);
hexo.extend.renderer.register("mkd", "html", renderer, true);
hexo.extend.renderer.register("mkdn", "html", renderer, true);
hexo.extend.renderer.register("mdwn", "html", renderer, true);
hexo.extend.renderer.register("mdtxt", "html", renderer, true);
hexo.extend.renderer.register("mdtext", "html", renderer, true);