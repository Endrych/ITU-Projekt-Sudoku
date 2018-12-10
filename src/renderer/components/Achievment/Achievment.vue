<template>
  <div class="achievment">
    <div class="achievment-image--container">
      <div v-if="active" class="achievment-image tutorial-achievment"></div>
      <div v-else class="achievment-image tutorial-achievment-gray"></div>
    </div>
    <div class="achievment-body">
      <div class="achievment-header">{{achievment.title}}</div>
      <div class="achievment-text">{{achievment.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["achievment", "active"]
};
</script>
<style lang="scss" scoped>
.achievment {
  display: inline-flex;
  border: 1px solid black;
  width: 350px;
  height: 100px;
  flex-direction: row;
  color: black;

  &-image {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    &--container {
      height: 100%;
      width: 100px;
    }
  }
  &-body {
    display: inline-flex;
    flex-direction: column;
    flex: 1;
  }
  &-header {
    height: 30px;
    font-size: 25px;
    padding: 8px 15px;
  }
  &-text {
    font-size: 18px;
    padding: 5px 15px;
  }
  .tutorial-achievment {
    background-image: url("../../assets/achievments/tutorial-achievment.png");
  }
  .tutorial-achievment-gray {
    background-image: url("../../assets/achievments/tutorial-achievment-gray.png");
  }
}
</style>
