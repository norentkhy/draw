import colorPalettes from 'nice-color-palettes';

export default class DrawingKit {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.colors = colorPalettes[0];

    this.setLineTool();
    this.setToolColor(this.colors[0]);
  }

  setLineTool() {
    this.useTool = this.drawLine;
  }

  setRectanglesTool() {
    this.useTool = this.drawRectangles;
  }

  setToolColor(color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
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
    const drawingContext = {
      fillStyle: this.context.fillStyle,
      strokeStyle: this.context.strokeStyle,
    };
    return drawingContext;
  }

  setContext(contextChanges) {
    for (const key in contextChanges) {
      this.context[key] = contextChanges[key];
    }
  }

  drawLine(positions) {
    const context = this.context;

    const startPosition = positions[0];
    const remainingPositions = positions.slice(1, positions.length + 1);

    context.beginPath();
    context.moveTo(...startPosition);
    remainingPositions.forEach(position => {
      context.lineTo(...position);
    });
    context.stroke();
  }

  drawRectangles(positions, size = [3, 3]) {
    positions.forEach(position => this.drawRectangle.call(this, position));
  }

  drawRectangle(position, size = [3, 3]) {
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