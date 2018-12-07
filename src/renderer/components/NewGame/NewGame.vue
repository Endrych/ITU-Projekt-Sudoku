<template>
  <app-game :game="game"></app-game>
</template>
<script>
import Game from "../Game/Game";
const fs = require("fs");
export default {
  components: {
    "app-game": Game
  },
  methods: {
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
    generateGame(difficult) {
      var field = [
        [[4, 5, null], [2, null, 8], [3, null, null]],
        [[null, 8, 2], [3, null, null], [null, null, null]],
        [[7, null, null], [null, null, 6], [null, null, 1]],
        [[null, null, null], [null, null, null], [8, null, null]],
        [[null, 3, null], [8, 1, 9], [null, 4, null]],
        [[null, null, 2], [null, null, null], [null, null, null]],
        [[5, null, null], [6, null, null], [null, null, 7]],
        [[null, null, null], [null, null, 4], [1, 5, null]],
        [[null, null, 3], [9, null, 8], [null, 2, 4]]
      ];

      var template = this.deepCopy(field);
      var playField = this.deepCopy(field);
      return {
        template,
        playField,
        difficult,
        time: {
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        history: []
      };
    }
  },
  data() {
    return {
      game: this.generateGame(this.$route.params.difficult)
    };
  }
};
</script>
<style lang="scss" scoped>
</style>

