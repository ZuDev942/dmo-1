import type { RouteRecordRaw } from "vue-router";

import { RouteName } from "@/shared/constants";
import NotFound from "@/modules/notFound/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: RouteName.NOT_FOUND,
    component: NotFound,
  },
  {
    path: "",
    name: RouteName.LOGIN,
    component: () => import("@/modules/login/index.vue"),
    meta: { layout: "defaultNoHeader" },
  },
  {
    path: "shop-lives",
    name: RouteName.SHOP_LIVES,
    component: () => import("@/modules/shopProblem/pages/Lives/index.vue"),
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
  {
    path: "issues",
    name: RouteName.ISSUES,
    component: () => import("@/modules/issue/index.vue"),
    meta: { auth: true },
  },
  {
    path: "issue/:id",
    name: RouteName.ISSUE,
    component: () => import("@/modules/issue/issueDetail/index.vue"),
    meta: { auth: true },
  },
  {
    path: "yourworkV2",
    name: RouteName.YOUR_WORK_V2,
    component: () => import("@/modules/yourWorkV2/index.vue"),
    meta: { auth: true },
  },
];

export default routes;
