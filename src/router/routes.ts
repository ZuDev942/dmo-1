import type { RouteRecordRaw } from "vue-router";

import { RouteName } from "@/shared/constants";
import Homepage from "@/modules/homepage/index.vue";
import NotFound from "@/modules/notFound/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: RouteName.NOT_FOUND,
    component: NotFound,
  },
  {
    path: "",
    name: RouteName.HOMEPAGE,
    component: Homepage,
    meta: { layout: "defaultNoHeader" },
  },
  {
    path: "shop-lives",
    name: RouteName.SHOP_LIVES,
    component: () => import("@/modules/shopProblem/pages/Lives/index.vue"),
    meta: { auth: true },
  },
  {
    path: "new-registation",
    name: RouteName.NEW_REGISTATION,
    component: () =>
      import("@/modules/shopProblem/pages/NewRegistation/index.vue"),
    meta: { auth: true },
  },
  {
    path: "your-work",
    name: RouteName.YOUR_WORK,
    component: () => import("@/modules/yourWork/index.vue"),
    meta: { auth: true },
  },
  {
    path: "users",
    name: RouteName.USERS,
    component: () => import("@/modules/users/index.vue"),
    meta: { auth: true },
  },
  {
    path: "profile",
    name: RouteName.PROFILE,
    component: () => import("@/modules/profile/index.vue"),
    meta: { auth: true },
  },
  {
    path: "tasks",
    name: RouteName.TASKS,
    component: () => import("@/modules/yourWork/Task/index.vue"),
    meta: { auth: true },
  },
  {
    path: "login-page",
    name: RouteName.LOGIN_PAGE,
    component: () => import("@/modules/yourWork/login/index.vue"),
    meta: { layout: "defaultNoHeader", auth: true },
  },
];

export default routes;
