"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../../common/vendor.js"), settings_encryptionSetting = require("../../settings/encryptionSetting.js"), utils_cipher = require("../cipher.js"), utils_is = require("../is.js");
const createStorage = ({
  prefixKey = "",
  key = settings_encryptionSetting.c.key,
  iv = settings_encryptionSetting.c.iv,
  timeout = null,
  hasEncrypt = true
} = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error("When hasEncrypt is true, the key or iv must be 16 bits!");
  }
  const encryption = new utils_cipher.A({ key, iv });
  class Storage {
    /**
     *
     * @param {*} storage
     */
    constructor() {
      __publicField(this, "prefixKey");
      __publicField(this, "encryption");
      __publicField(this, "hasEncrypt");
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }
    getKey(key2) {
      return `${this.prefixKey}${key2}`.toUpperCase();
    }
    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds
     * @memberof Cache
     */
    set(key2, value, expire = timeout) {
      try {
        const stringData = JSON.stringify({
          value,
          time: Date.now(),
          expire: !utils_is.i(expire) ? (/* @__PURE__ */ new Date()).getTime() + expire * 1e3 : null
        });
        const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
        common_vendor.i.setStorageSync(this.getKey(key2), stringifyValue);
      } catch (err) {
        throw new Error(`setStorageSync error: ${err}`);
      }
    }
    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @memberof Cache
     */
    get(key2, def = null) {
      const val = common_vendor.i.getStorageSync(this.getKey(key2));
      if (!val)
        return def;
      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (utils_is.i(expire) || expire < (/* @__PURE__ */ new Date()).getTime()) {
          this.remove(key2);
          return def;
        }
        return value;
      } catch (e) {
        return def;
      }
    }
    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key2) {
      common_vendor.i.removeStorageSync(this.getKey(key2));
    }
    /**
     * Delete all caches of this instance
     */
    clear() {
      common_vendor.i.clearStorageSync();
    }
  }
  return new Storage();
};
exports.c = createStorage;
