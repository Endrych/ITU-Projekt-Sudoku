<template>
  <div class="modal-full">
    <div class="modal-window">
      <div>
        <h3 :style="[valid === false?{color:'red'}:{}]">{{title}}</h3>
        <div
          v-on:click="selectClick(index)"
          class="modal-select"
          :style="[index === selected ? {background:'green'}:{}]"
          v-for="(item,index) in items"
          :key="index"
        >{{item.title}}</div>
      </div>
      <div class="no-save-games" v-if="items.length === 0">Nebyli nalezeny žádné uložené hry</div>
      <div class="new-name-container">
        <input
          class="new-name-input"
          v-model="newName"
          type="text"
          name="new-name"
          placeholder="Název hry"
        >
      </div>
      <app-modal-buttons
        FirstTitle="Start"
        SecondTitle="Zpět"
        v-on:first-click="saveGame"
        v-on:second-click="hide"
      />
    </div>
  </div>
</template>
<script>
import AppModalButtons from "./ModalButtons";
export default {
  components: { AppModalButtons },
  props: ["hide", 'items'],

  methods: {
    selectClick(index) {
      this.selected = index;
    },
    saveGame() {
      var value = null;
      if (this.selected === null) {
        if (this.newName !== "") {
          value = this.newName;
        } else {
          this.valid = false;
        }
      } else {
        value = this.items[this.selected].name;
      }
      if (value) {
        this.$emit("saveGame", value);
      }
    }
  },
  data() {
    return {
      selected: null,
      title: "Zvolte prosím nový název uložení nebo si vyberte z předchozího",
      newName: "",
      valid: true
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
.new-name {
  &-container {
    position: relative;
    height: 2.5rem;
  }
  &-input {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    font-size: 1.5rem;
    padding: 0;
  }
}
.no-save-games {
  text-align: center;
  padding: 2rem 0;
}
h3 {
  text-align: center;
}
</style>

