<template>
  <div>
    <div class="timer-container">
      <p>{{hours}}:{{minutes | toTimerFormat}}:{{seconds | toTimerFormat}}</p>
    </div>
    <div class="back-button" v-on:click="goBack">
      <span class="left-arrow">&larr;</span>Hlavní menu
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
    <app-modal v-if="isModalShow" :hide="goBack" :title="modalTitle"/>
  </div>
</template>
<script>
import Field from "./Field";
import AppModal from "../Modal";
export default {
  components: { AppModal },
  props: ["playField"],
  created: function() {
    var me = this;
    this.startTime = new Date();
    this.currPlayField = this.deepCopy(this.playField);
    window.addEventListener("keydown", this.handleKeyDown);

    setInterval(() => {
      var currentTime = new Date();
      var diff = new Date(currentTime - me.startTime);
      this.hours = diff.getHours() - 1;
      this.minutes = diff.getMinutes();
      this.seconds = diff.getSeconds();
    }, 1000);
  },
  components: {
    "app-field": Field,
    AppModal
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === "Backspace") {
        this.selectValue(null);
      }
      var val = parseInt(event.key);
      if (!isNaN(val)) {
        this.selectValue(val);
      }
    },
    onComplete() {
      this.isModalShow = true;
    },
    goBack() {
      this.$router.push("/");
    },
    deepCopy(obj) {
      if (typeof obj == "object") {
        if (obj) {
          var l = obj.length;
          var r = new Array(l);
          for (var i = 0; i < l; i++) {
            r[i] = this.deepCopy(obj[i]);
          }
          return r;
        }
      }
      return obj;
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
      isModalShow: false
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
.back-button {
  display: inline-block;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 1.6rem;
  cursor: pointer;
  background: #ebebeb;
  border: 1px solid lightgray;
  position: absolute;
  right: 2rem;
  top: 1.5rem;
}
.left-arrow {
  margin-right: 5px;
}
.card-list {
  display: flex;
}
.playfield {
  position: absolute;
  background: white;
  border: none;
  left: 50%;
  top: 50%;
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