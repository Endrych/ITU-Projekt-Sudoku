<template>
  <div class="modal-full">
    <div class="modal-window">
      <div>
        <h3>{{title}}</h3>
        <div class="description" v-if="showTimeAndDifficult">
          <div>
            <span class="description-title">Obtížnost:</span>
            <span>{{difficult | difficultToCzech}}</span>
          </div>
          <div>
            <span class="description-title">Čas:</span>
            <span>{{hours}}:{{minutes | toTimerFormat}}:{{seconds | toTimerFormat}}</span>
          </div>
        </div>
        <div
          v-on:click="selectClick(index)"
          class="modal-select"
          :style="[index === selected ? {background:'green',color:'white'}:{}]"
          v-for="(item,index) in items"
          :key="index"
        >{{item.title}}</div>
      </div>
      <app-modal-buttons
        FirstTitle="Start"
        SecondTitle="Menu"
        v-on:first-click="startGame"
        v-on:second-click="hide"
      />
    </div>
  </div>
</template>
<script>
import AppModalButtons from "./ModalButtons";
export default {
  components: { AppModalButtons },
  props: ["newGame", "title"],
  methods: {
    setGameTimeAndDifficult(hours, minutes, seconds, difficult) {
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      this.difficult = difficult;
      this.showTimeAndDifficult = true;
    },
    hide() {
      this.$emit("hide");
    },
    selectClick(index) {
      this.selected = index;
    },
    startGame() {
      this.$router.push({
        name: "game",
        params: { difficult: this.items[this.selected].value, time: new Date() }
      });
    }
  },
  data() {
    return {
      selected: 0,
      items: [
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
      hours: 0,
      minutes: 0,
      seconds: 0,
      showTimeAndDifficult: false,
      difficult: ""
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

.modal-select {
  width: 100%;
  padding: 20px 0px;
  text-align: center;
  border: 1px solid lightgray;
  margin-bottom: 2rem;
  background: lightgray;
  border-radius: 8px;
  user-select: none;
  font-size: 25px;
  cursor: pointer;
}
h3 {
  text-align: center;
  font-size: 2rem;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  &-title {
    font-weight: bold;
  }
}
</style>

