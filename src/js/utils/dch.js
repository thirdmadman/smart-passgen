export default function dch(tagName = 'div', classList = [''], content = '', ...childNodes) {
  const node = document.createElement(tagName);
  if (classList.length > 0) {
    node.classList.add(...classList);
  }
  if (content.length > 0) {
    node.innerHTML = content;
  }
  if (childNodes.length > 0) {
    childNodes.forEach((el) => node.append(el));
  }
  return node;
}
