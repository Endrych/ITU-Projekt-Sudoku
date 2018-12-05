<template>
  <div>
    <h1 class="title">
      Sudoku
      <span>NG</span>
    </h1>
    <app-buttons :buttons="buttons"/>
    <app-modal v-if="isModalShow" :hide="hideModal" :items="modalChoices"/>
  </div>
</template>

<script>
import MenuButtons from "./MenuButtons";
import { remote } from "electron";
import Modal from "../Modal";

export default {
  components: {
    "app-buttons": MenuButtons,
    "app-modal": Modal
  },
  computed: {},
  data() {
    return {
      isModalShow: false,
      hideModal: () => {
        this.isModalShow = false;
      },
      modalChoices: [
        {
          title: "Snadná",
          value: "easy"
        },
        {
          title: "Střední",
          value: "standard"
        },
        {
          title: "Těžká",
          value: "hard"
        }
      ],
      buttons: [
        {
          name: "Nová hra",
          action: () => {
            this.isModalShow = true;
          }
        },
        {
          name: "Načíst hru",
          action: () => {
            console.log("Click");
          }
        },
        {
          name: "Úspěchy",
          action: () => {
            console.log("Click");
          }
        },
        {
          name: "Návod",
          action: () => {
            console.log("Click");
          }
        },
        {
          name: "Nastavení",
          action: () => {
            console.log("Click");
          }
        },
        {
          name: "Konec",
          action: () => {
            remote.getCurrentWindow().close();
          }
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 12vw;
  text-align: center;
  margin-bottom: 10vh;
}
</style>
