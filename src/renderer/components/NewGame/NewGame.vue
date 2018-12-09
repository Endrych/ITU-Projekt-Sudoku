<template>
  <app-game :game="game"></app-game>
</template>
<script>
import Game from "../Game/Game";
import Filds from "../../../main/helpers/fields.js";
import fields from "../../../main/helpers/fields.js";
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
      var possFields = fields[difficult];
      var rands = Math.floor(Math.random() * possFields.length);
      var field = possFields[rands];

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

