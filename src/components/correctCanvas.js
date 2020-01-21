export default function correctCanvas(canvas) {
  correctCanvasSizetoCssSpecification(canvas);
}

function correctCanvasSizetoCssSpecification(canvas) {
  canvas.width = Math.floor(
    getNumberFromPxSize(window.getComputedStyle(canvas).width)
  );
  canvas.height = Math.floor(
    getNumberFromPxSize(window.getComputedStyle(canvas).height)
  );
}

function getNumberFromPxSize(pxSize) {
  return Number(pxSize.replace(/px/, ''));
}