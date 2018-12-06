<template>
  <app-game :playField="playField" :difficult="$route.params.difficult"></app-game>
</template>
<script>
import Game from "../Game/Game";
const fs = require("fs");
export default {
  components: {
    "app-game": Game
  },
  methods: {
    generateField(difficult) {
      // Get from file

      return [
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
    }
  },
  data() {
    return {
      playField: this.generateField(this.$route.params.difficult)
    };
  }
};
</script>
<style lang="scss" scoped>
</style>

