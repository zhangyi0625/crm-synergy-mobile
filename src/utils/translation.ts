
export function freightDataTranslate(arr : Array<any>) {
	arr.map((el : any) => {
		el.channel = 'ZDP'
	})
	return arr
}