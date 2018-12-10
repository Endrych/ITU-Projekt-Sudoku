<template>
  <div class="menu-button">{{title}}</div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {
      // title: 'Tlacitko'
    };
  }
};
</script>
<style lang="scss" scoped>
.menu-button {
  border: 1px solid lightgray;

  background: #ebebeb;
  display: inline-block;
  width: 35%;
  font-size: calc(18px + 0.6vw);
  padding: 20px 10px;
  border: 1px solid gray;
  text-align: center;
  margin: 5px 0;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #28a745;
    color: white;
  }
}
</style>

