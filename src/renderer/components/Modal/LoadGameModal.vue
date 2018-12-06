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
        <app-saved-games v-on:select="selectClick" :items="items"/>
      </div>
      <div class="modal-buttons">
        <div class="modal-button modal-button--back" v-on:click="hide">Zpět do menu</div>
      </div>
    </div>
  </div>
</template>
<script>
import AppModalButtons from "./ModalButtons";
import AppSavedGames from "./SavedGames";
export default {
  components: { AppModalButtons, AppSavedGames },
  props: ["items"],

  methods: {
    selectClick(index) {
      this.$router.push({
        name: "load-game",
        params: { name: index }
      });
    },
    hide() {
      this.$emit("hide");
    }
  },
  data() {
    return {
      title: "Zvolte si jednu z uložených her"
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
.modal-buttons {
  display: flex;
  justify-content: center;
}

.modal-button {
  border: 1px solid lightgray;
  padding: 1rem 2.5rem;
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

