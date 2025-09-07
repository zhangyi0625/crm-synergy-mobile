<script lang="ts" setup>
	import { onLoad, onReady, onShow } from "@dcloudio/uni-app";
	import { formatTime, formatUpdated } from "@/utils/time";
	import { invalidateCache, useRequest } from "alova";
	import { deleteCollectPort, getCollectPort } from "@/services/api/freight";
	import { useRouter } from "uni-mini-router";
	import { reactive, ref } from "vue";
	import { Toast } from "@/utils/uniapi/prompt";
	import { getCache } from "@/utils/cache";
	import { TOKEN_KEY } from "@/enums/cacheEnum";
	import { getCityInfo } from "@/services/api/user";
	// import type { EnquiryType } from '@/services/model/enquiry;
	import { postEnquiry, getAllProduct } from '@/services/api/enquiry';


	interface DateType {
		year : string
		month : string
		day : string
		timestamp : number
	}

	interface CityType {
		index : number
		label : string
		value : string
	}

	const router = useRouter()

	const URL = import.meta.env.VITE_BASE_URL;

	const isUpload = ref<boolean>(false)

	const form = reactive<EnquiryType>({
		address: '',
		area: '',
		province: '',
		city: '',
		title: '',
		estimatedAmount: '',
		deadline: '',
		files: [],
		remark: '',
		products: []
	})


	const date = ref(Number(new Date()))

	const show = ref<boolean>(false)

	const productList = ref([] as any)

	const cityShow = ref<boolean>(false)

	const multiSelector = ref([])

	const fileList = ref<any>([])


	// 获取系统省市区
	const { data: cityInfo, send: cityInfoSend, onSuccess: cityInfoSuccess } : any = useRequest(getCityInfo(), { immediate: true });
	cityInfoSuccess(() => {
		if (cityInfo.value.length) {
			multiSelector.value = filterTree(cityInfo.value)
		}
	})


	const filterTree = (
		treeData : any
	) => {
		if (!treeData.length) return []
		return treeData.reduce((result : any[], node : any) => {
			// 检查当前节点是否匹配
			// const isMatch = node.menuType !== keyword
			// 递归处理子节点
			const children = filterTree(node.children || [])
			// console.log(treeData, result);
			// 如果当前节点匹配或有匹配的子节点，则保留该节点
			if (children) {
				result.push({
					...node,
					children: children.length ? children : undefined,
				})
			}
			return result
		}, [])
	}


	onLoad(() => {
		uni.$off("update"); //先销毁一次监听，再进行新的一次监听，否则会出现重复监听的现象
		//监听修改后传递过来的数据
		uni.$on("update", (data) => {
			console.log(data, 'da', form);
			productList.value = data
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

	const defaultTime = ref<string>('')

	onReady(() => {
		defaultTime.value = formatTime(new Date() as unknown as string, 'Y-M-D')
		console.log(defaultTime.value);
	})

	// 页面初始化
	onShow(() => {
	})

	const { send: sendEnquiy, onSuccess: enquirySuccess } : any =
		useRequest(postEnquiry(form), { immediate: false });

	enquirySuccess(() => {
		Toast('发布询价成功')
		router.replace('/pages/myEnquiry/index')
	})

	const releaseEnquiry = () => {
		if (!form.title) {
			Toast('请输入询价标题')
			return
		}
		if (!form.estimatedAmount) {
			Toast('请输入预估金额')
			return
		}
		if (!form.address) {
			Toast('请选择城市/区县')
			return
		}
		if (!form.deadline) {
			Toast('请选择截止报价日期')
			return
		}
		if (!isUpload.value && !productList.value.length) {
			Toast('请添加产品')
			return
		}
		if (isUpload.value && !fileList.value.length) {
			Toast('请上传图片')
			return
		}

		console.log(form, 'ssss', fileList.value);
		// return
		form.files = fileList.value.map((item : any) => item.id)
		form.products = productList.value
		sendEnquiy()
		wx.removeStorageSync('product')
	}

	const onChange = () => {
		isUpload.value = !isUpload.value
	}

	const jumpEither = () => {
		console.log('zzzzz');
		router.push({
			path: '/pages/enquiry/enquiry-product'
		})
	}

	const openDate = () => {
		show.value = true
	}


	const confirm = (value : CityType[]) => {
		form.province = (value[0] as CityType).label
		form.city = (value[1] as CityType).label
		form.area = (value[2] as CityType).label
		form.address = (value[0] as CityType).label + (value[1] as CityType).label + (value[2] as CityType).label
	}

	const dateConfirm = (value : DateType) => {
		form.deadline = value.year + '-' + value.month + '-' + value.day
	}

	const handleUpload = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ["album", "camera"], //从相册选择
			success: function (res) {
				const tempFiles : any = res.tempFilePaths
				uni.uploadFile({
					url: URL + '/customer/file/upload',
					filePath: tempFiles[0],
					name: 'file',
					header: {
						'authorization': 'Bearer ' + getCache(TOKEN_KEY)
					},
					success: (uploadFileRes : any) => {
						let result = JSON.parse(uploadFileRes.data)
						if (result.code === 200) {
							Toast('上传成功！')
							// onFinish(result.data)
							fileList.value.push({
								...result.data,
								temUrl: tempFiles[0]
							})
							console.log(fileList.value, 'filelist', tempFiles);
						} else Toast(result.message)
					}
				});
			},
		});
	}

	const deleteUpload = (index : number) => {
		fileList.value.splice(index, 1)
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
					<input type="text" v-model="form.title" placeholder="请输入询价标题（25个字以内）" />
				</view>
			</view>
			<view class="flex flex-column mt-30">
				<view><span class="dull-red">*</span>预估金额</view>
				<view class="enquiry-input mt-10">
					<input type="text" v-model="form.estimatedAmount" placeholder="请输入预估金额" />
				</view>
			</view>
			<view class="flex flex-column mt-30">
				<view><span class="dull-red">*</span>城市/区县</view>
				<view class="enquiry-input mt-10 relative">
					<input type="text" v-model="form.address" @click="cityShow = true" disabled
						placeholder="请选择城市/区县" />
					<img src="/static/home/right.png" class="w-12 h-24 ml-8 absolute" style="right: 12px;top: 40%;"
						alt="">
				</view>
			</view>
			<view class="flex flex-column mt-30">
				<view><span class="dull-red">*</span>截止报价日期</view>
				<view class="enquiry-input mt-10 relative">
					<input type="text" v-model="form.deadline" disabled @click="openDate" placeholder="请选择截止报价日期" />
					<img src="/static/home/right.png" class="w-12 h-24 ml-8 absolute" style="right: 12px;top: 40%;"
						alt="">
				</view>
			</view>
			<view class="flex flex-column mt-30">
				<view>简要说明</view>
				<view class="enquiry-input mt-10" style="height: 82px;padding:12px;line-height: unset;">
					<textarea v-model="form.remark" style="height: 82px !important;" placeholder="请填写" />
				</view>
			</view>
		</view>
		<view>
			<view v-for="(item,index) in productList" :key="index" class="bg-neutral px-24 py-24 mt-20">
				<view class="flex align-center flex-between">
					<view style="color: #8C8C8C;">型号-电压等级-规格</view>
					<img src="/static/home/delete.png" class="w-36 h-36" @click="deleteItem(index)" alt="">
				</view>
				<view class="dull-grey font-bold pb-20 mt-10" style="border-bottom: 1px solid #F0F0F0;">
					{{item.productName}}
				</view>
				<view class="flex align-center flex-between mt-20">
					<view>单位：{{item.productUnit}}</view>
					<view class="flex align-center">
						<view style="color: #8C8C8C;" class="mr-12">采购数量</view>
						<u-number-box :min="1" :max="100" v-model="item.qty"></u-number-box>
					</view>
				</view>
			</view>
		</view>
		<view class="py-24 bg-neutral flex align-center flex-center mt-20" @click.stop="jumpEither" v-if="!isUpload">
			<img src="/static/home/add.png" class="w-36 h-36" alt="" />
			<view class="font-400 font28 dull-blue ml-10">添加产品</view>
		</view>
		<view v-else class="flex flex-column mt-30 px-24 py-24 bg-neutral">
			<view><span class="dull-red">*</span>上传图片<span class="dull-red font-400">（图片需后台审核通过后才会公开发布）</span></view>
			<view class="grid-3-1fr mt-20">
				<view v-for="(item,index) in fileList" :key="index" class="relative w-180 h-180">
					<img :src="item.temUrl" alt="" class="w-full h-full">
					<img src="/static/home/upload-delete.png" class="absolute w-36 h-36 right-0 top-0"
						@click.stop="deleteUpload(index)" alt="" />
				</view>
				<view @click="handleUpload" class="flex flex-column flex-center align-center w-180 h-180"
					style="background: #F5F7FA;">
					<img src="/static/home/upload.png" alt="" class="upload-icon">
					<view class="light-grey font-400 font24 mt-12">点击上传</view>
				</view>
			</view>
		</view>
		<view class="mx-24">
			<button class="pwd-btn mt-20" @click="releaseEnquiry">发布询价</button>
		</view>
		<u-picker v-model="show" mode="time" @confirm="dateConfirm" :default-time="defaultTime"></u-picker>
		<u-select v-model="cityShow" mode="mutil-column-auto" :default-region="[form.province,form.city,form.area]"
			:list="multiSelector" @confirm="confirm" value-name='id' label-name='name' child-name='children'></u-select>

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

		.upload-icon {
			width: 60rpx;
			height: 52rpx;
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