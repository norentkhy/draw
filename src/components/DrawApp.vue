<template>
  <div class="draw-app">
    <h1>{{ title }}</h1>
    <h2>history</h2>
    <div class="control-buttons">
      <button
        @click="undo"
      >undo</button>
      <button
        @click="redo"
      >redo</button>
      <ul id="draw-history">
        <li>jump to: </li>
        <li
          v-for="drawAction in drawActions"
          @mouseup.left="jumpTo(drawAction.id)"
          :key="drawAction.id"
        >
          {{drawAction.name}}
        </li>
      </ul>
    </div>
    <canvas
      id="canvas"
      @mousemove="move"
      @mousedown.left="leftDown"
      @mouseup.left="leftUp"
      @mousedown.right="rightClickOnCanvas"
      @contextmenu.prevent
    ></canvas>

  </div>
</template>

<script>
import Drawer from './Drawer.js';
import Mouse from './Mouse.js';

const drawApp = {
  name: 'drawApp',
  props: {
    title: String
  },
  data: function () {
    return {
      drawActions: [
        { name: 'action1', id: 1 },
        { name: 'action2', id: 2 }
      ]
    }
  },
  methods: {
    movingOnCanvas: (event) => (event),
    leftClickOnCanvas: (event) => drawer.mainClickEvent(event),
    rightClickOnCanvas: (event) => drawer.altClickEvent(event),
    move: (event) => mouseCanvas.move(event),
    leftDown: (event) => mouseCanvas.leftDown(event),
    leftUp: (event) => mouseCanvas.leftUp(event),
    rightDown: (event) => mouseCanvas.rightDown(event),
    rightUp: (event) => mouseCanvas.rightUp(event),
    undo: () => drawer.undo(),
    redo: () => drawer.redo(),
    jumpTo: (id) => drawer.jumpTo(id),
  }
};

let drawer;
let mouseCanvas;
window.onload = function() {
  mouseCanvas = new Mouse({
    respondToLeftDown: (event) => drawer.startDrawingAction(event),
    respondToLeftMove: (event) => drawer.continueDrawingAction(event),
    respondToLeftUp: (event) => drawer.finishDrawingAction(event),
    respondToRightDown: () => console.log('rightDown'),
    respondToRightMove: () => console.log('rightMove'),
    respondToRightUp: () => console.log('rightUp'),
    cancelCurrentAction: () => console.log('cancel'),
  })
  drawer = new Drawer(document.getElementById('canvas'));
};

export default drawApp;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.draw-app {
  height: 100%;
}

#canvas {
  height: 500px;
  width: 70%;
  border: #999 2px solid;
  background-color: #FFFFFF;
}
</style>