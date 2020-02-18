<template>
  <div class="draw-app">
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
        <!-- <li>jump to: </li> -->
        <li
          v-for="action of drawer.previousActions"
          :key="action.id"
          @mouseup.left="jumpTo(action.id)"
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
      @touchstart="leftDown"
      @touchmove="move"
      @touchend="leftUp"
      @contextmenu.prevent
    ></canvas>

    <div class="draw-tools">
      colors:
      <ul id="color-palette">
        <li
          v-for="color of colors"
          :key=color
          @mouseup.left="selectColor(color)"
          :style="{backgroundColor: color}"
        >{{color}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import DrawingKit from './DrawingKit.js';
import Drawer from './Drawer.js';
import MouseDrawer from './MouseDrawer.js';
import correctCanvas from './correctCanvas.js';
import colorPalettes from 'nice-color-palettes';

const drawApp = {
  name: 'drawApp',
  props: {
    title: String
  },

  data: function () {
    return {
      drawingKit: {},
      drawer: {},
      mouseDrawer: {},
      colors: [],
    };
  },

  mounted() {
    const canvas = document.getElementById('canvas');
    correctCanvas(canvas);
    const drawingKit = new DrawingKit(canvas);
    const drawer = new Drawer(canvas, drawingKit);
    const mouseDrawer = new MouseDrawer(drawer);

    this.drawingKit = drawingKit;
    this.drawer = drawer;
    this.mouseDrawer = mouseDrawer;
    this.colors = colorPalettes[0];
  },
  
  methods: {
    move: function(event) { this.mouseDrawer.move(event); },
    leftDown: function(event) { this.mouseDrawer.leftDown(event); },
    leftUp: function(event) { this.mouseDrawer.leftUp(event); },
    rightDown: function(event) { this.mouseDrawer.rightDown(event); },
    rightUp: function(event) { this.mouseDrawer.rightUp(event); },
    undo: function() { this.drawer.undo(); },
    redo: function() { this.drawer.redo(); },
    jumpTo: function(id) { this.drawer.jumpTo(id); },
    selectColor: function(color) { this.drawingKit.setToolColor(color); }
  }
};

export default drawApp;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0px 0 0;
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
  height: 90%;
  display: flex;
  flex-direction: column;
}

.control-buttons {
 height: 5em;
}

#canvas {
  flex: 1;
  width: 99%;
  border: #999 2px solid;
  background-color: #FFFFFF;
}

.draw-tools {
 height: 6em;
}
</style>