import AppAuth from "../components/Auth/AppAuth.vue";
import AppPosts from "../components/MainPosts.vue";
import Page404 from "../utils/Page404.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: AppAuth,
  },
  {
    path: "/",
    component: AppPosts,
  },
  {
    path: "/:404(.*)",
    component: Page404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
