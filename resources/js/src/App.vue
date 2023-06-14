<template>
    <router-view v-slot="{ Component, route }">
        <suspense>
            <template #default>
                <a-config-provider>
                    <div class="theme-container">
                        <ThemeProvider :theme="{ ...theme }">
                            <Loading v-if="appLoading" />
                            <component
                                v-else
                                :is="Component"
                                :key="route.name"
                            />
                        </ThemeProvider>
                    </div>
                </a-config-provider>
            </template>
            <template #fallback> Loading... </template>
        </suspense>
    </router-view>
</template>

<script>
import { onMounted, computed } from "vue";

import { useStore } from "vuex";
import { ThemeProvider } from "vue3-styled-components";

import { theme } from "./configs/theme";
import Loading from "./components/molecules/Loading.vue";

export default {
    name: "App",
    components: {
        ThemeProvider,
        Loading,
    },
    setup() {
        const store = useStore();
        const appLoading = computed(() => store.state.auth.appLoading);

        onMounted(() => {
            console.log("onMounted");
            store.commit("auth/updateLoading", false);
        });
        return {
            theme,
            appLoading,
        };
    },
};
</script>

<style>
body {
    font-family: "Nunito", "sans-serif";
    background: #88b7a5 !important;
}
</style>
