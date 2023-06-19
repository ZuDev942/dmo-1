import { createRouter, createWebHistory } from "vue-router";

import { RouteName } from "@/shared/constants";
import Homepage from "@/modules/homepage/index.vue";
import NotFound from "@/modules/notFound/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: RouteName.NOT_FOUND,
      component: NotFound,
    },
    {
      path: "/",
      name: RouteName.HOMEPAGE,
      component: Homepage,
      meta: { layout: "defaultNoHeader" },
    },
    {
      path: "/shop-lives",
      name: RouteName.SHOP_LIVES,
      component: () => import("@/modules/shopProblem/pages/Lives/index.vue"),
      meta: { layout: "defaultNoHeader" },
    },
    {
      path: "/new-registation",
      name: RouteName.NEW_REGISTATION,
      component: () =>
        import("@/modules/shopProblem/pages/NewRegistation/index.vue"),
      meta: { auth: true },
    },
    {
      path: "/your-work",
      name: RouteName.YOUR_WORK,
      component: () => import("@/modules/yourWork/index.vue"),
    },
    {
      path: "/users",
      name: RouteName.USERS,
      component: () => import("@/modules/users/index.vue"),
    },
    {
      path: "/profile",
      name: RouteName.PROFILE,
      component: () => import("@/modules/profile/index.vue"),
    },
    {
      path: "/tasks",
      name: RouteName.TASKS,
      component: () => import("@/modules/yourWork/Task/index.vue"),
    },
    {
      path: "/login-page",
      name: RouteName.LOGIN_PAGE,
      component: () => import("@/modules/yourWork/login/index.vue"),
      meta: { layout: "defaultNoHeader" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem(
    import.meta.env.VITE_ACCESS_TOKEN_NAME
  );

  if (!to.meta.auth) {
    return next();
  }

  if (!accessToken) {
    return next({ name: RouteName.HOMEPAGE });
  }

  return next();
});

export default router;
