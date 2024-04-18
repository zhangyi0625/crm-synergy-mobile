export const sortList = [
	{
		name: "推荐",
		value: "",
	},
	{
		name: "最便宜",
		value: "price",
	},
	{
		name: "出发最快",
		value: "ETD",
	},
	{
		name: "耗时最短",
		value: "DAY",
	},
];

export const ctnSortPrice = [
	{
		label: "20GP",
		value: "CTN20GP",
	},
	{
		label: "40GP",
		value: "CTN40GP",
	},
	{
		label: "40HQ",
		value: "CTN40HQ",
	},
];

export const dataSource = [
	{
		label: "电商运价",
		value: "OTHER",
	},
	{
		label: "自有运价",
		value: "QMS",
	},
];

export const transitType = [
	{
		label: "直达",
		value: 0,
	},
	{
		label: "中转",
		value: 1,
	},
];

export const quotationType = [
	{
		label: '起运港/目的港：',
		key: 'portInfo'
	},
	{
		label: '船期/航程：',
		key: 'voyDaysInfo'
	},
	{
		label: '船名航次：',
		key: 'vesselInfo'
	},
	{
		label: '船公司：',
		key: 'carrier'
	},
	{
		label: '箱型/海运费：',
		key: 'ctnTypePrice'
	}, {
		label: '附加费：',
		key: 'otherPrice'
	}
]

export const freightTestData = [
	{
		carrierCode: "MSK",
		carrierRoute: "LL2",
		eta: "2024-05-11 00:00:00",
		etd: "2024-04-04 00:00:00",
		id: "1769997302816194562",
		isSale: 1,
		validFrom: "2024-03-26 00:00:00",
		validTo: "2024-04-04 00:00:00",
		vesselName: "METTE MAERSK",
		voyDays: 37,
		voyNo: "412W",
		transitNum: 0,
		productType: "CUSTOMER",
		schedule: "5截/7开",
		priceList: [],
	},
	{
		carrierCode: "COSCO",
		carrierRoute: "EERLI",
		eta: "2024-05-11 00:00:00",
		etd: "2024-04-04 00:00:00",
		id: "1769997302816194562",
		isSale: 1,
		validFrom: "2024-03-26 00:00:00",
		validTo: "2024-04-04 00:00:00",
		vesselName: "METTE MAERSK",
		voyDays: 37,
		voyNo: "412W",
		transitNum: 0,
		productType: "CARRIER",
		schedule: "5截/7开",
		priceList: [],
		porPortResp: {
			cnName: "宁波",
			code: "CNNGB",
			countryCnName: "中国",
			countryCode: "CN",
			countryEnName: "China",
			enName: "Ningbo",
		},
		fndPortResp: {
			cnName: "鹿特丹",
			code: "NLRTM",
			countryCnName: "荷兰",
			countryCode: "NL",
			countryEnName: "Netherlands",
			enName: "Rotterdam",
		},
	},
	{
		carrierCode: "ONE",
		carrierRoute: "LL2",
		eta: "2024-05-11 00:00:00",
		etd: "2024-04-04 00:00:00",
		id: "1769997302816194562",
		isSale: 0,
		validFrom: "2024-03-26 00:00:00",
		validTo: "2024-04-04 00:00:00",
		vesselName: "METTE MAERSK",
		voyDays: 37,
		voyNo: "412W",
		transitNum: 0,
		productType: "CARRIER",
		schedule: "5截/7开",
		priceList: [
			{
				ctnType: "20GP",
				totalPrice: "889",
			},
			{
				ctnType: "40GP",
				totalPrice: "1378",
			},
			{
				ctnType: "40HQ",
				totalPrice: "1378",
			},
		],
		weightRemark: "20GP 货重17.7至21.9吨加收超重费USD150.22吨加收超重费USD500",
		freshRemark: "默认14天免用箱期,申请21天需额外加钱",
		otherRemark: "USD100/250, X5CCAHIUSD100/240",
		porPortResp: {
			cnName: "宁波",
			code: "CNNGB",
			countryCnName: "中国",
			countryCode: "CN",
			countryEnName: "China",
			enName: "Ningbo",
		},
		fndPortResp: {
			cnName: "鹿特丹",
			code: "NLRTM",
			countryCnName: "荷兰",
			countryCode: "NL",
			countryEnName: "Netherlands",
			enName: "Rotterdam",
		},
	},
];