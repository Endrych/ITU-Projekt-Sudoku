<template>
  <div class="modal-buttons">
    <div class="modal-button modal-button--confirm" v-on:click="firstClick">{{FirstTitle}}</div>
    <div class="modal-button modal-button--back" v-on:click="secondClick">{{SecondTitle}}</div>
  </div>
</template>
<script>
export default {
  props: ["FirstTitle", "SecondTitle"],
  methods: {
    firstClick() {
      this.$emit("first-click");
    },
    secondClick() {
      this.$emit("second-click");
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-buttons {
  display: flex;
  justify-content: center;
}
.modal-button {
  border: 1px solid lightgray;
  padding: 1rem 4rem;
  font-size: 25px;

  user-select: none;
  cursor: pointer;
  color: white;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
  &--confirm {
    background: #007bff;
    border-radius: 5px;

	&:hover{
		background:darken(#007bff, 10%)
	}
	&:active{
		background:darken(#007bff, 20%)
	}
  }
  &--back {
    background: red;
    border-radius: 5px;

	&:hover{
		background:darken(red, 10%)
	}
	&:active{
		background:darken(red, 20%)
	}
  }
}
</style>

