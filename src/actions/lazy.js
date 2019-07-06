export default function lazy(node, src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    node.setAttribute('src', src);
  };
}
