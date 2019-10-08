export default function textToDomElement(text, selector) {
  const container = document.createElement('div');
  container.innerHTML = text;
  return container.querySelector(selector);
}
