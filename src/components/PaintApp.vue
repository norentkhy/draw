<template>
  <div class="paint-app">
    <h1>{{ title }}</h1>
    <h2>concepts to implement</h2>
    <ul>
      <li>HTML: Canvas</li>
      <li>Design Pattern: Command (undo redo history)</li>
    </ul>
    <h2>canvas</h2>
    <canvas
      v-on:click="clickOnCanvas"
      id="paint-canvas"
    ></canvas>
    <ul id="paint-history">
      <li
        v-for="paintAction in paintActions"
        :key="paintAction.datetime"
      >
        {{paintAction.name}}
      </li>
    </ul>

  </div>
</template>

<script>
let paintCanvas;
let context2d;

window.onload = function() {
  paintCanvas = document.getElementById("paint-canvas");
  context2d = paintCanvas.getContext("2d");

  paintCanvas.width = Math.floor(
    getNumberFromPxSize(window.getComputedStyle(paintCanvas).width)
  );
  paintCanvas.height = Math.floor(
    getNumberFromPxSize(window.getComputedStyle(paintCanvas).height)
  );

  context2d.fillStyle = "#ff0000";
  context2d.fillRect(0, 0, 3, 3);
};

function getNumberFromPxSize(pxSize) {
  return Number(pxSize.replace(/px/, ""));
}

function getCanvasPositionFromOffset([offsetX, offsetY]) {
  const cssWidth = getNumberFromPxSize(
    window.getComputedStyle(paintCanvas).width
  );
  const cssHeight = getNumberFromPxSize(
    window.getComputedStyle(paintCanvas).height
  );
  return [
    (offsetX * paintCanvas.width) / cssWidth,
    (offsetY * paintCanvas.height) / cssHeight
  ];
}

function vectorAdd(vector1, vector2) {
  let newVector;
  if (vector1.length === vector2.length) {
    newVector = vector1.map((value, index) => {
      return value + vector2[index];
    });
  } else {
    newVector = null;
  }
  return newVector;
}

function getUpperLeftCornerFromCenterPositionAndSize(centerPosition, size) {
  const offset = executeElementaryFunctionOnElementsOfArrays(size => size / 2, [
    size
  ]);
  return executeElementaryFunctionOnElementsOfArrays(
    (position, offset) => position - offset,
    [centerPosition, offset]
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

const testFunction = (x, y) => {
  return x + y;
};

function drawRectangle(context2d, position, size) {
  if (context2d) {
    context2d.fillStyle = "#FF0000";
    context2d.fillRect(...position, ...size);
  }
}

export default {
  name: "PaintApp",
  props: {
    title: String
  },
  data: function () {
    return {
      paintActions: [
        { name: "action1", datetime: 1 },
        { name: "action2", datetime: 2 }
      ]
    }
  },
  methods: {
    clickOnCanvas: function(event) {
      console.log("offset pos: ", event.offsetX, event.offsetY);
      const canvasPosition = getCanvasPositionFromOffset([
        event.offsetX,
        event.offsetY
      ]);
      console.log("canvas pos: ", canvasPosition);
      const size = [10, 10];
      const rectanglePosition = getUpperLeftCornerFromCenterPositionAndSize(
        canvasPosition,
        size
      );
      console.log("rectanle pos: ", rectanglePosition);
      drawRectangle(context2d, rectanglePosition, size);
    }
  }
};
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

#paint-canvas {
  height: 70%;
  width: 70%;
  border: black 2px solid;
  background-color: #eeeeee;
}
</style>