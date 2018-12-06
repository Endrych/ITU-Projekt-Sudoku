<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: "sudoku"
};
</script>

<style>
body {
  background-color: #fffadc;
}
</style>
