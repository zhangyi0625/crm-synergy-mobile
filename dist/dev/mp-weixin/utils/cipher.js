"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
class AesEncryption {
  constructor(opt = {}) {
    __publicField(this, "key");
    __publicField(this, "iv");
    const { key, iv } = opt;
    if (key) {
      this.key = common_vendor.e.parse(key);
    }
    if (iv) {
      this.iv = common_vendor.e.parse(iv);
    }
  }
  get getOptions() {
    return {
      mode: common_vendor.E,
      padding: common_vendor.p,
      iv: this.iv
    };
  }
  encryptByAES(cipherText) {
    return common_vendor.f.encrypt(cipherText, this.key, this.getOptions).toString();
  }
  decryptByAES(cipherText) {
    return common_vendor.f.decrypt(cipherText, this.key, this.getOptions).toString(common_vendor.U);
  }
}
exports.A = AesEncryption;
