import { request } from "@/utils/http";

/**
 * 运价查询 获取历史查询记录
 * @param
 * @returns
 */
export function getSearchRecent() {
  return request.Get("/api/customer/product/spot/search/recent", {});
}

/**
 * 运价查询 获取航线
 * @param
 * @returns
 */
export function getAreaList() {
  return request.Get("/api/base/route/list", {});
}

/**
 * 运价查询 获取航线对应舱位
 * @param {*} params
 * @returns
 */
export function getRecommendByArea(params: any) {
  return request.Get("/api/customer/product/suggested/zdp/page", {
    params: params,
  });
}

/**
 * 运价查询 获取起运港
 * @param {*} params
 * @returns
 */
export function getLocationList(params: Partial<locationPort>) {
  return request.Get("/api/base/port/getPor", { params: params });
}

/**
 * 运价查询 获取目的港
 * @param {*} params
 * @returns
 */
export function getFndPortList(params: Partial<locationPort>) {
  return request.Get("/api/base/port/getFnd", { params: params });
}

/**
 * 运价查询 获取船公司
 * @param
 * @returns
 */
export function getCarrierList() {
  return request.Get("/api/base/carrier/list");
}
