"use strict";
const sortList = [
  {
    name: "推荐",
    value: ""
  },
  {
    name: "最便宜",
    value: "price"
  },
  {
    name: "出发最快",
    value: "ETD"
  },
  {
    name: "耗时最短",
    value: "DAY"
  }
];
const ctnSortPrice = [
  {
    label: "20GP",
    value: "CTN20GP"
  },
  {
    label: "40GP",
    value: "CTN40GP"
  },
  {
    label: "40HQ",
    value: "CTN40HQ"
  }
];
const dataSource = [
  {
    label: "电商运价",
    value: "ZDP"
  },
  {
    label: "线下运价",
    value: "QMS"
  },
  {
    label: "现舱",
    value: "SPOT"
  }
];
const transitType = [
  {
    label: "直达",
    value: 0
  },
  {
    label: "中转",
    value: 1
  }
];
const basicCarriers = ["QMS", "MSK", "CMA", "COSCO", "HPL", "EMC", "ONE", "OOCL", "MSC", "ZIM"];
exports.b = basicCarriers;
exports.c = ctnSortPrice;
exports.d = dataSource;
exports.s = sortList;
exports.t = transitType;
