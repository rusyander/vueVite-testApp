<template>
  <input type="text" class="input" :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style>
.input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 15px;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
