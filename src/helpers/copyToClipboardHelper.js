export default function copyToClipboard(alt, src) {
  const markdownString = `![${alt}](${src})`;
  const el = document.createElement('textarea');
  el.value = markdownString;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
