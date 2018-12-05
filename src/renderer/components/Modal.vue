<template>
  <div class="modal-full">
    <div class="modal-window">
      <div>
        <div
          v-on:click="selectClick(index)"
          class="modal-select"
          :style="[index === selected ? {background:'green'}:{}]"
          v-for="(item,index) in items"
          :key="index"
        >{{item.title}}</div>
      </div>

      <div class="modal-buttons">
        <div class="modal-button modal-button--confirm" v-on:click="startGame">Start</div>
        <div class="modal-button modal-button--back" v-on:click="hide">Zpět</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["hide", "newGame", "items"],
  methods: {
    selectClick(index) {
      this.selected = index;
    },
    startGame() {
      this.$router.push({
        name: "game",
        params: { difficult: this.items[this.selected].value }
      });
    }
  },
  data() {
    return {
      selected: 0
    };
  }
};
</script>
<style lang="scss" scoped>
.modal-full {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  top: 0;
}
.modal-window {
  padding: 30px;
  background: white;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.modal-buttons {
  display: flex;
}
.modal-button {
  border: 1px solid lightgray;
  padding: 1rem 4rem;
  user-select: none;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
  &--confirm {
    background: #007bff;
    border-radius: 5px;
  }
  &--back {
    background: red;
    border-radius: 5px;
  }
}
.modal-select {
  width: 100%;
  padding: 20px 0px;
  text-align: center;
  border: 1px solid lightgray;
  margin-bottom: 2rem;
  background: lightgray;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
}
</style>

