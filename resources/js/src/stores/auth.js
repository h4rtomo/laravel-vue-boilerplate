const AUTH_USER = "auth_user";
const AUTH_TOKEN = "auth_token";

const getValueLocalStorage = (key) => {
    const value = window.localStorage.getItem(key);

    if (
        value === "undefined" ||
        value === "null" ||
        value === undefined ||
        value === null
    ) {
        return null;
    } else {
        return JSON.parse(value);
    }
};

export default {
    namespaced: true,
    state() {
        return {
            user: getValueLocalStorage(AUTH_USER),
            token: window.localStorage.getItem(AUTH_TOKEN) || null,
            appLoading: true,
            menuCollapsed: window.innerWidth <= 991 ? true : false,
        };
    },

    mutations: {
        updateUser(state, user) {
            state.user = user;
            window.localStorage.setItem(AUTH_USER, JSON.stringify(user));
        },
        updateLoading(state, payload) {
            state.appLoading = payload;
        },
        updateToken(state, token) {
            state.token = token;
            window.localStorage.setItem(AUTH_TOKEN, token);
        },
        updateMenuCollapsed(state, menuCollapsed) {
            state.menuCollapsed = menuCollapsed;
        },
    },

    actions: {
        logout(context) {
            context.commit("updateUser", null);
            context.commit("updateToken", null);
            window.location.href = "/";
        },
    },

    getters: {
        isLoggedIn: (state) => {
            if (state.token === null || state.token === "") {
                return false;
            }
            return true;
        },
    },
};
