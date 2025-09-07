export interface EnquiryType {
  id?: string | null;
  address: string;
  area: string;
  city: string;
  province: string;
  title: string;
  estimatedAmount: string;
  deadline: string;
  files?: string[];
  remark: string;
  products: ProductsType[];
  status?: string;
  createTime?: string;
  quotations: any;
  viewCount?: string;
  quotationCount?: string;
  confirmQuotationId?: string;
}

export interface ProductsType {
  id: string;
  productName: string;
  productModel: string;
  productSpec: string;
  productUnit: string;
  productVolt: string;
  productId: string;
  qty: number;
  checked: boolean;
}
