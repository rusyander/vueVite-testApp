<template>
  <div class="dialog" v-if="show === true" @click.stop="hideDialog">
    <div @click.stop class="dialog_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["hideDialog"],
  setup(props, { emit }) {
    const hideDialog = () => {
      emit("update:show", false);
    };
    return {
      hideDialog,
    };
  },
};
</script>

<style>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog_content {
  width: 500px;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  padding-right: 50px;
  overflow: hidden;
}
</style>
