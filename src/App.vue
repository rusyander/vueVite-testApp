<template>
  <!-- <AppAuth />
  <AppPosts /> -->
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import AppPosts from "./components/MainPosts.vue";
import AppAuth from "./components/Auth/AppAuth.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
export default {
  components: {
    AppAuth,
    AppPosts,
  },

  provide() {
    return {
      // ngrokUrl: "https://5d46-195-158-16-213.ngrok.io",
      ngrokUrl: "http://localhost:5000",
    };
  },

  setup() {
    const router = useRouter();
    onMounted(() => {
      if (localStorage.getItem("auth") === "true") {
        router.push("/");
      } else {
        router.push("/login");
      }
    });
  },
};
</script>
<style></style>
