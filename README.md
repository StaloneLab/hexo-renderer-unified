# hexo-renderer-unified

[![NPM version](https://badge.fury.io/js/hexo-renderer-unified.svg)](https://www.npmjs.com/package/hexo-renderer-unified)

Markdown renderer plugin for Hexo - based on [unified](https://github.com/unifiedjs/unified)

## Installation

```bash
npm install hexo-renderer-unified --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
unified:
  gfm: true
  pedantic: false
  commonmark: false
  footnotes: true
  math: false
  code: false
  code_ln: false
  add_nbsp: false
  titles_inc: 0
```

- **gfm** - Enable [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown)
- **pedantic** - Conform to obscure parts of `markdown.pl` as much as possible.
- **commonmark** - Comply with the [CommonMark](https://spec.commonmark.org/current/) specification.
- **footnotes** - Enable footnotes at the end of the article
- **math** - Add TeX parsing and rendering using [KaTeX](https://katex.org/).
- **code** - Enable code highlighting. *Please disable code highlighting in Hexo if you want this package to highlight code.*
- **code_ln** - Add line numbering in front of highlighted code.
- **add_nbsp** - Replace spaces with non-breaking spaces where necessary.
- **titles_inc** - Shift all headers by a factor. Mainly intended for SEO.

## Extras

This plugins adds a simple syntax `<+++>` to separate abstract from content if you want to generate and RSS feed. If you don't need it, just don't use it.
