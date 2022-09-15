<template>
  <select
    class="selectedFilter"
    name=""
    id=""
    v-model="modelValue"
    @change="changeOptions"
  >
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: String,
    options: Array,
  },
  methods: {
    changeOptions(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style>
.selectedFilter {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 20px;
  background: none;
  color: teal;
  border: 1px solid teal;
  margin-right: 15px;
  border-radius: 5px;
  outline: none;
}
</style>
