<template>
  <MyButton @click.stop="returning">Вернуться</MyButton>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Page404",

  setup() {
    const router = useRouter();
    const returning = () => {
      if (localStorage.getItem("auth") === "true") {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    return {
      returning,
    };
  },
};
</script>

<style></style>
