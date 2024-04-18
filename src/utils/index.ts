import { isObject } from "@/utils/is";

/**
 * 深度合并
 * @param src
 * @param target
 */
export function deepMerge<T = any>(src : any = {}, target : any = {}) : T {
	let key : string;
	for (key in target) {
		src[key] = isObject(src[key])
			? deepMerge(src[key], target[key])
			: (src[key] = target[key]);
	}
	return src;
}

/**
 * 对象的key是否都有值
 * @param {any} obj 
 * @return 
 */
export function isFullObject(obj : any) : boolean {
	for (let key in obj) {
		if (!obj[key]) {
			return false
		}
	}
	return true
}