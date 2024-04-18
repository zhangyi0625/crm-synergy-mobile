import { request } from "@/utils/http";


/**
 * 上传文件
 */
export function uploadFileUrl(data : any) {
	return request.Post('/api/file/upload', data);
}

/**
 * 删除指定文件
 */
export function deleteFileUrl(data : any) {
	return request.Post('/api/file/deleteByUrl', data);
}