<template>
  <div>
    <h1 class="title">
      Sudoku
      <span>NG</span>
    </h1>
    <app-buttons :buttons="buttons"/>
    <app-modal v-if="isModalShow" v-on:hide="hideModal" title/>
    <app-load-game-modal v-if="isLoadModalShow" :items="items" v-on:hide="hideModal"/>
    <app-tutorial-modal
      v-on:end="tutorialFinishHandler"
      v-if="isTutorialModalShow"
      v-on:hide="hideModal"
    />
    <app-profile-modal v-if="isProfileModalShow" v-on:hide="hideModal"/>
  </div>
</template>

<script>
import MenuButtons from "./MenuButtons";
import { remote } from "electron";
import AppModal from "../Modal/StartGameModal";
import AppLoadGameModal from "../Modal/LoadGameModal";
import AppTutorialModal from "../Modal/TutorialModal";
import AppProfileModal from "../Modal/ProfileModal";
import image from "../../assets/icons8-chevron-left-90.png";
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
    readFile("./statistics.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.statistics = JSON.parse(data);
    });
  },
  components: {
    "app-buttons": MenuButtons,
    AppModal,
    AppLoadGameModal,
    AppTutorialModal,
    AppProfileModal
  },
  methods: {
    hideModal() {
      this.isModalShow = false;
      this.isLoadModalShow = false;
      this.isTutorialModalShow = false;
      this.isProfileModalShow = false;
    },
    tutorialFinishHandler() {
      if (!this.statistics.tutorial) {
        this.statistics.tutorial = true;
        writeFile(
          "./statistics.json",
          JSON.stringify(this.statistics),
          "utf8",
          err => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
      }
    }
  },
  data() {
    return {
      isModalShow: false,
      isLoadModalShow: false,
      isTutorialModalShow: false,
      isProfileModalShow: false,
      items: [],
      statistics: {
        tutorial: false,
        easy: {
          completed: 0,
          best: null
        },
        standard: {
          completed: 0,
          best: null
        },
        hard: {
          completed: 0,
          best: null
        }
      },
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
          name: "Návod",
          action: () => {
            this.isTutorialModalShow = true;
          }
        },
        {
          name: "Profil",
          action: () => {
            this.isProfileModalShow = true;
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
  cursor: default;
  user-select: none;
}
</style>
