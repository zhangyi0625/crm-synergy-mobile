import { request } from "@/utils/http";

/**
 * 运价查询 获取历史查询记录
 * @param
 * @returns
 */
export function getSearchRecent() {
	return request.Get("/api/app/my/searchPortList");
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
export function getRecommendByArea(params : any) {
	return request.Get("/api/customer/product/suggested/zdp/page", {
		params: params,
	});
}

/**
 * 运价查询 获取起运港
 * @param {*} params
 * @returns
 */
export function getLocationList(params : Partial<locationPort>) {
	return request.Get("/api/app/base/port/list", { params: params });
}

/**
 * 运价查询 获取船公司
 * @param
 * @returns
 */
export function getCarrierList() {
	return request.Get("/api/base/carrier/list");
}

/**
 * 运价查询 获取运价列表
 * @param
 * @returns
 */
export function getFreightOptions(params : any) {
	return request.Get("/api/app/frt/list", { params: params });
}

/**
 * 运价查询 获取运价详情
 * @param
 * @returns
 */
export function getFreightDetail(id : string | number) {
	return request.Get("/api/app/frt/detail/" + id);
}


/**
 * 运价查询 获取收藏港口
 * @param
 * @returns
 */
export function getCollectPort() {
	return request.Get("/api/app/my/getFavoritePortList");
}

/**
 * 运价查询 删除收藏港口
 * @param
 * @returns
 */
export function deleteCollectPort(id : string | number) {
	return request.Delete("/api/app/my/deleteFavoritePort/" + id);
}


/**
 * 运价查询 创建运价实时任务
 * @param
 * @returns
 */
export function postCreateTaskFreight(data : FreightTask) {
	return request.Post("/api/zc/createTask", data);
}

/**
 * 运价查询 获取运价实时数据
 * @param
 * @returns
 */
export function getNewFreight(taskId : string | number) {
	return request.Get("/api/zc/taskResult/" + taskId);
}


/**
 * 运价查询 分享运价数据
 * @param
 * @returns
 */
export function getFreightByShare(key : string | number) {
	return request.Get("/api/app/share/freight/" + key);
}


/**
 * 运价查询 回显分享相关运价
 * @param
 * @returns
 */
export function postFreightByShare(data : any) {
	return request.Post("/api/app/share/freight", data);
}