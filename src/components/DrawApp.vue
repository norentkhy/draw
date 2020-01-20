<template>
  <div class="draw-app">
    <h1 v-if="title">{{ title }}</h1>
    <div class="control-buttons">
      <button
        @click="undo"
      >undo</button>
      <button
        @click="redo"
      >redo</button>
      <ul 
        id="draw-history"
        v-if="Object.keys(drawer)"
      >
        <li>jump to: </li>
        <li
          v-for="action in drawer.previousActions"
          @mouseup.left="jumpTo(action.id)"
          :key="action.id"
        >
          {{action.id}}
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
import DrawTool from './DrawTool.js';
import Drawer from './Drawer.js';
import MouseController from './MouseController.js';

const drawApp = {
  name: 'drawApp',
  props: {
    title: String
  },

  data: function () {
    return {
      drawer: {},
      mouseController: {},
    };
  },

  mounted() {
    const drawTool = new DrawTool();
    const drawer = new Drawer(document.getElementById('canvas'), drawTool);
    const mouseController = new MouseController({
      respondToLeftDown: function(event) { 
        drawer.startDrawingAction(event) 
      },
      respondToLeftMove: function(event) { drawer.continueDrawingAction(event) },
      respondToLeftUp: function(event) { drawer.finishDrawingAction(event) },
      respondToRightDown: function() { console.log('rightDown') },
      respondToRightMove: function() { console.log('rightMove') },
      respondToRightUp: function() { console.log('rightUp') },
      cancelCurrentAction: function() { console.log('cancel') },
    });

    this.drawer = drawer;
    this.mouseController = mouseController;
  },
  
  methods: {
    move: function(event) { this.mouseController.move(event); },
    leftDown: function(event) {
      this.mouseController.leftDown(event);
    },
    leftUp: function(event) { 
      this.mouseController.leftUp(event);
      const previousActions = this.drawer.previousActions;
      const lastAction = previousActions[previousActions.length - 1];
    },
    rightDown: function(event) { this.mouseController.rightDown(event); },
    rightUp: function(event) { this.mouseController.rightUp(event); },
    undo: function() { this.drawer.undo(); },
    redo: function() { this.drawer.redo(); },
    jumpTo: function(id) { this.drawer.jumpTo(id); },
  }
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