const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js").vue();

mix.less("node_modules/ant-design-vue/dist/antd.less", "public/css/antd.css", {
    lessOptions: {
        javascriptEnabled: true,
    },
});

// mix.css("resources/css/app.css", "public/css");

mix.alias({ "@": "resources/js" });

if (mix.inProduction()) {
    mix.version();
}
