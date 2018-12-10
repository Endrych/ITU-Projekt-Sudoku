<template>
  <div class="modal-full">
    <div class="modal-window">
      <div class="tutorial-item">
        <div class="tutorial-item-icon--container">
          <div class="tutorial-item-icon tutorial-item-icon--clear"></div>
        </div>
        <div
          class="tutorial-item-description"
        >Provede se smazání hodnoty aktuálně vybraného políčka.</div>
      </div>
      <div class="tutorial-item">
        <div class="tutorial-item-icon--container">
          <div class="tutorial-item-icon tutorial-item-icon--undo"></div>
        </div>
        <div
          class="tutorial-item-description"
        >Provede se vrácení na předchozí stav hry. Pokud se zatím neprovedla žádná změna, tak se tlačítko nedá použít. To se pozná podle toho, že pozadí tlačítka je červené.</div>
      </div>
      <div class="tutorial-item">
        <div class="tutorial-item-icon--container">
          <div class="tutorial-item-icon tutorial-item-icon--highlight"></div>
        </div>
        <div
          class="tutorial-item-description"
        >Zobrazí všechny buňky hracího pole, které mají stejnou hodnotu, jako buňka, která je aktuálně vybraná. Tenhle mód je aktivní pokud je podbarven žlutou barvou.</div>
      </div>
      <div class="tutorial-item">
        <div class="tutorial-item-icon--container">
          <div class="tutorial-item-icon tutorial-item-icon--note"></div>
        </div>
        <div
          class="tutorial-item-description"
        >Mód poznámek, pokud je aktivní, tak místo zadávání hodnoty do buňky k dojde k uložení poznámce o možné hodnotě v buňce, pokud daná hodnota je již poznamenána, dojde k její smazání s poznámek. Tenhle mód je aktivní pokud je podbarven žlutou barvou.</div>
      </div>
      <div class="modal-buttons">
        <div class="modal-button modal-button--back" v-on:click="hide">Zpět</div>
      </div>
    </div>
  </div>
</template>
<script>
import { readFile, writeFile } from "fs";

export default {
  created() {
    readFile("./statistics.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.statistics = JSON.parse(data);
    });
  },
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
  width: 60%;
}

.modal-buttons {
  margin-top: 2rem;
  display: flex;
  flex-basis: auto;
  justify-content: center;
}

.modal-button {
  border: 1px solid lightgray;
  padding: 1rem 2.5rem;
  user-select: none;
  cursor: pointer;
  color: white;
  display: inline-block;
  font-size: 18px;

  &--back {
    background: red;
    border-radius: 5px;

	&:hover{
		background:darken(red, 10%)
	}
	&:active{
		background:darken(red, 20%)
	}
  }
}
.tutorial-item {
  display: flex;
  &-icon {
    width: 3rem;
    height: 3rem;
    background-size: 75% !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &--clear {
      background: url("../../assets/icons8-clear-symbol-filled-50.png");
    }
    &--undo {
      background: url("../../assets/icons8-undo-filled-50.png");
    }
    &--highlight {
      background: url("../../assets/icons8-eye-filled-50.png");
    }
    &--note {
      background: url("../../assets/icons8-compose-100.png");
    }
    &--container {
      width: 5rem;
      height: 5rem;
      flex-basis: auto;
      position: relative;
    }
  }
  &-description {
    flex-grow: 1;
    font-size: 20px;
    padding: 1.5rem;
    flex-basis: 0;
  }
}

// .tutorial-item-icon--container {
//   display: flex;
// }
</style>

