declare interface locationPort {
	/** 起运港 */
	por ?: number | string | null;
	/** 目的港 */
	fnd ?: number | string | null;
	/** 搜索关键字 */
	keyword ?: string;
	/** 航线代码 */
	routeId ?: string;
	/** 热门港口 */
	popularity ?: string | number;
}

declare interface freightSearchParams {
	/** 起运港code */
	por : string;
	/** 目的港code */
	fnd : string;
	/** 船司Code */
	carrier ?: string;
	/** 直航中转 */
	transit ?: string | number | null;
	/** 舱位类型 */
	channel ?: string;
	/** 标签 */
	tagId ?: string;
	/** 航线代码 */
	routeId ?: string;
	/** 状态 */
	status ?: number;
	/** 排序 */
	sort ?: string
	[key : string] : any;
}

declare interface FreightTask {
	carrierList : Array<string>;
	porCode : string;
	fndCode : string;
	etdStart : string;
	etdEnd : string;
}