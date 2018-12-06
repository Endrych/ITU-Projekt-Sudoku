<template>
  <div class="modal-full">
    <div class="modal-window">
      <div>
        <h3>{{title}}</h3>
      </div>
      <div
        class="no-save-games"
        v-if="Object.keys(items).length === 0"
      >Nebyli nalezeny žádné uložené hry</div>
      <div v-else>
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
      <div class="new-name-container">
        <input
          class="new-name-input"
          v-model="newName"
          type="text"
          name="new-name"
          placeholder="Název hry"
        >
      </div>
      <p class="error-message">{{error}}</p>
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
  props: ["hide", "items"],

  methods: {
    selectClick(index) {
      this.$emit("saveGame", index);
    },
    saveGame() {
      var value = null;
      if (this.newName !== "") {
        if (!this.items[this.newName]) {
          value = this.newName;
        } else {
          this.error =
            "Již existuje hra se shodným jménem vyberte si jiné jméno nebo klikněte na položku ze seznamu";
        }
      } else {
        this.error =
          "Musí být vyplněný název nebo si zvolte již uloženou hru ze seznamu";
      }

      if (value) {
        this.$emit("saveGame", value);
      }
    }
  },
  data() {
    return {
      selected: null,
      title:
        "Zvolte prosím nový název nebo si klikem vyberte z předchozích uložení",
      newName: "",
      error: ""
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

.modal-saved-game {
  display: flex;
  align-content: center;
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  border: 1px solid lightgray;
  margin-bottom: 1rem;
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
  &:last-child {
    margin-bottom: 2rem;
  }
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
.error-message {
  color: red;
}
</style>

