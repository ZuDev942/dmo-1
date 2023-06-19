import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";
import { RouteName } from "@/shared/constants";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login-page",
      name: RouteName.LOGIN_PAGE,
      component: () => import("@/modules/yourWork/login/index.vue"),
      meta: { layout: "defaultNoHeader" },
    },
  ],
});

export default router;
