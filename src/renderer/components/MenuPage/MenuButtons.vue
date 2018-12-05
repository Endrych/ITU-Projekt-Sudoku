<template>
  <ul class="menu-buttons">
    <li v-for="(button,index) in buttons" :key="index">
      <div v-on:click="button.action">
        <app-button :title="button.name"/>
      </div>
    </li>
  </ul>
</template>
<script>
import MenuButton from "./MenuButton";

export default {
  components: {
    "app-button": MenuButton
  },
  props: ["buttons"]
};
</script>
<style lang="scss" scoped>
.menu-buttons {
  list-style: none;
  text-align: center;
}
</style>
