<script lang="ts" setup>
	import { ref } from 'vue';
	import { useRouter } from "uni-mini-router";

	const router = useRouter()


	const list = ref([
		{
			"id": "1957641228514246658",
			"createTime": "2025-08-19 11:10:15",
			"createId": "1",
			"createName": "管理员",
			"updateTime": "2025-08-19 11:10:15",
			"updateId": "1",
			"updateName": "管理员",
			"projectId": "1955116873741856769",
			"projectSupplierId": "1957277777942085634",
			"productName": "60227 IEC01(BV)-450/750V-2.5",
			"productModel": "60227 IEC01(BV)-450",
			"productSpec": "750V-2.5",
			"productUnit": "米",
			"qty": 200,
			"price": 92,
			"amount": 18400,
			"adjPrice": 150.33,
			"adjAmount": 30066
		},
		{
			"id": "1957641228522635266",
			"createTime": "2025-08-19 11:10:15",
			"createId": "1",
			"createName": "管理员",
			"updateTime": "2025-08-19 11:10:15",
			"updateId": "1",
			"updateName": "管理员",
			"projectId": "1955116873741856769",
			"projectSupplierId": "1957277777942085634",
			"productName": "BVR-450/750V-2.5",
			"productModel": "BVR-450",
			"productSpec": "750V-2.5",
			"productUnit": "米",
			"qty": 100,
			"price": 92,
			"amount": 9200,
			"adjPrice": 150.33,
			"adjAmount": 15033
		},
		{
			"id": "1957641228526829570",
			"createTime": "2025-08-19 11:10:15",
			"createId": "1",
			"createName": "管理员",
			"updateTime": "2025-08-19 11:10:15",
			"updateId": "1",
			"updateName": "管理员",
			"projectId": "1955116873741856769",
			"projectSupplierId": "1957277777942085634",
			"productName": "60227 IEC01(BV)-450/750V-4",
			"productModel": "60227 IEC01(BV)-450",
			"productSpec": "750V-4",
			"productUnit": "米",
			"qty": 60,
			"price": 96,
			"amount": 3960,
			"adjPrice": 156.86,
			"adjAmount": 9411.6
		}
	])

	const value = ref<string>('')

	const radioGroupChange = () => {

	}

	const radioChange = () => {

	}

	const confirm = () => {
		let item = list.value.filter((item) => item.productName === value.value)[0]
		let pages : any = getCurrentPages();
		let prevPage = pages[pages.length - 2];
		uni.setStorageSync('product-item', item)
		// router.back()
		prevPage.$vm["form"] = item;
		// // 返回上级页面的多级参数
		uni.$emit("update", item);
		uni.navigateBack({
			delta: 1,
		});
	}
</script>

<template>

	<view class="enquiry-product relative">
		<view style="background: #EDEDED;" class="px-20 py-24">
			型号-电压等级-规格（单位）
		</view>
		<view v-for="(item, index) in list" class="flex align-center flex-between px-20 py-30" :key="index"
			style="border-bottom: 1px solid #F0F0F0;">
			<view>{{item.productName}}</view>
			<u-radio-group v-model="value" @change="radioGroupChange">
				<u-radio :name="item.productName">
				</u-radio>
			</u-radio-group>
		</view>
		<view class="fixed bottom-0 w-full px-24" style="height: 148px;">
			<button class="pwd-btn mt-20" @click="confirm">确定</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.enquiry-product {
		background: #F7F7F7;
	}

	.u-radio {
		width: 100% !important;
		padding: 20px 30px !important;
	}
</style>