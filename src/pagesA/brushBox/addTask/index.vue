<script lang="ts" setup>
	import { reactive, ref, unref, onMounted } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { Toast } from "@/utils/uniapi/prompt";
	import { useRouter } from "uni-mini-router";
	import { useRequest } from "alova";
	import { getVerifyCode, login, profileInfo, postTask, getTask, putTask, getContainerType, getTaskByBillNo } from "@/services/api/auth";
	import { omit } from "lodash-es";
	import DragCheck from "@/components/Drag-check/index.vue";
	import { formatTime } from "@/utils/time";


	const ctnTypeOptions = ref<{ code : string }[]>([])

	const form = reactive({
		billNo: '',
		ctnType: '40HQ',
		totalNumber: 1,
		ctnNumber: 1
	})

	const checked = ref<boolean>(false)

	const { data: taskData, send: gTask, onSuccess: taskSuccess } = useRequest((params) => getTask(params), {
		immediate: true,
	});

	const { data: containerTypeData, send: gContainerType, onSuccess: containerTypeSuccess } = useRequest(() => getContainerType(), {
		immediate: true,
	});

	const { data: sendTaskData, send: sendTask, onSuccess: sendTaskSuccess } = useRequest((params) =>
		params.id ? putTask(params) : postTask(params), {
		immediate: false,
	});

	const { data: sendSearchTaskByBillNoData, send: sendSearchTaskByBillNo, onSuccess: sendSearchTaskByBillNoSuccess } = useRequest((id) => getTaskByBillNo(id), {
		immediate: false
	})

	taskSuccess(() => {
		gContainerType();
	})

	sendSearchTaskByBillNoSuccess(() => {
		console.log(sendSearchTaskByBillNoData.value);
		if (sendSearchTaskByBillNoData.value?.id) {
			uni.showModal({
				title: '该提单号已有历史刷箱任务',
				content: `该提单号下总箱量：${sendSearchTaskByBillNoData.value.totalNumber}\n 已成功刷箱：${sendSearchTaskByBillNoData.value.successNumber || 0}\n 已添加刷箱：${sendSearchTaskByBillNoData.value.useNumber || 0}\n`,
				confirmText: '确认',
				success(res) {
					if (res.confirm) {
						console.log(form, 'zzzz');
						// sendTask(form)
						isAdd.value = true
						form.totalNumber = sendSearchTaskByBillNoData.value.totalNumber
					} else {
						isAdd.value = false
						form.totalNumber = 1
						form.billNo = sendSearchTaskByBillNoData.value.billNo
					}
				}
			});

		} else {
			isAdd.value = false
		}

	})


	containerTypeSuccess(() => {
		console.log(containerTypeData.value, 'containerTypeData');
		ctnTypeOptions.value = containerTypeData.value.filter((i) => i.enabled)
	})

	const changeCtnType = (value : string) => {
		form.ctnType = value
	}

	const plus = (value : { value : number }) => {
		form.ctnNumber = value.value
	}

	const sumPlus = (value : { value : number }) => {
		form.totalNumber = value.value
	}

	const minus = (value : { value : number }) => {
		form.ctnNumber = value.value
	}

	const sumMinus = (value : { value : number }) => {
		form.totalNumber = value.value
	}

	const numChange = (value : { value : number }) => {
		form.ctnNumber = value.value
	}

	const sumNumChange = (value : { value : number }) => {
		form.totalNumber = value.value
	}


	onLoad((options) => {
		console.log(options, 'options');
		if (options.item) {
			let info = JSON.parse(options.item)
			form.billNo = info.billNo
			form.ctnType = info.ctnType
			form.ctnNumber = info.ctnNumber
			form.id = info.id
			form.totalNumber = info.totalNumber
		} else {

		}
	})

	const isAdd = ref<boolean>(false)

	sendTaskSuccess(() => {
		console.log(taskData.value, 'taskData');
		// Toast('提交成功')
		if (!form.id) {
			uni.showModal({
				title: '任务新增成功',
				content: '如继续添加该票其他箱型任务 请点继续添加',
				confirmText: '完成',
				cancelText: '继续添加',
				success(res) {
					if (res.confirm) {
						isAdd.value = false
						uni.switchTab({
							url: '/pages/task/index'
						})
					} else {
						console.log(form, 'zzzz');
						// sendTask(form)
						isAdd.value = true
						form.ctnNumber = 1
						form.ctnType = '40HQ'
						checked.value = false
					}
				}
			});
		} else {
			Toast('修改成功')
			uni.switchTab({
				url: '/pages/task/index'
			})
		}

	})


	const submitTask = () => {
		if (!form.billNo) {
			Toast('请填写提单号')
			return
		}
		if (form.ctnNumber === 0) {
			Toast('请选择箱型数量')
			return
		}
		sendTask(form)
		// if (!form.id && taskData.value.length && taskData.value.find((i : any) => i.billNo === form.billNo)) {

		// } else {
		// console.log(form, 'zzzz');
		// }
	}

	// 输入提单号失去焦点，校验提单号是否存在，如果已经存在，进行提示并加载总箱数和刷箱数
	const billNoBlur = (value : string) => {
		console.log(form, 'form', value);
		sendSearchTaskByBillNo(form.billNo)
		// if(taskData.value.length && taskData.value.find((i : any) => i.billNo === form.billNo)){
		// }
	}

	const checkChange = (value : boolean) => {
		console.log(checked.value, value);
		checked.value = value
		form.ctnNumber = form.totalNumber
	}
</script>

<template>

	<view class="brashBox-task relative h-full">
		<view class="bg-neutral px-24">
			<view class="flex align-center py-32" style="border-bottom:1px solid #EDEFF2;">
				<view class="font28 dull-grey mr-24 w-160"><span class="dull-red">*</span>提单号</view>
				<input :disabled="form.id" type="text" @blur="billNoBlur" v-model="form.billNo" placeholder="请输入提单号" />
			</view>
			<view class="flex align-center flex-between py-32" style="border-bottom:1px solid #EDEFF2;">
				<view class="flex align-center">
					<view class="font28 dull-grey mr-24 w-160"><span class="dull-red">*</span>总箱量</view>
					<input type="text" :disabled="true" placeholder="该提单号下需刷箱总量" />
				</view>
				<u-number-box :min="1" style="margin-right: 8px;" v-model="form.totalNumber" @change="sumNumChange"
					@plus="sumPlus" @minus="sumMinus" :disabled="isAdd"></u-number-box>
			</view>
			<view v-if="!form.id" class="flex align-start py-32" style="border-bottom:1px solid #EDEFF2;">
				<view class="font28 dull-grey mr-24 w-160"><span class="dull-red">*</span>箱型</view>
				<div class="gird grid-4-1fr" style="row-gap: 10rpx;">
					<div @click="changeCtnType(item.code)" v-for="(item,index) in ctnTypeOptions" :key="index"
						:class="[item.code === form.ctnType ? 'ctnType active' : 'ctnType']">
						{{item.code}}
						<img v-if="form.ctnType === item.code" src="/static/images/active.png"
							style="width: 40rpx;height: 40rpx;" class="absolute bottom-0 right-0" alt="">
					</div>
				</div>
			</view>
			<view v-if="!form.id" class="flex align-center py-32 flex align-center flex-between">
				<view class="font28 dull-grey mr-24 w-160"><span class="dull-red">*</span>本次刷箱数量箱量</view>
				<view class="flex align-center">
					<u-checkbox-group>
						<u-checkbox @change="checkChange" v-model="checked" :disabled="false">同总箱量</u-checkbox>
					</u-checkbox-group>
					<u-number-box :min="1" style="margin-right: 8px;" v-model="form.ctnNumber" @change="numChange"
						@plus="plus" @minus="minus"></u-number-box>
				</view>
			</view>
		</view>
		<view class="p-24">
			<button class="pwd-btn mt-20" @click="submitTask">提交任务</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.brashBox-task {
		background: #F5F7FA;
		height: 100%;

		.ctnType {
			font-weight: 400;
			font-size: 14px;
			color: #606266;
			width: 68px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			background: #F5F7FA;
			border-radius: 4px;
			border-radius: 4px;
			margin-right: 6px;
			position: relative;
		}

		.active {
			color: #1677FF;
			background: #E7F1FF;
		}

		:deep .num-btn {
			top: 0 !important;
		}

		.num-btn {
			top: 0 !important;
		}
	}
</style>