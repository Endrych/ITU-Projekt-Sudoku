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
      <div class="field-options-flex-container">
        <div>
          <div class="field-options-container--row" v-for="i in 3" :key="i">
            <div v-for="j in 3" :key="j">
              <div v-on:click="selectValue((i-1)*3 + j)" class="field-option">{{((i-1)*3 + j)}}</div>
            </div>
          </div>
        </div>
        <div class="field-options-container--col">
          <div class="field-option">
            <div v-on:click="selectValue(null)" class="btn-icon icon-clear"></div>
          </div>
          <div
            class="field-option"
            :style="[history.length === 0?{cursor:'no-drop',background:'red !important'}:{}]"
          >
            <div class="btn-icon icon-undo" v-on:click="undo"></div>
          </div>
          <div
            class="field-option"
            :style="[showSame === true?{background:'yellow !important'}:{background:'#ebebeb !important'}]"
          >
            <div class="btn-icon icon-highlight" v-on:click="highlight"></div>
          </div>
        </div>
      </div>
    </div>
    <app-start-game-modal
      ref="startGameModal"
      v-show="isModalShow"
      v-on:hide="goBack"
      :title="modalTitle"
    />
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
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  created: function() {
    var me = this;
    this.startTime = new Date();
    this.playField = this.game.template;
    this.currPlayField = this.game.playField;
    this.difficult = this.game.difficult;
    this.hours = this.game.time.hours;
    this.minutes = this.game.time.minutes;
    this.seconds = this.game.time.seconds;
    this.history = this.game.history;

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
    undo() {
      if (this.history.length > 0) {
        var part = this.history[this.history.length - 1].part;
        var row = this.history[this.history.length - 1].row;
        var col = this.history[this.history.length - 1].col;
        this.select({
          part,
          row,
          col
        });
        this.selectValue(this.history[this.history.length - 1].oldValue);
        if (this.$refs.playfield) {
          this.$refs.playfield.selectedPart = part;
          this.$refs.playfield.selectedRow = row;
          this.$refs.playfield.selectedCol = col;
        }
        var history = this.history;
        history.pop();
        this.history.pop();
      }
    },
    highlight() {
      this.showSame = !this.showSame;
      this.$refs.playfield.showSame = this.showSame;
    },
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
        },
        history: this.history
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
      if (this.isSaveModalShow || this.isModalShow) {
        return;
      }

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
      this.$refs.startGameModal.setGameTimeAndDifficult(
        this.hours,
        this.minutes,
        this.seconds,
        this.difficult
      );
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
        this.history.push({
          part: this.selectedPart,
          row: this.selectedRow,
          col: this.selectedCol,
          oldValue: this.currPlayField[this.selectedPart][this.selectedRow][
            this.selectedCol
          ],
          newValue: value
        });
        this.currPlayField[this.selectedPart][this.selectedRow][
          this.selectedCol
        ] = value;

        if (this.$refs.playfield) this.$refs.playfield.update();
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
      difficult: null,
      showSame: false,
      history: []
    };
  }
};
</script>
<style lang="scss" scoped>
.btn-icon {
  width: 100%;
  height: 100%;
  background-size: 75% !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
.icon-clear {
  background: url("../../assets/icons8-clear-symbol-filled-50.png");
}
.icon-undo {
  background: url("../../assets/icons8-undo-filled-50.png");
}
.icon-highlight {
  background: url("../../assets/icons8-eye-filled-50.png");
}
.timer-container {
  font-size: 2.5rem;
  user-select: none;
  cursor: default;
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
  user-select: none;
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
  margin: 0.5rem;
  border: 3px solid black;
  background: #ebebeb;
  cursor: pointer;
  text-align: center;
  font-size: 3rem;
  user-select: none;

  &:hover {
    background: lightgray;
  }
}
.field-options-flex-container {
  display: flex;
  flex-direction: row;
}

.field-options-container {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  bottom: 2rem;
  &--row {
    display: flex;
  }
  &--col {
    display: flex;
    flex-direction: column;
  }
}
</style>