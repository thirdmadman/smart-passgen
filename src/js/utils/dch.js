export default function dch(tagName = 'div', classList = [], content = '', childNodes = []) {
  const node = document.createElement(tagName);
  if (classList.length) {
    node.classList.add(...classList);
  }
  if (content.length) {
    node.innerHTML = content;
  }
  if (childNodes.length) {
    node.append(...childNodes);
  }
  return node;
}
