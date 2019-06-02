/* global hexo */

'use strict';

const unified = require("unified");
const markdown = require("remark-parse");
const remarkMath = require("remark-math");
const remark2rehype = require("remark-rehype");
const highlight = require("rehype-highlight");
const rehypeMath = require("rehype-katex");
const htmlFormat = require("rehype-format");
const html = require("rehype-stringify");

const engine = unified()
	.use(markdown, { gfm: true, commonmark: false, pedantic: false })
	.use(remarkMath)
	.use(remark2rehype, { allowDangerousHTML: true })
	.use(highlight, { ignoreMissing: true })
	.use(rehypeMath)
	.use(html)
	.use(htmlFormat);

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