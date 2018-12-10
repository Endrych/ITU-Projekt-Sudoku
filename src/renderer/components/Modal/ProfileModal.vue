<template>
  <div class="modal-full">
    <div class="modal-window">
      <div class="modal-content">
        <div class="profile-statistics">
          <div class="profile-statistics-item profile-statistics-item-easy">
            <h3>Snadná</h3>
            <div>
              <span class="profile-statistics-item-title">Dohráno:</span>
              {{statistics.easy.completed}}
            </div>
            <div>
              <span class="profile-statistics-item-title">Nejlepší čas:</span>
              <span
                v-if="statistics.easy.best"
              >{{statistics.easy.best.hours}}:{{statistics.easy.best.minutes | toTimerFormat}}:{{statistics.easy.best.seconds | toTimerFormat}}</span>
              <span v-else>Nedohráno</span>
            </div>
          </div>
          <div class="profile-statistics-item profile-statistics-item-standard">
            <h3>Střední</h3>
            <div>
              <span class="profile-statistics-item-title">Dohráno:</span>
              {{statistics.standard.completed}}
            </div>
            <div>
              <span class="profile-statistics-item-title">Nejlepší čas:</span>
              <span
                v-if="statistics.standard.best"
              >{{statistics.standard.best.hours}}:{{statistics.standard.best.minutes | toTimerFormat}}:{{statistics.standard.best.seconds | toTimerFormat}}</span>
              <span v-else>Nedohráno</span>
            </div>
          </div>
          <div class="profile-statistics-item profile-statistics-item-hard">
            <h3>Těžká</h3>
            <div>
              <span class="profile-statistics-item-title">Dohráno:</span>
              {{statistics.hard.completed}}
            </div>
            <div>
              <span class="profile-statistics-item-title">Nejlepší čas:</span>
              <span
                v-if="statistics.hard.best"
              >{{statistics.hard.best.hours}}:{{statistics.hard.best.minutes | toTimerFormat}}:{{statistics.hard.best.seconds | toTimerFormat}}</span>
              <span v-else>Nedohráno</span>
            </div>
          </div>
        </div>
        <app-achievments ref="achievments"/>
      </div>
      <div class="modal-buttons">
        <div class="modal-button modal-button--back" v-on:click="hide">Zpět</div>
      </div>
    </div>
  </div>
</template>
<script>
import { readFile, writeFile } from "fs";
import AppAchievments from "../Achievment/Achievments";
export default {
  created() {
    readFile("./statistics.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.statistics = JSON.parse(data);
      this.$refs.achievments.setStatistics(this.statistics);
    });
  },
  components: {
    AppAchievments
  },
  methods: {
    hide() {
      this.$emit("hide");
    }
  },
  data() {
    return {
      statistics: {
        easy: { completed: 0, best: null },
        standard: { completed: 0, best: null },
        hard: { completed: 0, best: null }
      }
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
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
}
.modal-content {
  flex-grow: 1;
  overflow-y: auto;
}

.modal-buttons {
  display: flex;
  flex-basis: auto;
  justify-content: center;
}

.modal-button {
  border: 1px solid lightgray;
  padding: 1rem 2.5rem;
  font-size: 18px;
  user-select: none;
  cursor: pointer;
  color: white;
  display: inline-block;

  &--back {
    background: red;
    border-radius: 5px;
  }
}

.profile-statistics {
  display: flex;
  width: 100%;
  &-item {
    border: 1px solid black;
    margin: 2px;
    flex-grow: 1;
    text-align: center;
    h3 {
      border-bottom: 1px solid black;
      background: #2f2f2f;
      color: white;
      margin: 0;
      padding: 0.5rem;
    }
    & > div {
      padding: 0.5rem;
    }
  }
}
</style>

