import { computed, onMounted } from "vue";

import { useStore } from "vuex";

const common = () => {
    const store = useStore();

    const menuCollapsed = computed(() => store.state.auth.menuCollapsed);
    const user = computed(() => store.state.auth.user);

    const updatePageTitle = (pageName) => {
        store.commit("auth/updatePageTitle", pageName);
    };

    return {
        menuCollapsed,
        user,
        updatePageTitle,
    };
};

export default common;
