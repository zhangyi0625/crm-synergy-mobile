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
    value: "OTHER"
  },
  {
    label: "自有运价",
    value: "QMS"
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
const quotationType = [
  {
    label: "起运港/目的港：",
    key: "portInfo"
  },
  {
    label: "船期/航程：",
    key: "voyDaysInfo"
  },
  {
    label: "船名航次：",
    key: "vesselInfo"
  },
  {
    label: "船公司：",
    key: "carrier"
  },
  {
    label: "箱型/海运费：",
    key: "ctnTypePrice"
  },
  {
    label: "附加费：",
    key: "otherPrice"
  }
];
exports.c = ctnSortPrice;
exports.d = dataSource;
exports.q = quotationType;
exports.s = sortList;
exports.t = transitType;
