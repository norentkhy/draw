export default class MouseController {
  constructor({
    respondToLeftDown, 
    respondToLeftMove,
    respondToLeftUp,
    respondToRightDown,
    respondToRightMove,
    respondToRightUp,
    cancelCurrentAction,
  }) {
    this.respondToLeftDown = respondToLeftDown;
    this.respondToLeftMove = respondToLeftMove;
    this.respondToLeftUp = respondToLeftUp;
    this.respondToRightDown = respondToRightDown;
    this.respondToRightMove = respondToRightMove;
    this.respondToRightUp = respondToRightUp;
    this.cancelCurrentAction = cancelCurrentAction;

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