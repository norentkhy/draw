<template>
  <div class="draw-app">
    <h1>{{ title }}</h1>
    <h2>concepts to implement</h2>
    <ul>
      <li>HTML: Canvas</li>
      <li>Design Pattern: Command (undo redo history)</li>
    </ul>
    <h2>canvas</h2>
    <ul id="draw-history">
      <li
        v-for="drawAction in drawActions"
        :key="drawAction.id"
      >
        {{drawAction.name}}
      </li>
    </ul>
    <canvas
      v-on:click="clickOnCanvas"
      id="canvas"
    ></canvas>

  </div>
</template>

<script>
import Drawer from './Drawer.js';

const drawApp = {
  name: "drawApp",
  props: {
    title: String
  },
  data: function () {
    return {
      drawActions: [
        { name: "action1", id: 1 },
        { name: "action2", id: 2 }
      ]
    }
  },
  methods: {
    clickOnCanvas: (event) => drawer.drawClickEvent(event),
  }
};

var drawer;

window.onload = function() {
  drawer = new Drawer();
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
  height: 70%;
  width: 70%;
  border: #999 2px solid;
  background-color: #FFFFFF;
}
</style>