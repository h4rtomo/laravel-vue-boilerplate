<template>
    <a-layout-sider
        :width="240"
        :style="{
            margin: '0 0 0 0',
            overflowY: 'auto',
            position: 'fixed',
            paddingTop: '4px',
            zIndex: 998,
        }"
        :trigger="null"
        :collapsed="menuCollapsed"
        :theme="'dark'"
    >
        <div v-if="menuCollapsed" class="logo">
            <img
                :style="{
                    height: '100%',
                }"
                :src="'/images/logo_small.png'"
            />
        </div>
        <div v-else>
            <img
                :style="{
                    width: '70%',
                    height: '56px',
                    'object-fit': 'contain',
                }"
                :src="'/images/logo_white.png'"
            />
            <CloseOutlined
                v-if="innerWidth <= 991"
                :style="{
                    marginLeft: '45px',
                    marginRight: '0px',
                    marginTop: '10px',
                    color: '#fff',
                }"
                @click="menuSelected"
            />
        </div>

        <div class="main-sidebar">
            <a-menu
                :theme="'dark'"
                :openKeys="openKeys"
                v-model:selectedKeys="selectedKeys"
                :mode="mode"
                @openChange="onOpenChange"
                :style="{ borderRight: 'none' }"
            >
                <a-menu-item
                    @click="
                        () => {
                            menuSelected();
                            $router.push({ name: 'admin.dashboard.index' });
                        }
                    "
                    key="dashboard"
                >
                    <HomeOutlined />
                    <span>{{ $t("dashboard") }}</span>
                </a-menu-item>

                <a-menu-item
                    @click="
                        () => {
                            menuSelected();
                            $router.push({
                                name: 'admin.setting.index',
                            });
                        }
                    "
                    key="settings"
                >
                    <SettingOutlined />
                    <span>{{ $t("settings") }}</span>
                </a-menu-item>

                <a-menu-item @click="logout" key="logout">
                    <LogoutOutlined />
                    <span>{{ $t("logout") }}</span>
                </a-menu-item>
            </a-menu>
        </div>
    </a-layout-sider>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Layout } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
    HomeOutlined,
    LogoutOutlined,
    SettingOutlined,
    CloseOutlined,
} from "@ant-design/icons-vue";
import common from "../utils/common";
const { Sider } = Layout;

export default defineComponent({
    components: {
        Sider,
        Layout,

        HomeOutlined,
        LogoutOutlined,
        SettingOutlined,
        CloseOutlined,
    },
    setup(props, { emit }) {
        const { menuCollapsed } = common();

        const listParentMenu = ["dashboard", "settings"];
        const store = useStore();
        const route = useRoute();

        const innerWidth = window.innerWidth;
        const openKeys = ref([]);
        const selectedKeys = ref([]);
        const mode = ref("inline");

        onMounted(() => {
            var menuKey =
                typeof route.meta.menuKey == "function"
                    ? route.meta.menuKey(route)
                    : route.meta.menuKey;

            if (route.meta.menuParent == "settings") {
                menuKey = "settings";
            }

            if (route.meta.menuParent == "subscription") {
                menuKey = "subscription";
            }

            if (innerWidth <= 991) {
                openKeys.value = [];
            } else {
                openKeys.value = menuCollapsed.value
                    ? []
                    : [route.meta.menuParent];
            }

            selectedKeys.value = [menuKey.replace("-", "_")];
        });

        const logout = () => {
            store.dispatch("auth/logout");
        };

        const menuSelected = () => {
            if (innerWidth <= 991) {
                store.commit("auth/updateMenuCollapsed", true);
            }
        };

        const onOpenChange = (currentOpenKeys) => {
            const latestOpenKey = currentOpenKeys.find(
                (key) => openKeys.value.indexOf(key) === -1
            );

            if (listParentMenu.indexOf(latestOpenKey) === -1) {
                openKeys.value = currentOpenKeys;
            } else {
                openKeys.value = latestOpenKey ? [latestOpenKey] : [];
            }
        };

        return {
            mode,
            selectedKeys,
            openKeys,

            logout,

            innerWidth: window.innerWidth,

            onOpenChange,
            menuSelected,
            menuCollapsed,
        };
    },
});
</script>

<style lang="less">
.main-sidebar {
    height: calc(100vh - 62px);
}

@media only screen and (max-width: 1150px) {
    .ant-layout-sider.ant-layout-sider-collapsed {
        left: -80px !important;
    }
}
</style>
