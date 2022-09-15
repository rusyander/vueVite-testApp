<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
  name: "MyButton",
};
</script>

<style>
.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 20px;
  background: none;
  color: teal;
  border: 1px solid teal;
  margin-right: 15px;
  border-radius: 5px;
}
</style>
