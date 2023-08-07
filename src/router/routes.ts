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
    path: "tasks/:id",
    name: RouteName.TASKS,
    component: () => import("@/modules/yourWork/Task/index.vue"),
    meta: { auth: true },
  },
  {
    path: "projects",
    name: RouteName.PROJECTS,
    component: () => import("@/modules/project/index.vue"),
    meta: { auth: true },
  },
  {
    path: "dayoff",
    name: RouteName.DAYOFF,
    component: () => import("@/modules/dayoff/index.vue"),
    meta: { auth: true },
  },
  {
    path: "forgot",
    name: RouteName.FORGOT,
    component: () => import("@/modules/forgotPassword/index.vue"),
    meta: { layout: "defaultNoHeader" },
  },
  {
    path: "absence",
    name: RouteName.ABSENCE,
    component: () => import("@/modules/absence/index.vue"),
    meta: { auth: true },
  },
];

export default routes;
