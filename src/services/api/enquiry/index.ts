import { EnquiryType } from "../../model/enquiry";
import { request } from "@/utils/http";

/**
 * 查询客户全部询价
 */
export function getAllEnquiryList(params: { status: string | null }) {
  return request.Get("/customer/inquiry", { params: params });
}

/**
 * 查询询价详情
 */
export function getEnquiryDetail(id: string) {
  return request.Get("/customer/inquiry/" + id);
}

/**
 * 查询询价产品内容（图片）
 */
export function getEnquiryProductPic(id: string) {
  return request.Get("/customer/file/relative/" + id);
}

/**
 * 取消询价
 */
export function putCancelEnquiry(id: string) {
  return request.Put("/customer/inquiry/cancel/" + id);
}

/**
 * 添加客户全部询价
 */
export function postEnquiry(data: EnquiryType) {
  return request.Post("/customer/inquiry", data);
}

/**
 * 修改客户全部询价
 */
export function putEnquiry(data: EnquiryType) {
  return request.Put("/customer/inquiry", data);
}

/**
 * 获取产品
 */

export function getAllProduct() {
  return request.Get("/customer/inquiry/product");
}

/**
 * 设置备选供应商
 */

export function postSettingEnquiry(id: string) {
  return request.Put("/customer/inquiry/alternative/" + id);
}

/**
 * 确认报价
 */

export function postConfirmEnquiry(data: { id: string; quotationId: string }) {
  return request.Put("/customer/inquiry/confirmQuotation", data);
}
