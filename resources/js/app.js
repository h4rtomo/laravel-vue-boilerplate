require("./src/helpers");

import { createApp } from "vue";
import Antd from "ant-design-vue";

import App from "./src/App.vue";

import store from "./src/stores";
import routes from "./src/routes";
import { defaultLocale } from "./src/lang";
import { setupI18n, loadLocaleMessages } from "./src/configs/i18n";

async function bootstrap() {
    const app = createApp(App);

    const i18n = setupI18n({
        legacy: false,
        globalInjection: true,
        locale: defaultLocale,
        warnHtmlMessage: false,
    });
    await loadLocaleMessages(i18n, defaultLocale);

    app.use(i18n);
    app.use(Antd);
    app.use(store);
    app.use(routes);

    window.i18n = i18n;

    app.mount("#app");
}

bootstrap();
