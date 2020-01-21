export default class Drawer {
  constructor(canvas, drawTool) {
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.drawTool = drawTool;

      this.setCanvasSizeToElementCssSize();
      this.drawRedCornerRectangles();

      this.nextId = 1;
      this.currentTool = { 
        use: this.drawRectangle,
      };
      this.currentAction = {};
      this.previousActions = [{positions: [], id: 0}];
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

  mainClickEvent(event) {
    const drawAction = this.drawRectangle;

    const position = this.getPosition(event)
    const size = [10, 10];

    drawAction.call(this, position, size);
  }

  altClickEvent(event) {
    alert("alternative clickEvent");
  }

  undo() {
    const id = this.nextId - 1;
    if ( id > 1) {
      this.jumpTo(this.nextId - 2);
    } else {
      console.log('nothing to undo');
    }
  }

  redo() {
    if (this.nextId <= this.previousActions.length) {
      this.jumpTo(this.nextId);
    } else {
      console.log('nothing to redo');
    }
  }

  jumpTo(id) {
    this.nextId = id + 1;
    this.redrawId(id);
  }
  
  startDrawingAction(event) {
    this.previousActions = this.previousActions.slice(0, this.nextId);

    this.currentAction = {};
    this.currentAction.positions = [this.getPosition(event)];
    this.currentAction.tool = this.currentTool;
    this.currentAction.id = this.nextId;

    this.redrawCurrent();
  }

  continueDrawingAction(event) {
    this.currentAction.positions.push(this.getPosition(event));
    this.redrawCurrent();
  }
  
  finishDrawingAction(event) {
    this.nextId++;
    this.previousActions.push(this.currentAction);
  }

  cancelDrawingAction(event) {
    this.previousActions.pop();
    this.redrawCurrent();
  }

  redrawCurrent() {
    this.redraw([...this.previousActions, this.currentAction]);
  }

  redrawId(id) {
    this.redraw(this.previousActions.slice(0, id + 1));
  }

  redraw(actions) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    actions.forEach((action) => this.draw(action));
  }

  draw(action) {
    action.positions.forEach(
      position => action.tool.use.call(this, position)
    );
  }
  
  getPosition(event) {
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

  drawRectangles(positions, size = [3, 3]) {
    positions.forEach(position => this.drawRectangle.call(this, position));
  }

  drawRectangle(position, size = [3, 3]) {
    this.saveCurrentContextStyles("fillStyle");
    this.context.fillStyle = "#FF0000";

    const topLeftCorner = getTopLeftCornerFromPositionAndSize(
      position,
      size
    );
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