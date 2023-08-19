import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";
import MainLayout from "@/shared/layout/MainLayout/index.vue";
import { RouteName } from "@/shared/constants";
import { useSessionStore } from "@/store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      component: MainLayout,
      children: routes,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // const store = useSessionStore();

  // console.log("auth", store.$state.user?.role);
  // const role = store.$state.user?.role ?? "";

  const accessToken = localStorage.getItem(
    import.meta.env.VITE_ACCESS_TOKEN_NAME
  );

  if (!to.meta.auth) {
    return next();
  }

  // if (to.meta.auth) {
  //   const roles = to.meta.roles as string[]; // Xác định kiểu mảng chuỗi
  //   if (roles && !roles.includes(role)) {
  //     next("/access-denied");
  //   } else {
  //     next();
  //   }
  // }

  if (!accessToken) {
    return next({ name: RouteName.LOGIN });
  }

  return next();
});

export default router;
