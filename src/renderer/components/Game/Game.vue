<template>
  <div>
    <div>
      <div class="back-button" v-on:click="goBack">
        <span class="left-arrow">&larr;</span>Hlavní menu
      </div>
    </div>
    <app-field
      class="playfield"
      :playField="playField"
      :currPlayField="currPlayField"
      ref="playfield"
      v-on:selected="select"
    />
    <div class="field-options-container">
      <div class="field-options-container--row" v-for="i in 3" :key="i">
        <div v-for="j in 3" :key="j">
          <div v-on:click="selectValue((i-1)*3 + j)" class="field-option">{{((i-1)*3 + j)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Field from "./Field.vue";

export default {
  beforeMount: function() {
    this.generateField();
  },
  components: {
    "app-field": Field
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    select(select) {
      this.selectedPart = select.part;
      this.selectedRow = select.row;
      this.selectedCol = select.col;
    },
    selectValue(value) {
      console.log(this.currPlayField === this.playField);
      console.log('Before',this.playField, this.currPlayField);

      this.currPlayField[this.selectedPart][this.selectedRow][
        this.selectedCol
      ] = value;
      console.log('After',this.playField, this.currPlayField);
      this.$refs.playfield.update();
    },
    generateField() {
      this.playField = [
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
      this.currPlayField = Object.assign([], this.playField);
    }
  },
  data() {
    return {
      playField: [],
      currPlayField: [],
      selectedPart: null,
      selectedRow: null,
      selectedCol: null
    };
  }
};
</script>
<style lang="scss" scoped>
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