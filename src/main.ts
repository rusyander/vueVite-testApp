import { createApp } from "vue";
import App from "./App.vue";
import component from "./components/UI";
import router from "./router/router";

const app = createApp(App);

component.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).mount("#app");
