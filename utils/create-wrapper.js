/* Once again, thanks to vhf for this package,
   originating from https://github.com/zestedesavoir/zmarkdown/blob/master/packages/zmarkdown/utils/wrappers.js */

/* Changes (minor) have been made to remove an unneeded dependency */

module.exports = createWrapper

const allowAll = () => true

function createWrapper (tagToWrap, wrapInTags, classes, filter = allowAll) {
  if (!Array.isArray(wrapInTags)) wrapInTags = [wrapInTags]
  if (!Array.isArray(classes)) classes = [classes]
  
  if (!wrapInTags.length === classes.length) return;

  const visitor = (node, index, parent) => {
    if (node.type === 'element' && node.tagName === tagToWrap) {
      if ((filter && filter(node)) && !node.__wrapped) {
        wrap({wrapInTags, classes}, {node, index, parent})
      }
    }
  }

  return visitor
}

function wrap ({wrapInTags, classes}, {node, index, parent}) {
  let wrapped = node
  for (let i = 0; i < wrapInTags.length; i++) {
    node.__wrapped = true
    wrapped = {
      type: 'element',
      tagName: wrapInTags[i] || 'div',
      properties: {
        class: classes[i] || [],
      },
      children: [wrapped],
    }
  }
  parent.children.splice(index, 1, wrapped)
}
