<template>
  <div class="tutorial-modal">
    <!-- <img :src="items[selectedIndex]"> -->
    <div class="tutorial-modal-flex-container">
      <div class="tutorial-modal-main">
        <div class="arrow arrow-left" v-on:click="goLeft"></div>
        <div class="arrow arrow-right" v-on:click="goRight"></div>
        <div class="tutorial-modal-main-content">
          <div class="tutorial-modal-image--container">
            <!-- <img src="./../../assets/logo.png" alt> -->
          </div>
          <div class="tutorial-modal-text">{{items[selectedIndex].text}}</div>
        </div>
      </div>
      <div class="tutorial-navigation--container">
        <div class="tutorial-navigation">
          <div
            :style="index-1 === selectedIndex?{background:'#007bff'}:{}"
            class="tutorial-navigation-item"
            v-for="index in items.length"
            :key="index"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
  data() {
    return {
      selectedIndex: 0
    };
  },
  methods: {
    goLeft() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    goRight() {
      if (this.selectedIndex < this.items.length - 1) {
        this.selectedIndex++;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tutorial-modal-flex-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.tutorial-modal {
  width: 75vw;
  height: 65vh;
  &-image {
    &--container {
      flex-grow: 1;
      color: black;
    }
  }
  &-main {
    flex-grow: 1;
    position: relative;
    &-content {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
    }
  }
  &-text {
    flex-basis: auto;
  }
}
.arrow {
  position: absolute;
  width: 3rem;
  height: 5rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  top: 50%;
  transform: translateY(-50%);

  &-left {
    background-image: url("../../assets/icons8-chevron-left-90.png");
    left: 1rem;
  }
  &-right {
    background-image: url("../../assets/icons8-chevron-right-90.png");
    right: 1rem;
  }
}

.tutorial-navigation {
  display: inline-flex;
  &-item {
    width: 1rem;
    height: 1rem;
    border: 1px solid lightblue;
    border-radius: 50%;
    position: relative;
    box-sizing: border-box;
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
  &--container {
    flex-basis: auto;
    display: flex;
    justify-content: center;
    padding: 1.3rem 0;
  }
}
</style>
