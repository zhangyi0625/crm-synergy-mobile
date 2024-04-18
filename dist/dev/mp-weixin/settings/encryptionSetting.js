"use strict";
const utils_env = require("../utils/env.js");
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
const PREFIX = utils_env.a("VITE_APP_CACHE_PREFIX") || utils_env.a("VITE_APP_TITLE") || "UNI_APP_VUE3_TS";
const DEFAULT_PREFIX_KEY = `${PREFIX}${utils_env.g()}`;
const cacheCipher = {
  key: "aQ0{gD1@c_0@oH5:",
  iv: "aF0#gC_$hE1$eA1!"
};
const enableStorageEncryption = !utils_env.i();
exports.D = DEFAULT_PREFIX_KEY;
exports.a = DEFAULT_CACHE_TIME;
exports.c = cacheCipher;
exports.e = enableStorageEncryption;
