import BaseLayout from "../layouts/BaseLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import Setting from "../pages/Setting.vue";
import Profile from "../pages/Profile.vue";

export default [
    {
        path: "/",
        component: BaseLayout,
        children: [
            {
                path: "/dashboard",
                component: Dashboard,
                name: "admin.dashboard.index",
                meta: {
                    requireAuth: true,
                    menuParent: "dashboard",
                    menuKey: (route) => "dashboard",
                },
            },
            {
                path: "/profile",
                component: Profile,
                name: "admin.profile.index",
                meta: {
                    requireAuth: true,
                    menuParent: "profile",
                    menuKey: (route) => "profile",
                },
            },
            {
                path: "/setting",
                component: Setting,
                name: "admin.setting.index",
                meta: {
                    requireAuth: true,
                    menuParent: "setting",
                    menuKey: (route) => "setting",
                },
            },
        ],
    },
];
