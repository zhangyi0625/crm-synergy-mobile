declare interface locationPort {
  /** 搜索关键字 */
  keyword?: string;
  /** 航线代码 */
  routeId?: string;
  /** 热门港口 */
  isPopularity?: string | number;
}

declare interface freightSearchParams {
  /** 起运港code */
  porCode: string;
  /** 目的港code */
  fndCode: string;
  /** 筛选条件 */
  sortField: string;
  /** 船公司 */
  carriers: string;
  /** 数据来源 */
  dataSource: string;
  /** 中转直达 */
  transitNum: number | null;
  [key: string]: any;
}
