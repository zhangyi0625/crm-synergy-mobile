"use strict";
const utils_cache_storageCache = require("./storageCache.js"), settings_encryptionSetting = require("../../settings/encryptionSetting.js");
const options = {
  prefixKey: settings_encryptionSetting.D,
  key: settings_encryptionSetting.c.key,
  iv: settings_encryptionSetting.c.iv,
  hasEncrypt: settings_encryptionSetting.e,
  timeout: settings_encryptionSetting.a
};
const storage = utils_cache_storageCache.c(options);
function setCache(key, value, expire) {
  storage.set(key, value, expire);
}
function getCache(key) {
  return storage.get(key);
}
function removeCache(key) {
  return storage.remove(key);
}
exports.g = getCache;
exports.r = removeCache;
exports.s = setCache;
