export default class MouseController {
  constructor(drawer) {
    this.respondToLeftDown = function(event) { drawer.startDrawingAction(event) };
    this.respondToLeftMove = function(event) { drawer.continueDrawingAction(event) };
    this.respondToLeftUp = function(event) { drawer.finishDrawingAction(event) };
    this.respondToRightDown = function() { console.log('rightDown') };
    this.respondToRightMove = function() { console.log('rightMove') };
    this.respondToRightUp = function() { console.log('rightUp') };
    this.cancelCurrentAction = function() { console.log('cancel') };

    this.setAllInactive();
  }

  setAllInactive() {
    this.leftActive = false;
    this.rightActive = false;
  }

  leftDown(event) {
    if (!this.rightActive) {
      this.leftActive = true;
      this.respondToLeftDown(event);
    } else {
      this.setAllInactive();
      this.cancelCurrentAction();
    }
  }

  leftUp(event) {
    this.setAllInactive();
    this.respondToLeftUp();
  }

  rightDown(event) {
    if (!this.leftActive) {
      this.rightActive = true;
      this.respondToRightDown(event);
    } else {
      this.setAllInactive();
      this.cancelCurrentAction();
    }
  }

  rightUp(event) {
    this.setAllInactive();
    this.respondToRightUp();
  }

  move(event) {
    if (this.leftActive) {
      this.respondToLeftMove(event);
    } else if (this.rightActive) {
      this.respondToRightMove(event);
    }
  }
}