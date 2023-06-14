<template>
    <div class="login-wrapper">
        <a-row class="login-container">
            <a-col :xs="18" :sm="12" :md="8" :lg="6">
                <a-card :title="null" class="login-card" :bordered="true">
                    <a-form layout="vertical">
                        <div class="login-logo">
                            <img class="login-img-logo" :src="'/logo.png'" />
                        </div>
                        <a-form-item :label="$t('email')" name="email">
                            <a-input
                                v-model:value="credentials.email"
                                @pressEnter="onSubmit"
                                :placeholder="
                                    $t('placeholder_text') + $t('email')
                                "
                            />
                        </a-form-item>

                        <a-form-item :label="$t('password')" name="password">
                            <a-input-password
                                v-model:value="credentials.password"
                                @pressEnter="onSubmit"
                                :placeholder="
                                    $t('placeholder_text') + $t('password')
                                "
                            />
                        </a-form-item>

                        <a-form-item>
                            <a-button
                                :loading="loading"
                                @click="onSubmit"
                                class="ant-btn-lg ant-btn-primary"
                                block
                            >
                                {{ $t("login") }}
                            </a-button>
                        </a-form-item>
                    </a-form>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";

import axios from "axios";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

export default defineComponent({
    setup() {
        const { t } = useI18n();
        const store = useStore();
        const router = useRouter();
        const credentials = reactive({
            email: null,
            password: null,
        });

        var loading = ref(false);

        const onSubmit = () => {
            loading.value = true;

            axios
                .post("/api/v1/auth/login", credentials)
                .then((response) => {
                    if (response.data.data.message) {
                        notification.success({
                            placement: "topRight",
                            message: t("success"),
                            description: response.data.data.message,
                        });
                    }
                    store.commit("auth/updateUser", response.data.data.user);
                    store.commit(
                        "auth/updateToken",
                        response.data.data.access_token
                    );
                    router.push({
                        name: "admin.dashboard.index",
                    });
                    loading.value = false;
                })
                .catch((errorResponse) => {
                    notification.error({
                        placement: "topRight",
                        message: t("error"),
                        description:
                            errorResponse.response.data.error ||
                            errorResponse.message ||
                            errorResponse.data.error,
                    });
                    loading.value = false;
                });
        };

        return {
            loading,
            credentials,
            onSubmit,
        };
    },
});
</script>

<style lang="less">
.login-wrapper {
    height: 100vh;
}

.login-container {
    height: 100%;
    justify-content: center;
    padding-top: 10%;
}

.login-logo {
    text-align: center;
    margin-bottom: 30px;
}

.login-img-logo {
    width: 64px;
}

.login-card {
    border-radius: 10px;
}
</style>
