<template>
  <div class="field" v-if="playField && currPlayField">
    <div
      class="field-part"
      :class="['field-part-' + index]"
      v-for="(part,index) in playField"
      :key="index"
    >
      <div class="field-row" v-for="(row,index1) in part" :key="index1">
        <div class="field-col" v-for="(col, index2) in row" :key="index2">
          <div v-if="playField[index][index1][index2] === null">
            <div
              :style="[index === selectedPart && index1 === selectedRow && index2 === selectedCol ? {background:'lightblue'}:{}, errorField[index][index1][index2] ? {color:'red'}:{}]"
              class="field-input field-input--active"
              v-on:click="select(index,index1,index2)"
            >{{currPlayField[index][index1][index2]}}</div>
          </div>
          <div v-else>
            <div
              :style="[ errorField[index][index1][index2] ? {color:'red'}:{}]"
              class="field-input field-input--default"
            >{{currPlayField[index][index1][index2]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["playField", "currPlayField"],
  created() {
    for (var i = 0; i < 9; i++) {
      this.errorField[i] = [];
      for (var j = 0; j < 3; j++) {
        this.errorField[i][j] = [false, false, false];
      }
    }
  },
  methods: {
    select(part, row, col) {
      this.selectedPart = part;
      this.selectedRow = row;
      this.selectedCol = col;
      this.$emit("selected", {
        part,
        row,
        col
      });
    },
    update() {
      var old = this.selectedPart;
      this.selectedPart = null;
      this.selectedPart = old;
      this.checkErrors();
    },
    checkErrors() {
      var completed = true;
      for (var i = 0; i < 9; i++) {
        this.errorField[i] = [];
        for (var j = 0; j < 3; j++) {
          this.errorField[i][j] = [false, false, false];
        }
      }
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 3; j++) {
          for (var k = 0; k < 3; k++) {
            const currentValue = this.currPlayField[i][j][k];
            if (!currentValue) {
              completed = false;
            }
            for (var l = 0; l < 3; l++) {
              for (var m = 0; m < 3; m++) {
                const columnValue = this.currPlayField[i][l][m];
                if ((j != l || k != m) && columnValue === currentValue) {
                  this.errorField[i][j][k] = true;
                  this.errorField[i][l][m] = true;
                  completed = false;
                }
              }
            }
            var restOfIndexVerticaly = i % 3;
            var restOfIndexHorizontaly = Math.floor(i / 3);
            for (var l = 0; l < 3; l++) {
              var partIndexVerticaly = l * 3 + restOfIndexVerticaly;
              var partIndexHorizontaly = restOfIndexHorizontaly * 3 + l;
              for (var m = 0; m < 3; m++) {
                const verticalValue = this.currPlayField[partIndexVerticaly][m][
                  k
                ];
                const horizontalValue = this.currPlayField[
                  partIndexHorizontaly
                ][j][m];
                if (verticalValue === currentValue) {
                  if (m !== j || partIndexVerticaly !== i) {
                    this.errorField[i][j][k] = true;
                    this.errorField[partIndexVerticaly][m][k] = true;
                    completed = false;
                  }
                }
                if (horizontalValue === currentValue) {
                  if (m !== k || partIndexHorizontaly !== i) {
                    this.errorField[i][j][k] = true;
                    this.errorField[partIndexHorizontaly][j][m] = true;
                    completed = false;
                  }
                }
              }
            }
          }
        }
      }
      if (completed) {
        this.$emit("complete");
      }
    }
  },
  data() {
    return {
      errorField: [],
      selectedPart: null,
      selectedRow: null,
      selectedCol: null
    };
  }
};
</script>
<style lang="scss" scoped>
.field {
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  border: 5px solid black;

  &-part {
    border: 1px solid black;
  }
  &-row {
    display: flex;
  }

  &-input {
    width: 3rem;
    height: 3rem;
    font-size: 3rem;
    text-align: center;
    border: 1px solid black;
    &--active {
      cursor: pointer;
    }
    &--default {
      background: lightgrey;
    }
  }
}
</style>


