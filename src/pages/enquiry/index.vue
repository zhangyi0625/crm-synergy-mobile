<script lang="ts" setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { formatUpdated } from "@/utils/time";
	import { invalidateCache, useRequest } from "alova";
	import { deleteCollectPort, getCollectPort } from "@/services/api/freight";
	import { useRouter } from "uni-mini-router";
	import { reactive, ref } from "vue";
	import { Toast } from "@/utils/uniapi/prompt";


	const isUpload = ref<boolean>(false)

	const form = reactive({
		title: '',
		price: '',
		area: '',
		date: ''
	})

	const date = ref(Number(new Date()))

	const show = ref<boolean>(false)

	const productList = ref([] as any)


	const router = useRouter()

	onLoad(() => {
		uni.$off("update"); //先销毁一次监听，再进行新的一次监听，否则会出现重复监听的现象
		//监听修改后传递过来的数据
		uni.$on("update", (data) => {
			console.log(data, 'da', form);
			productList.value.push(data)
		});
	});

	const deleteItem = (index : number) => {
		uni.showModal({
			title: '',
			content: '确定删除该产品吗？',
			success(res) {
				if (res.confirm) {
					productList.value.splice(index, 1)
				}
			}
		});
	}

	// 页面初始化
	onShow(() => {
		// isSend()
		// invalidateCache(getCollectPort())
	})

	// const { data: collectData, send: isSend } : any = useRequest(getCollectPort(), { initialData: [] })

	// 取消收藏
	const { send: isDelete, onSuccess: onSuccess } : any = useRequest((id) => deleteCollectPort(id), { immediate: false })

	onSuccess(() => {
		// isSend()
		// invalidateCache(getCollectPort())
	})

	// 跳转运价列表
	// const jump = (item : any) => {
	// 	let porInfo = item.porCnlName + '-' + item.porEnName
	// 	let fndInfo = item.fndCnlName + '-' + item.fndEnName
	// 	router.push({
	// 		// path: "/pagesA/freight/index?info=" + JSON.stringify(item),
	// 		path: `/pagesA/freight/index?porCode=${item.porCode}&fndCode=${item.fndCode}&porInfo=${porInfo}&fndInfo=${fndInfo}`
	// 	});
	// }

	const releaseEnquiry = () => {
		if (!form.title) {
			Toast('请输入询价标题')
			return
		}
		if (!form.price) {
			Toast('请输入预估金额')
			return
		}
		if (!form.area) {
			Toast('请选择城市/区县')
			return
		}
		if (!form.date) {
			Toast('请选择截止报价日期')
			return
		}
		if (!productList.value.length) {
			Toast('请添加产品')
			return
		}
	}

	const onChange = () => {
		isUpload.value = !isUpload.value
	}

	const jump = () => {
		router.push({
			path: '/pages/enquiry/enquiry-product'
		})
	}

	const openDate = () => {
		show.value = true
	}
</script>

<template>
	<view class="enquiry">
		<view class="h-104 bg-neutral flex align-center flex-around">
			<view class="relative title" @click="onChange">手动填写<span :class="[!isUpload ? 'line' : '']"></span></view>
			<view class="relative title" @click="onChange"><span :class="[isUpload ? 'line' : '']"></span>上传文件</view>
		</view>
		<view class="mt-20 bg-neutral px-24 py-24">
			<view class="flex flex-column">
				<view><span class="dull-red">*</span>询价标题</view>
				<view class="enquiry-input mt-10">
					<input type="text" v-model="form.title" placeholder="请输入询价标题" />
				</view>
			</view>
			<view class="flex flex-column mt-30">
				<view><span class="dull-red">*</span>预估金额</view>
				<view class="enquiry-input mt-10">
					<input type="text" v-model="form.price" placeholder="请输入预估金额" />
				</view>
			</view>
			<view class="flex flex-column mt-30">
				<view><span class="dull-red">*</span>城市/区县</view>
				<view class="enquiry-input mt-10 relative">
					<input type="text" v-model="form.price" disabled placeholder="请选择城市/区县" />
					<img src="/static/home/right.png" class="w-12 h-24 ml-8 absolute" style="right: 12px;top: 40%;"
						alt="">
				</view>
			</view>
			<view class="flex flex-column mt-30">
				<view><span class="dull-red">*</span>截止报价日期</view>
				<view class="enquiry-input mt-10 relative">
					<input type="text" v-model="form.date" disabled @click="openDate" placeholder="请选择截止报价日期" />
					<img src="/static/home/right.png" class="w-12 h-24 ml-8 absolute" style="right: 12px;top: 40%;"
						alt="">
				</view>
			</view>
		</view>
		<view v-for="(item,index) in productList" :key="index" class="bg-neutral px-24 py-24 mt-20">
			<view class="flex align-center flex-between">
				<view style="color: #8C8C8C;">型号-电压等级-规格</view>
				<img src="/static/home/delete.png" class="w-36 h-36" @click="deleteItem(index)" alt="">
			</view>
			<view class="dull-grey font-bold pb-20 mt-10" style="border-bottom: 1px solid #F0F0F0;">{{item.productName}}
			</view>
			<view class="flex align-center flex-between mt-20">
				<view>单位：{{item.productUnit}}</view>
				<view class="flex align-center">
					<view style="color: #8C8C8C;" class="mr-12">采购数量</view>
					<u-number-box :min="1" :max="100"></u-number-box>
				</view>
			</view>
		</view>
		<view class="py-24 bg-neutral flex align-center flex-center mt-20">
			<img src="/static/home/add.png" class="w-36 h-36" alt="">
			<view class="font-400 font28 dull-blue ml-10" @click="jump">添加产品</view>
		</view>
		<view class="mx-24">
			<button class="pwd-btn mt-20" @click="releaseEnquiry">发布询价</button>
		</view>
		<u-picker v-model="show" mode="time"></u-picker>
	</view>
</template>

<style lang="scss" scoped>
	.enquiry {
		background: #F7F7F7;
		// overflow: hidden;

		.title {

			.line {
				position: absolute;
				width: 64px;
				height: 4px;
				background: #1677FF;
				bottom: -13px;
				left: -6px;
			}
		}

		.enquiry-input {
			width: 100%;
			height: 44px;
			line-height: 44px;
			padding: 12px;
			background: #F5F5F5;
			border-radius: 6px;
		}

		// .line {
		// 	width: 2rpx;
		// 	height: 40rpx;
		// 	background: #edeff2;
		// 	margin: 8rpx 0 8rpx 18rpx;
		// }
	}
</style>