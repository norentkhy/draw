<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <DrawApp title="" />
  </div>
</template>

<script>
import DrawApp from "./components/DrawApp.vue";

export default {
  name: "app",
  components: {
    DrawApp
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 98vh;
}
</style>
