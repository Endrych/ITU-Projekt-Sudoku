<template>
  <div class="modal-full">
    <div class="modal-window">
      <app-tutorial v-on:end="$emit('end')" :items="items"/>
      <div class="modal-buttons">
        <div class="modal-button modal-button--back" v-on:click="hide">Zpět</div>
      </div>
    </div>
  </div>
</template>
<script>
import AppTutorial from "../Tutorial/Tutorial";
export default {
  components: { AppTutorial },
  props: ["items"],

  methods: {
    hide() {
      this.$emit("hide");
    }
  },
  data() {
    return {};
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
  justify-content: center;
}

.modal-button {
  border: 1px solid lightgray;
  padding: 1rem 2.5rem;
  font-size: 25px;
  user-select: none;
  cursor: pointer;
  color: white;
  display: inline-block;

  &--back {
    background: red;
    border-radius: 5px;
  }
}
</style>

