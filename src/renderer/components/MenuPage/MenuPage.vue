<template>
  <div>
    <h1 class="title">
      Sudoku
      <span>NG</span>
    </h1>
    <app-buttons :buttons="buttons"/>
    <app-modal v-if="isModalShow" v-on:hide="hideModal" title/>
    <app-load-game-modal v-if="isLoadModalShow" :items="items" v-on:hide="hideModal"/>
  </div>
</template>

<script>
import MenuButtons from "./MenuButtons";
import { remote } from "electron";
import AppModal from "../Modal/StartGameModal";
import AppLoadGameModal from "../Modal/LoadGameModal";
import { readFile, writeFile } from "fs";

export default {
  mounted() {
    readFile("./saved-games.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.items = JSON.parse(data);
    });
  },
  components: {
    "app-buttons": MenuButtons,
    AppModal,
    AppLoadGameModal
  },
  methods: {
    hideModal() {
      this.isModalShow = false;
      this.isLoadModalShow = false;
    }
  },
  data() {
    return {
      isModalShow: false,
      isLoadModalShow: false,
      items: [],
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
            this.isLoadModalShow = true;
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
          name: "Statistiky",
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
  cursor:default;
  user-select: none;
}
</style>
