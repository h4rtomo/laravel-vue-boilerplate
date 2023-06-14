import { createRouter, createWebHistory } from "vue-router";
import store from "../stores";

import AuthRoutes from "./auth";
import MainRoutes from "./main";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "",
            redirect: "/login",
        },
        ...AuthRoutes,
        ...MainRoutes,
        {
            path: "/:catchAll(.*)",
            redirect: "/dashboard",
        },
    ],
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from, next) => {
    store.commit("auth/updateLoading", false);
    if (to.meta.requireAuth && store.state.auth.user == null) {
        return next({ name: "admin.login" });
    }
    if (store.state.auth.user !== null && to.path == "/admin/login") {
        return next({ name: "admin.dashboard.index" });
    }
    next();
});

export default router;
