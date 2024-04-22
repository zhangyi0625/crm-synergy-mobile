import { ResultEnum } from "@/enums/httpEnum";

declare interface API<T = any> {
	code : ResultEnum;
	data ?: T;
	message : string;
}

declare interface BasicArrItem {
	label : string;
	value : string;
	[key : string | number] : any
}