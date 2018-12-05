<template>
  <div class="field">
    <div class="field-part" v-for="(part,index) in playField" :key="index">
      <div class="field-row" v-for="(row,index1) in part" :key="index1">
        <div class="field-col" v-for="(col, index2) in row" :key="index2">
          <div v-if="playField[index][index1][index2] === null">
            <div
              :style="[index === selectedPart && index1 === selectedRow && index2 === selectedCol ? {background:'lightblue'}:{}]"
              class="field-input field-input--active"
              v-on:click="select(index,index1,index2)"
            >{{currPlayField[index][index1][index2]}}</div>
          </div>
          <div v-else>
            <div class="field-input field-input--default">{{currPlayField[index][index1][index2]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["playField", "currPlayField"],
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
    }
  },
  data() {
    return {
      //   currPlayField: [],
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


