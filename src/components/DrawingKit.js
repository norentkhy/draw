import palettes from 'nice-color-palettes';

export default class DrawingKit {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.palette = palettes[0];

    this.selectRectanglesTool();
    this.selectColor(this.palette[0]);
  }

  selectRectanglesTool() {
    this.useTool = this.drawRectangles;
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  getSelectedTool() {
    const drawingContext = this.getDrawingContext();

    const currentTool = {
      drawingContext,
      use(positions) {
        const previousContext = this.getDrawingContext();
        this.setContext(drawingContext);
        this.useTool(positions);
        this.setContext(previousContext);
      }
    }
    return currentTool;
  }

  getDrawingContext() {
    const currentContext = {
      fillStyle: this.context.fillStyle,
    };
    return currentContext;
  }

  setContext(contextChanges) {
    for (const key in contextChanges) {
      this.context[key] = contextChanges[key];
    }
  }

  drawRectangles(positions, size = [3, 3]) {
    positions.forEach(position => this.drawRectangle.call(this, position));
  }

  drawRectangle(position, size = [3, 3]) {
    this.context.fillStyle = "#FF0000";

    const topLeftCorner = getTopLeftCornerFromPositionAndSize(
      position,
      size
    );
    this.context.fillRect(...topLeftCorner, ...size);
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