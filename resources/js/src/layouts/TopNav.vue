<template>
    <a-layout-header :style="{ padding: '0 16px' }">
        <a-row>
            <a-col :span="4">
                <a-space>
                    <MenuOutlined
                        :style="{
                            color: '#fff',
                        }"
                        class="btn-menu"
                        @click="showHideMenu"
                    />
                </a-space>
            </a-col>
            <a-col :span="20">
                <div
                    :style="{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }"
                >
                    <a-space>
                        <a-divider type="vertical" />
                        <a-button
                            type="link"
                            @click="
                                () => {
                                    $router.push({
                                        name: 'admin.profile.index',
                                    });
                                }
                            "
                            :style="{
                                color: '#fff',
                            }"
                        >
                            {{ user.name }}
                        </a-button>
                    </a-space>
                </div>
            </a-col>
        </a-row>
    </a-layout-header>
</template>

<script>
import { useStore } from "vuex";
import { MenuOutlined } from "@ant-design/icons-vue";
import common from "../utils/common";

export default {
    components: {
        MenuOutlined,
    },
    setup() {
        const { user, menuCollapsed } = common();
        const store = useStore();

        const showHideMenu = () => {
            store.commit("auth/updateMenuCollapsed", !menuCollapsed.value);
        };

        return {
            showHideMenu,
            user,
        };
    },
};
</script>

<style lang="less">
.btn-menu {
    font-size: 18px;
    line-height: 64px;
    padding-top: 4px;
    cursor: pointer;
    transition: color 0.3s;
}

.btn-menu:hover {
    color: #1890ff;
}
</style>
