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
        FirstTitle="Uložit"
        :SecondTitle="btnTitle"
        v-on:first-click="saveGame"
        v-on:second-click="hide"
      />
    </div>
  </div>
</template>
<script>
import AppModalButtons from "./ModalButtons";
import AppSavedGames from "./SavedGames";
export default {
  components: { AppModalButtons, AppSavedGames },
  props: ["items", "btnTitle", "title"],

  methods: {
    selectClick(index) {
      this.$emit("saveGame", index);
    },
    hide() {
      this.$emit("hide");
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
          "Musí být vyplněný název nebo klikem přepište jednu z uložených her";
      }

      if (value) {
        this.$emit("saveGame", value);
      }
    }
  },
  data() {
    return {
      selected: null,
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

 .error-message{
	 display:flex;
	 justify-content:center;
	 align-self:center;
	 font-size: 18px;
 }

.new-name {
  &-container {
    position: relative;
    height: 2.5rem;
	display:flex;
	justify-content:center;
  }
  &-input {
    // position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    width: 50%;
    font-size: 1.5rem;
    padding: 0;
	border: 1px solid gray;
	padding-left: 5px;
	&:focus{
		outline: none;
		border: 1px solid lighten(#007bff, 15%);
		// box-shadow:1px 1px 1px lighten(#007bff, 30%);
	}
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

