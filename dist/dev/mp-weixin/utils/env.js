"use strict";
const name = "Vue3-Vite-TS 基础框架";
const version = "1.3.0";
const scripts = {
  "dev:app": "uni -p app",
  "dev:custom": "uni -p",
  "dev:h5": "uni",
  "dev:h5:ssr": "uni --ssr",
  "dev:mp-alipay": "uni -p mp-alipay",
  "dev:mp-baidu": "uni -p mp-baidu",
  "dev:mp-kuaishou": "uni -p mp-kuaishou",
  "dev:mp-lark": "uni -p mp-lark",
  "dev:mp-qq": "uni -p mp-qq",
  "dev:mp-toutiao": "uni -p mp-toutiao",
  "dev:mp-weixin": "uni -p mp-weixin",
  "dev:quickapp-webview": "uni -p quickapp-webview",
  "dev:quickapp-webview-huawei": "uni -p quickapp-webview-huawei",
  "dev:quickapp-webview-union": "uni -p quickapp-webview-union",
  "build:app": "uni build -p app",
  "build:custom": "uni build -p",
  "build:h5": "uni build --minify",
  "build:h5:ssr": "uni build --ssr",
  "build:mp-alipay": "uni build -p mp-alipay",
  "build:mp-baidu": "uni build -p mp-baidu",
  "build:mp-kuaishou": "uni build -p mp-kuaishou",
  "build:mp-lark": "uni build -p mp-lark",
  "build:mp-qq": "uni build -p mp-qq",
  "build:mp-toutiao": "uni build -p mp-toutiao",
  "build:mp-weixin": "uni build -p mp-weixin --minify",
  "build:quickapp-webview": "uni build -p quickapp-webview",
  "build:quickapp-webview-huawei": "uni build -p quickapp-webview-huawei",
  "build:quickapp-webview-union": "uni build -p quickapp-webview-union",
  lint: "pnpm lint:format & pnpm lint:eslint",
  "lint:eslint": "eslint --max-warnings 0 --fix --ext .js,.cjs,.mjs,.jsx,.ts,.cts,.mts,.tsx,.vue ./src",
  "lint:format": 'prettier --write --loglevel warn "src/**/*.{js,ts,json,tsx,css,less,vue,html,md}"',
  "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.cjs",
  prepare: "husky install"
};
const dependencies = {
  "@alova/adapter-uniapp": "^1.1.1",
  "@alova/mock": "^1.4.0",
  "@dcloudio/uni-app": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-app-plus": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-components": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-h5": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-i18n": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-mp-alipay": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-mp-baidu": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-mp-kuaishou": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-mp-lark": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-mp-qq": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-mp-toutiao": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-mp-weixin": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-quickapp-webview": "3.0.0-alpha-3080220230428002",
  "@fortawesome/fontawesome-free": "^6.4.0",
  "@iconify/iconify": "^3.1.0",
  alova: "^2.3.1",
  "crypto-js": "^4.1.1",
  echarts: "^5.4.2",
  "lodash-es": "^4.17.21",
  pinia: "^2.0.36",
  vue: "^3.2.47"
};
const devDependencies = {
  "@commitlint/cli": "^17.6.3",
  "@commitlint/config-conventional": "^17.6.3",
  "@dcloudio/types": "^3.3.3",
  "@dcloudio/uni-automator": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-cli-shared": "3.0.0-alpha-3080220230428002",
  "@dcloudio/uni-stacktracey": "3.0.0-alpha-3080220230428002",
  "@dcloudio/vite-plugin-uni": "3.0.0-alpha-3080220230428002",
  "@iconify/json": "^2.2.62",
  "@types/crypto-js": "^4.1.1",
  "@types/lodash-es": "^4.17.7",
  "@types/node": "^17.0.45",
  "@typescript-eslint/eslint-plugin": "^5.59.2",
  "@typescript-eslint/parser": "^5.59.2",
  "@unocss/preset-icons": "^0.46.5",
  autoprefixer: "^10.4.14",
  eslint: "^8.40.0",
  "eslint-plugin-vue": "^9.11.1",
  husky: "^8.0.3",
  "lint-staged": "^13.2.2",
  postcss: "^8.4.23",
  prettier: "^2.8.8",
  sass: "^1.62.1",
  typescript: "^5.0.4",
  "uni-mini-router": "^0.0.11",
  "uni-read-pages-vite": "^0.0.6",
  unocss: "^0.51.12",
  "unocss-preset-weapp": "^0.6.2",
  vite: "^4.3.5"
};
const id = "h_mo-Vue3-Vite-TS-basic-framework";
const displayName = "Vue3-Vite-TS 基础框架";
const description = "基于Vue3 SFC ，封装了Unocss、Mock、路由拦截、请求拦截及缓存加密等...适用于新项目，规范代码目录，开箱即用";
const keywords = [
  "vue3",
  "ts",
  "请求/路由拦截",
  "unocss",
  "mock"
];
const dcloudext = {
  category: [
    "uni-app前端模板",
    "uni-app前端项目模板"
  ]
};
const pkg = {
  name,
  version,
  scripts,
  dependencies,
  devDependencies,
  id,
  displayName,
  description,
  keywords,
  dcloudext
};
function getPkgVersion() {
  return `${`__${pkg.version}`}__`.toUpperCase();
}
const devMode = "development";
function getEnvMode() {
  return getEnvValue("VITE_ENV");
}
function getEnvValue(key) {
  const envValue = { "VITE_BASE_URL": "http://192.168.110.124:8885/apis", "VITE_CONSOLE_URL": "http://console.zaicang.net", "VITE_STATIC_URL": "https://wx.zaicang.net", "VITE_USER_NODE_ENV": "development", "VITE_ROOT_DIR": "/Users/zhangyi/Desktop/vue/vue3/Vue3-Vite-TS-uniapp freight- system", "BASE_URL": "/", "MODE": "development", "DEV": true, "PROD": false, "SSR": false }[key];
  return envValue === "true" ? true : envValue === "false" ? false : envValue;
}
function isDevMode() {
  return getEnvMode() === devMode;
}
function isUseMock() {
  return getEnvValue("VITE_USE_MOCK");
}
function getBaseUrl() {
  return getEnvValue("VITE_BASE_URL");
}
exports.a = getEnvValue;
exports.b = getBaseUrl;
exports.c = isUseMock;
exports.g = getPkgVersion;
exports.i = isDevMode;
