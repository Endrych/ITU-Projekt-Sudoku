<template>
  <div>
    <h1 class="title">
      Sudoku
      <span>NG</span>
    </h1>
    <app-buttons :buttons="buttons"/>
    <app-modal v-if="isModalShow" v-on:hide="hideModal" title/>
    <app-load-game-modal v-if="isLoadModalShow" :items="items" v-on:hide="hideModal"/>
    <app-tutorial-modal v-if="isTutorialModalShow" v-on:hide="hideModal" :items="tutorialItems"/>
  </div>
</template>

<script>
import MenuButtons from "./MenuButtons";
import { remote } from "electron";
import AppModal from "../Modal/StartGameModal";
import AppLoadGameModal from "../Modal/LoadGameModal";
import AppTutorialModal from "../Modal/TutorialModal";
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
  },
  components: {
    "app-buttons": MenuButtons,
    AppModal,
    AppLoadGameModal,
    AppTutorialModal
  },
  methods: {
    hideModal() {
      this.isModalShow = false;
      this.isLoadModalShow = false;
      this.isTutorialModalShow = false;
    }
  },
  data() {
    return {
      isModalShow: false,
      isLoadModalShow: false,
      isTutorialModalShow: false,
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
            this.isTutorialModalShow = true;
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
      ],
      tutorialItems: [
        {
          image,
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam egestas wisi a erat. Et harum quidem rerum facilis est et expedita distinctio. Mauris tincidunt sem sed arcu. Etiam posuere lacus quis dolor. Etiam quis quam. Aliquam erat volutpat. Nulla est. Proin mattis lacinia justo. Praesent in mauris eu tortor porttitor accumsan. "
        },
        {
          image,
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam egestas wisi a erat. Et harum quidem rerum facilis est et expedita distinctio. Mauris tincidunt sem sed arcu. Etiam posuere lacus quis dolor. Etiam quis quam. Aliquam erat volutpat. Nulla est. Proin mattis lacinia justo. Praesent in mauris eu tortor porttitor accumsan. "
        },
        {
          image,
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam egestas wisi a erat. Et harum quidem rerum facilis est et expedita distinctio. Mauris tincidunt sem sed arcu. Etiam posuere lacus quis dolor. Etiam quis quam. Aliquam erat volutpat. Nulla est. Proin mattis lacinia justo. Praesent in mauris eu tortor porttitor accumsan. "
        },
        {
          image,
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam egestas wisi a erat. Et harum quidem rerum facilis est et expedita distinctio. Mauris tincidunt sem sed arcu. Etiam posuere lacus quis dolor. Etiam quis quam. Aliquam erat volutpat. Nulla est. Proin mattis lacinia justo. Praesent in mauris eu tortor porttitor accumsan. "
        },
        {
          image,
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam egestas wisi a erat. Et harum quidem rerum facilis est et expedita distinctio. Mauris tincidunt sem sed arcu. Etiam posuere lacus quis dolor. Etiam quis quam. Aliquam erat volutpat. Nulla est. Proin mattis lacinia justo. Praesent in mauris eu tortor porttitor accumsan. "
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
