import Login from "../pages/Login.vue";

export default [
    {
        path: "/login",
        component: Login,
        name: "admin.login",
        meta: {
            requireUnauth: true,
            menuKey: (route) => "login",
        },
    },
];
