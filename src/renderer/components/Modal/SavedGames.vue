<template>
  <div>
    <div class="modal-titles">
      <div class="modal-title">Název</div>
      <div class="modal-title">Obtížnost</div>
      <div class="modal-title">Čas</div>
    </div>
    <div class="modal-saved-games">
      <div
        v-on:click="selectClick(index)"
        class="modal-saved-game"
        v-for="(item,index) in items"
        :key="index"
      >
        <div>{{index}}</div>
        <div>{{item.difficult | difficultToCzech}}</div>
        <div>{{item.time.hours}}:{{item.time.minutes | toTimerFormat}}:{{item.time.seconds | toTimerFormat}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
  methods: {
    selectClick(index) {
      this.$emit("select", index);
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-titles {
  display: flex;
  margin-bottom: 0.5rem;
  .modal-title {
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
  }
}
.modal-saved-games {
  max-height: 30vh;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 2rem;
  min-width: 50vw;
}
.modal-saved-game {
  display: flex;
  align-content: center;
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  border: 1px solid lightgray;
  margin-bottom: 0.1rem;
  background: lightgray;
  border-radius: 2px;
  user-select: none;
  cursor: pointer;
  & > div {
    flex: 1;
    display: inline-block;
  }
  &:hover {
    background-color: #28a745;
    color: white;
  }
}
</style>


