/* global hexo */

'use strict';

const unified = require("unified");
const markdown = require("remark-parse");
const remark2rehype = require("remark-rehype");
const htmlFormat = require("rehype-format");
const html = require("rehype-stringify");

const engine = unified()
	.use(markdown)
	.use(remark2rehype)
	.use(htmlFormat)
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