<script lang="ts" setup>
	import { reactive, ref, unref, onMounted, getCurrentInstance } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { Toast } from "@/utils/uniapi/prompt";
	import { useRouter } from "uni-mini-router";
	import { useRequest, invalidateCache } from "alova";
	import { getVerifyCode, login, profileInfo, postTask, getTask, deleteTask, startTask, updateTask, getTaskStatistic, cancelTask } from "@/services/api/auth";
	import { omit } from "lodash-es";
	import DragCheck from "@/components/Drag-check/index.vue";
	import { formatTime } from "@/utils/time";
	import { time } from "console";
	import DateTimePicker from '@/components/dengrq-datetime-picker/dateSelector/index.vue'

	const router = useRouter();

	const { proxy } : any = getCurrentInstance();

	const current = ref<number>(0)

	const tabs = ref([
		{
			name: '全部'
		},
		{
			name: '未刷箱'
		},
		{
			name: '刷箱中'
		},
		{
			name: '刷箱成功',
		},
		// {
		// 	name: '刷箱失败'
		// }, 
		{
			name: '取消刷箱'
		}
	])

	const statusOptions = ref<string[]>(['', '', 'PENDING', 'RUNNING', 'SUCCESS', 'CANCEL'
	])

	const { data: taskData, send: gTask, onSuccess: taskSuccess } = useRequest((params) => getTask(params), {
		immediate: false, force: true
	});

	const { send: sendDelete, onSuccess: deleteTaskSuccess } = useRequest((id) => deleteTask(id), {
		immediate: false
	});

	const { send: sendStart, onSuccess: startTaskSuccess } = useRequest((id) => startTask(id), {
		immediate: false
	});

	const { send: cancelStart, onSuccess: cancelTaskSuccess } = useRequest((id) => cancelTask(id), {
		immediate: false
	});

	const { send: updateStart, onSuccess: updateTaskSuccess, onError: updateTaskError } = useRequest((id) => updateTask(id), {
		immediate: false
	});


	updateTaskSuccess(() => {
		Toast('更新任务状态成功')
		uni.hideLoading()
		refresh()
	})

	updateTaskError((error) => {
		console.log('error', error.error);
		Toast(error.error.message ?? '操作异常')
		uni.showToast({
			title: error.error.message ?? '操作异常',
			icon: 'error'
		})
	})



	const radioValue = ref('近1个月')
	taskSuccess(() => {
		taskData.value.map((item) => {
			item.loading = false
		})
		taskOptions.value = taskData.value ?? []
	})

	onShow(() => {
		console.log('onshow');
		current.value = 0
		gTask({
			status: statusOptions.value[current.value + 1],
			updateTimeStart: timeParams.createTimeStart + ' 00:00:00',
			updateTimeEnd: timeParams.createTimeEnd + ' 23:59:59',
			order: 'update_time'
		});
		invalidateCache(getTask({
			status: statusOptions.value[current.value + 1],
			updateTimeStart: timeParams.createTimeStart + ' 00:00:00',
			updateTimeEnd: timeParams.createTimeEnd + ' 23:59:59',
			order: 'update_time'
		}))
		refresh()
	})

	onLoad(() => {
		console.log('onload');
	})





	const timeParams = reactive({
		show: false,
		index: 0,
		createTimeStart: formatTime(Date.now() - 3600 * 1000 * 24 * 30, 'Y-M-D'),
		createTimeEnd: formatTime(new Date() as unknown as string, 'Y-M-D')
	})

	const selector = ref(['近1个月', '近3个月', '近1年', '自定义'])



	const taskOptions = ref<any>([])



	const refresh = () => {
		gTask({
			status: statusOptions.value[current.value + 1],
			updateTimeStart: timeParams.createTimeStart + ' 00:00:00',
			updateTimeEnd: timeParams.createTimeEnd + ' 23:59:59',
			order: 'update_time'
		});
		// setTimeout(() => {
		invalidateCache(getTask({
			status: statusOptions.value[current.value + 1],
			updateTimeStart: timeParams.createTimeStart + ' 00:00:00',
			updateTimeEnd: timeParams.createTimeEnd + ' 23:59:59',
			order: 'update_time'
		}))
		// }, 100)
	}

	const tabChange = (index : number) => {
		current.value = index;
		refresh()
	}

	const addTask = () => {
		router.push('/pagesA/brushBox/addTask/index')
	}

	const deleteItem = (item : any) => {
		uni.showModal({
			title: '删除任务',
			content: '确定删除该任务吗？',
			success(res) {
				if (res.confirm) {
					sendDelete(item.id)
				}
			}
		});
	}

	deleteTaskSuccess(() => {
		Toast('删除成功')
		refresh()
	})

	const updateItem = (item : any) => {
		router.push('/pagesA/brushBox/addTask/index?item=' + JSON.stringify(item))
	}

	startTaskSuccess(() => {
		Toast('启动成功')
		refresh()
	})

	cancelTaskSuccess(() => {
		Toast('取消成功')
		refresh()
	})

	const refreshItem = (item : any) => {
		taskOptions.value.map((i) => {
			if (i.id === item.id) {
				item.loading = true
			}
		})
		sendStart(item.id)
		// refresh()
	}

	const cancelItem = (item : any) => {
		cancelStart(item.id)
		refresh()
	}

	const openShow = () => {
		proxy.$refs.dropdown1.open();
		console.log(proxy, 'proxyRefs');
	}

	const onChangeStartDate = (date : any) => {
		console.log(date, 'val');

	}
	const onDateSelectorSubmit = (date : any) => {
		if (date.startDate && date.endDate) {
			timeParams.index = 3
			timeParams.createTimeStart = formatTime(date.startDate, 'Y-M-D')
			timeParams.createTimeEnd = formatTime(date.endDate, 'Y-M-D')
			timeParams.show = false
			setTimeout(() => {
				proxy.$refs.dropdown1.close();
				refresh()
			}, 400)
		}
	}

	const dayConfirm = (value : number[]) => {
		timeParams.index = value[0] as number
		timeParams.createTimeStart = formatTime(Date.now() + 3600 * 1000 * 24 * (value[0] === 0 ? 30 : value[0] === 1 ? 90 : 180), 'Y-M-D')
	}

	const radioGroupChange = (value : any) => {
		if (value === '自定义') {
			timeParams.show = true
		} else {
			let index = selector.value.findIndex((i) => i === value)
			timeParams.index = index
			timeParams.createTimeStart = formatTime(Date.now() - 3600 * 1000 * 24 * (index === 0 ? 30 : index === 1 ? 90 : 365), 'Y-M-D')
			proxy.$refs.dropdown1.close();
			refresh()
		}
	}

	const jumpDetail = (id : string) => {
		// if (current.value !== 2) return
		router.push('/pages/task/taskDetail?id=' + id)
	}

	const upadteStatus = (item : any) => {
		console.log(item, 'item');
		uni.showLoading({
			title: '更新刷箱结果中'
		})
		updateStart(item.id);
	}
</script>

<template>

	<view class="task-list">
		<view style="background: #FFFFFF;margin-bottom: 10px;">
			<view class="task-list-time">
				<view class="flex align-center">
					<img src="/static/images/calendar.png" class="w-32 mr-10 h-32" alt="" />
					<view class="font28 font400 dull-blue">{{timeParams.createTimeStart}} - {{timeParams.createTimeEnd}}
					</view>
				</view>
				<view class="flex align-center" @click="openShow">
					<view class="font28 font400 light-grey mr-10">{{selector[timeParams.index]}}</view>
					<u-icon name="arrow-down-fill" style="width: 12px;height: 12px;font-size: 12px;"></u-icon>
				</view>
			</view>
			<u-dropdown ref="dropdown1">
				<u-dropdown-item>
					<view class="slot-content flex flex-column" style="background-color: #FFFFFF;">
						<u-radio-group style="display: flex;flex-direction: column !important;" v-model="radioValue"
							@change="radioGroupChange">
							<u-radio
								style="padding: 32rpx 24rpx;border-bottom: 1px solid #EDEFF2;justify-content:space-between;"
								width="100%" v-for="(item,index) in selector" :key="index" :name="item">
								<view style="order: 2;" class="font28 font400 dull-grey">{{item}}</view>
							</u-radio>
						</u-radio-group>
					</view>
				</u-dropdown-item>
			</u-dropdown>
			<u-tabs name="name" :gutter="28" :list="tabs" v-model="current" @change="tabChange"></u-tabs>
		</view>
		<view v-if="taskOptions.length > 0" v-for="(item,index) in taskOptions" :key="index" class="task-list-item"
			@click.stop="jumpDetail(item.id)">
			<view class="flex align-center flex-between">
				<text selectable="true">{{item.billNo}}</text>
				<view class="font28 font400 light-red">
					{{tabs[statusOptions.findIndex((i) => i === item.status) - 1]['name']}}
				</view>
			</view>
			<view v-if="current === 3" class="flex align-center flex-between">
				<view class="flex align-center">
					<view class="carrier">{{item.carrier}}</view>
					<text selectable="true">{{item.billNo}}</text>
				</view>
				<view style="color: #52C41A;">成功{{item.successCount}}</view>
			</view>
			<view v-if="current === 3" class="py-24">
				<view class="flex align-center">
					<img src="/static/images/start.png" class="w-36 h-36" alt="" />
					<view class="font32 font-bold ml-12">{{item?.por?.enName}},{{item?.por?.countryCode}}</view>
				</view>
				<view class="flex align-center my-12">
					<img src="/static/images/line.png" style="width: 10px;height: 17px;margin-left: 4px;" alt="" />
					<view class="font26 font400 ml-20 light-grey">船名航次：{{item.vesselName}}/{{item.voyNo}}</view>
				</view>
				<view class="flex align-center">
					<img src="/static/images/end.png" class="w-36 h-36" alt="" />
					<view class="font32 font-bold ml-12">{{item?.fnd?.enName}},{{item?.fnd?.countryCode}}</view>
				</view>
			</view>
			<view class="flex flex-column my-24">
				<view class="font28 light-grey font400 flex items-center flex-wrap">
					本次刷箱量：
					<view v-for="(i,index) in item.containers" style="background: #F5F7FA;padding: 3px 8px;"
						class="mr-12 font28 font400 dull-grey">{{index}}*{{i}}
					</view>
				</view>
				<view class="flex align-center mt-24">
					<view class="flex align-center">
						<view class="light-grey font400">总箱量：</view>
						<view class="font400">{{item.totalNumber}}</view>
					</view>
					<view class="flex align-center ml-24" v-if="current === 0">
						<view class="light-grey font400">创建时间：</view>
						<view class="font400">{{formatTime(item.createTime,'Y-M-D h:m')}}</view>
					</view>
					<view class="flex align-center ml-24" v-if="current !== 0">
						<view class="light-grey font400">上次执行时间：</view>
						<view class="font400">{{item.execTime ? formatTime(item.execTime,'Y-M-D h:m') : '-'}}</view>
					</view>
				</view>
			</view>
			<view class="flex flex-start align-center" v-if="current === 3">
				<view class="light-grey">备注：{{item.remark}}</view>
			</view>
			<view class="flex flex-end align-center">
				<view class="btn cancel" v-if="current === 2 || item.status === 'RUNNING'"
					style="color: #FF4D4F;background: #FFE8E8;" @click.stop="cancelItem(item)">取消</view>
				<view class="btn cancel" v-if="current === 2 || item.status === 'RUNNING'" style="color: #1677FF"
					@click.stop="upadteStatus(item)">
					更新状态
				</view>
				<view class="btn cancel" v-if="item.status !== 'CANCEL' && item.status !=='PENDING'"
					style="color: #1677FF;" @click.stop="jumpDetail(item.id)">详情</view>
			</view>
			<view class="flex flex-end align-center" v-if="item.status === 'PENDING'">
				<view class="btn cancel" style="color: #FF4D4F;" @click.stop="deleteItem(item)">删除</view>
				<view class="btn cancel" style="color: #1677FF;" @click.stop="updateItem(item)">修改</view>
				<view class="btn cancel" style="color: #1677FF;" @click.stop="jumpDetail(item.id)">详情</view>
				<button class="btn confirm" :loading="item.loading" @click.stop="refreshItem(item)">刷箱</button>
			</view>
			<!-- 			<view class="flex flex-end align-center" v-if="current === 2">
				<view class="btn cancel" style="color: #1677FF;" @click="jumpDetail(item.id)">详情</view>
			</view> -->
		</view>
		<view v-else>
			<u-empty style="margin-top: 100px;" text="暂无刷箱任务" mode="list"></u-empty>
		</view>
		<view class="task-list-fixed" @click="addTask">新增刷箱任务</view>
		<!-- <u-picker mode="selector" @confirm="dayConfirm" v-model="timeParams.show" :range="selector"
			:default-selector="[timeParams.index ?? 0]"></u-picker> -->
		<u-popup :closeable="true" :mask-close-able="false" v-model="timeParams.show" mode="bottom" height="400px"
			border-radius="12">
			<view class="">
				<view class="flex align-center flex-center px-32 py-24" style="border-bottom: 1px solid #F5F7FA;">
					<view class="font32 font500 text-center">自定义时间</view>
					<img src="" alt="">
				</view>
				<view class="py-32 px-32">
					<DateTimePicker :defaultStartDate="timeParams.createTimeStart"
						:defaultEndDate="timeParams.createTimeEnd" :mode="1" @onChange="onChangeStartDate"
						@onSubmit="onDateSelectorSubmit" />
				</view>
			</view>

		</u-popup>

	</view>
</template>

<style lang="scss" scoped>
	.task-list {
		background: #F5F7FA;
		height: 100%;
		position: relative;
		padding-bottom: 100px;

		.carrier {
			width: 44px;
			height: 22px;
			background: #E7F1FF;
			border-radius: 4px;
			line-height: 22px;
			text-align: center;
			font-weight: 600;
			font-size: 14px;
			color: #1677FF;
			margin-right: 10rpx;
		}

		&-time {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px 10px 0;
		}

		&-item {
			background: #fff;
			margin-bottom: 10px;
			padding: 12px;
			font-weight: 600;
			font-size: 16px;
			color: #303133;
		}

		// &-item:nth-last-of-type(1) {
		// 	padding-bottom: 60px;
		// }

		.btn {
			width: 82px;
			height: 34px;
			line-height: 34px;
			background: #F5F7FA;
			border-radius: 4px;
			font-weight: 600;
			font-size: 14px;
			color: #606266;
			text-align: center;
			margin-right: 8px;
		}

		.confirm {
			background: #1677FF;
			color: #fff;
		}

		&-fixed {
			position: fixed;
			bottom: 90px;
			left: 31%;
			width: 160px;
			height: 44px;
			line-height: 44px;
			text-align: center;
			background: #FA8C16;
			border-radius: 22px;
			font-weight: 400;
			font-size: 14px;
			color: #FFFFFF;
		}

		.uni-scroll-view-content {
			.u-scroll-box {
				display: flex !important;
				width: 100%;
			}
		}

		:deep .u-radio__icon-wrap {
			order: 1;
		}

		:deep .u-dropdown__menu__item {
			position: relative;
			top: -20px;
		}

		:deep .u-flex {
			display: none;
		}

	}
</style>