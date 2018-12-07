<template>
  <div v-if="game">
    <div class="timer-container">
      <p>{{hours}}:{{minutes | toTimerFormat}}:{{seconds | toTimerFormat}}</p>
    </div>
    <div class="custom-buttons">
      <div class="custom-button save-button" v-on:click="saveHandler">Uložit hru</div>
      <div class="custom-button back-button" v-on:click="goBack">
        <span class="left-arrow">&larr;</span>Hlavní menu
      </div>
    </div>
    <app-field
      class="playfield"
      :playField="playField"
      :currPlayField="currPlayField"
      ref="playfield"
      v-on:selected="select"
      v-on:complete="onComplete"
    />
    <div class="field-options-container">
      <div class="field-options-container--row" v-for="i in 3" :key="i">
        <div v-for="j in 3" :key="j">
          <div v-on:click="selectValue((i-1)*3 + j)" class="field-option">{{((i-1)*3 + j)}}</div>
        </div>
      </div>
    </div>
    <app-start-game-modal ref="startGameModal" v-show="isModalShow" v-on:hide="goBack" :title="modalTitle"/>
    <app-save-game-modal
      v-if="isSaveModalShow"
      v-on:hide="isSaveModalShow=false"
      :items="items"
      v-on:saveGame="saveGame"
    />
  </div>
</template>
<script>
import AppField from "./Field";
import AppStartGameModal from "../Modal/StartGameModal";
import AppSaveGameModal from "../Modal/SaveGameModal";
import { readFile, writeFile } from "fs";

export default {
  components: { AppStartGameModal, AppSaveGameModal },
  props: ["game"],
  created: function() {
    var me = this;
    this.startTime = new Date();
    this.playField = this.game.template;
    this.currPlayField = this.game.playField;
    this.difficult = this.game.difficult;
    this.hours = this.game.time.hours;
    this.minutes = this.game.time.minutes;
    this.seconds = this.game.time.seconds;
    window.addEventListener("keydown", this.handleKeyDown);
    readFile("./saved-games.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.items = JSON.parse(data);
    });

    setInterval(() => {
      if (!me.isSaveModalShow && !me.isModalShow) me.seconds++;
      if (me.seconds === 60) {
        me.seconds = 0;
        me.minutes++;
        if (me.minutes === 60) {
          me.minutes = 0;
          me.hours++;
        }
      }
    }, 1000);
  },
  components: {
    AppField,
    AppStartGameModal,
    AppSaveGameModal
  },
  methods: {
    saveGame(name) {
      this.items;
      this.isSaveModalShow = false;
      this.items[name] = {
        template: this.playField,
        playField: this.currPlayField,
        difficult: this.difficult,
        time: {
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds
        }
      };
      writeFile(
        "./saved-games.json",
        JSON.stringify(this.items),
        "utf8",
        err => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    },
    saveHandler() {
      this.isSaveModalShow = true;
    },
    handleKeyDown(event) {
      if (event.key === "Backspace") {
        this.selectValue(null);
      }
      var val = parseInt(event.key);
      if (!isNaN(val) && val !== 0) {
        this.selectValue(val);
      }
    },
    onComplete() {
      this.isModalShow = true;
      this.$refs.startGameModal.setGameTimeAndDifficult(this.hours,this.minutes, this.seconds, this.difficult);
    },
    goBack() {
      this.$router.push("/");
    },

    select(select) {
      this.selectedPart = select.part;
      this.selectedRow = select.row;
      this.selectedCol = select.col;
    },
    selectValue(value) {
      if (this.selectedPart != undefined) {
        this.currPlayField[this.selectedPart][this.selectedRow][
          this.selectedCol
        ] = value;
        this.$refs.playfield.update();
      }
    }
  },
  data() {
    return {
      currPlayField: [],
      selectedPart: null,
      selectedRow: null,
      selectedCol: null,
      startTime: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
      modalTitle: "Gratulujeme k výhře, chcete si zahrát znovu?",
      isModalShow: false,
      isSaveModalShow: false,
      items: {},
      difficult: null
    };
  }
};
</script>
<style lang="scss" scoped>
.timer-container {
  font-size: 2.5rem;
  p {
    margin: 10px 0;
  }
}
.custom-buttons {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
}

.custom-button {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  top: 1.5rem;
  font-weight: bold;
  font-size: 1.6rem;
  background: #ebebeb;
  border: 1px solid lightgray;
  margin-right: 20px;
}

.custom-buttons {
  display: flex;
}

.left-arrow {
  margin-right: 15px;
}
.card-list {
  display: flex;
}
.playfield {
  position: absolute;
  background: white;
  border: none;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.field-option {
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 3rem;
  margin: 0.5rem;
  border: 3px solid black;
  background: #ebebeb;
  cursor: pointer;

  &:hover {
    background: lightgray;
  }
}

.field-options-container {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  bottom: 2rem;
  &--row {
    display: flex;
  }
}
</style>