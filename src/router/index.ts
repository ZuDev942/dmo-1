import { createRouter, createWebHistory } from "vue-router";

import { RouteName } from "@/shared/constants";
import Homepage from "@/modules/homepage/index.vue";
import NotFound from "@/modules/notFound/index.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [],
});

// router.beforeEach((to, from, next) => {
//   const accessToken = localStorage.getItem(
//     import.meta.env.VITE_ACCESS_TOKEN_NAME
//   );

//   if (!to.meta.auth) {
//     return next();
//   }

//   if (!accessToken) {
//     return next({ name: RouteName.HOMEPAGE });
//   }

//   return next();
// });

export default router;
