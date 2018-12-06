<template>
  <div>
    <app-game v-if="game !== null" :game="game"></app-game>
  </div>
</template>
<script>
import { readFile, writeFile } from "fs";
import Game from "../Game/Game";

export default {
  components: {
    "app-game": Game
  },
  mounted() {
    var name = this.$route.params.name;
    readFile("./saved-games.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      var items = JSON.parse(data);
      this.game = items[name];
    });
  },
  data() {
    return {
      game: null
    };
  }
};
</script>
<style lang="scss" scoped>
</style>

