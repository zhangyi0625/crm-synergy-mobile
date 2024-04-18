"use strict";
var ProductType = /* @__PURE__ */ ((ProductType2) => {
  ProductType2["QMS"] = "QMS";
  ProductType2["OTHER"] = "OTHER";
  return ProductType2;
})(ProductType || {});
var priceType = /* @__PURE__ */ ((priceType2) => {
  priceType2["COST"] = "costPrice";
  priceType2["INNER"] = "innerPrice";
  priceType2["OUTER"] = "outerPrice";
  return priceType2;
})(priceType || {});
exports.P = ProductType;
exports.p = priceType;
