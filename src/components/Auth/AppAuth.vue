<template>
  <div class="authForms">
    <form action="submit" @submit.prevent @click="addToAuth">
      <MyInput
        class="formInput"
        type="text"
        placeholder="Логин"
        v-model="login"
      />

      <MyInput
        class="formInput"
        type="password"
        placeholder="Пароль"
        v-model="password"
      />
      <MyButton type="submit" @keypress="addToAuth" @click="addToAuth"
        >Войти</MyButton
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AppAuth",

  setup() {
    const router = useRouter();
    const users = ref([
      {
        login: "admin",
        password: "admin",
      },
      {
        login: "user",
        password: "user",
      },
    ]);
    const login = ref("");
    const password = ref("");

    const addToAuth = () => {
      console.log(login.value, password.value);
      users.value.forEach((user) => {
        if (user.login === login.value && user.password === password.value) {
          localStorage.setItem("auth", "true");
          localStorage.setItem("userName", user.login);

          router.push("/");
          console.log("ok");
          console.log(login.value, password.value);
        } else {
          console.log("no");
          localStorage.setItem("auth", "false");
        }
      });
    };
    return {
      login,
      password,
      addToAuth,
    };
  },
};
</script>

<style>
.authForms {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 500px;
  padding: 20px;
  border: 1px solid teal;
  border-radius: 10px;
}
.formInput {
  width: 94% !important;
  outline: none;
}
</style>
