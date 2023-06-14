<template>
    <div>
        <section id="layout-responsive">
            <a-layout>
                <MainMenu />
                <a-layout>
                    <div
                        :style="{
                            marginLeft:
                                innerWidth <= 991
                                    ? '2px'
                                    : menuCollapsed
                                    ? '80px'
                                    : '240px',
                            minHeight: '100vh',
                        }"
                    >
                        <TopNav />
                        <a-layout-content>
                            <router-view></router-view>
                        </a-layout-content>
                    </div>
                </a-layout>
            </a-layout>
        </section>
    </div>
</template>

<script>
import TopNav from "./TopNav.vue";
import MainMenu from "./MainMenu.vue";
import common from "../utils/common";

export default {
    components: {
        TopNav,
        MainMenu,
    },
    setup() {
        const { menuCollapsed } = common();

        return {
            menuCollapsed,
            innerWidth: window.innerWidth,
        };
    },
};
</script>

<style>
#layout-responsive .logo {
    height: 32px;
    margin: 12px;
    text-align: center;
}
</style>
