<template>
  <div id="app">
    <Matrix msg="Cancer XR"/>
  </div>
</template>

<script>
import Matrix from './components/Matrix.vue'

export default {
  name: 'App',
  components: {
    Matrix
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #c0c0c0;
  overflow: auto;
  height: 100vh;
}
div.dimmer {
    background: #5E5E5E;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.68;
    -moz-opacity: 0.68;
    width: 100%;
    z-index: 0;
}
</style>
