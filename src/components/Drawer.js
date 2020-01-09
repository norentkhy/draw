export default class Drawer {
  constructor() {
      this.canvas = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");

      this.setCanvasSizeToElementCssSize();
      this.drawRedCornerRectangles();

      this.oldContextStyles = [];
  }

  setCanvasSizeToElementCssSize() {
    this.canvas.width = Math.floor(
      getNumberFromPxSize(window.getComputedStyle(this.canvas).width)
    );
    this.canvas.height = Math.floor(
      getNumberFromPxSize(window.getComputedStyle(this.canvas).height)
    );
  }

  drawRedCornerRectangles() {
    const previousFillStyle = this.context.fillStyle;

    const size = [3, 3];
    const corner = getCorner.call(this, size);

    this.context.fillStyle = "#ff0000";
    for (const position in corner) {
      this.context.fillRect(...corner[position], ...size);
    }
    this.context.fillRect(0, 0, 3, 3);

    this.context.fillStyle = previousFillStyle;

    function getCorner(size) {
      const left = 0;
      const right = this.canvas.width - size[0];
      const top = 0;
      const bottom = this.canvas.height - size[1];

      const corner = {};
      corner.leftTop = [left, top];
      corner.leftBottom = [left, bottom];
      corner.rightTop = [right, top];
      corner.rightBottom = [right, bottom];

      return corner;
    }
  }

  drawClickEvent(event) {
    const drawAction = this.drawRectangle;

    const position = this.getPositionFromEvent(event)
    const size = [10, 10];

    drawAction.call(this, position, size);
  }
  
  getPositionFromEvent(event) {
    const cssWidth = getNumberFromPxSize(
      window.getComputedStyle(this.canvas).width
    );
    const cssHeight = getNumberFromPxSize(
      window.getComputedStyle(this.canvas).height
    );
    return [
      (event.offsetX * this.canvas.width) / cssWidth,
      (event.offsetY * this.canvas.height) / cssHeight
    ];
  }

  drawRectangle(position, size) {
    const topLeftCorner = getTopLeftCornerFromPositionAndSize(
      position,
      size
    );

    this.saveCurrentContextStyles("fillStyle");
    this.context.fillStyle = "#FF0000";
    this.context.fillRect(...topLeftCorner, ...size);
    this.recoverContextStyles("fillStyle");
  }

  saveCurrentContextStyles(styles) {
    const mostRecentContextStyle = {};
    for (const style of styles) {
      mostRecentContextStyle[style] = this.context[style];
    }
    this.oldContextStyles.push(mostRecentContextStyle);
  }

  recoverContextStyles() {
    const newContextStyle = this.oldContextStyles.pop();
    for (const style in newContextStyle) {
      this.context[style] = newContextStyle[style];
    }
  }
}

function getTopLeftCornerFromPositionAndSize(position, size) {
  const offset = executeElementaryFunctionOnElementsOfArrays(size => size / 2, [
    size
  ]);
  return executeElementaryFunctionOnElementsOfArrays(
    (position, offset) => position - offset,
    [position, offset]
  );
}

function executeElementaryFunctionOnElementsOfArrays(
  elementaryFunction,
  inputArrays
) {
  return inputArrays[0].reduce((...[outputArray, , index]) => {
    const elementaryInput = inputArrays.map(inputArray => inputArray[index]);
    return [...outputArray, elementaryFunction(...elementaryInput)];
  }, []);
}

function getNumberFromPxSize(pxSize) {
  return Number(pxSize.replace(/px/, ""));
}