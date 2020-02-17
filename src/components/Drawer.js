export default class Drawer {
  constructor(canvas, drawingKit) {
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.drawingKit = drawingKit;

      this.nextId = 1;
      this.currentAction = {};
      this.previousActions = [{positions: [], id: 0}];
  }

  undo() {
    const id = this.nextId - 1;
    if ( id >= 1) {
      this.jumpTo(id - 1);
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
    this.currentAction.tool = this.drawingKit.getSelectedTool();
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
    if (action.positions.length) {
      const useTool = action.tool.use;
      const positions = action.positions;
      useTool.call(this.drawingKit, positions);
    }
  }
  
  getPosition(event) {
    const cssWidth = getNumberFromPxSize(
      window.getComputedStyle(this.canvas).width
    );
    const cssHeight = getNumberFromPxSize(
      window.getComputedStyle(this.canvas).height
    );

    const eventX = event.type.includes("mouse")
      ? event.offsetX
      : event.touches[0].pageX - event.target.offsetLeft;

    const eventY = event.type.includes("mouse")
      ? event.offsetY
      : event.touches[0].pageY - event.target.offsetTop;
    
    return [
      (eventX * this.canvas.width) / cssWidth,
      (eventY * this.canvas.height) / cssHeight
    ];
  }
}

function getNumberFromPxSize(pxSize) {
  return Number(pxSize.replace(/px/, ''));
}