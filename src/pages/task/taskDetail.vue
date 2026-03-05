<script lang="ts" setup>
	import { reactive, ref, unref, onMounted } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { useAuthStore } from "@/state/modules/auth";
	import { Toast } from "@/utils/uniapi/prompt";
	import { useRouter } from "uni-mini-router";
	import { useRequest } from "alova";
	import { getVerifyCode, login, profileInfo, postTask, getTask, putTask, getTaskDetail } from "@/services/api/auth";
	import { omit } from "lodash-es";
	import DragCheck from "@/components/Drag-check/index.vue";
	import { formatTime } from "@/utils/time";
	import type { BrashBoxListType, BrashBoxListDetailType } from "@/services/model/taskModel";



	const detail = ref<BrashBoxListType>()

	const { data: taskDataDetail, send: sendDetail, onSuccess: taskDetailSuccess } = useRequest((params) => getTaskDetail(params), {
		immediate: false
	});
	onLoad((options : any) => {
		detail.value = {
			details: [],
			task: {} as BrashBoxListDetailType
		}
		if (options.id) sendDetail(options.id)
	})

	taskDetailSuccess(() => {
		detail.value = taskDataDetail.value
		// taskDataDetail.value.details.map((item : any) => {
		// 	let arr = item.barcodes.split(',')
		// 	detail.value.barcodes = [].concat(arr)
		// })
		console.log(detail.value, 'detail.value');
	})
</script>

<template>

	<view class="task-detail">
		<view class="bg-neutral">
			<view class="p-24 font32 font-bold">提单号：{{detail.task?.billNo}}</view>
			<view style="border-top: 1px solid #F5F7FA;" class="px-24">
				<!-- 				<view class="font400 light-grey font28 mt-30 mb-28">有效条形码</view>
				<view v-for="(item,index) in detail?.barcodes" :key="index" class="pb-24 font28 font400">
					{{item}}
				</view> -->
				<view class="flex align-center">
					<img src="/static/images/start.png" class="w-36 h-36" alt="" />
					<view class="font32 font-bold ml-12">
						{{detail.task?.por?.enName ?? '-'}},{{detail.task?.por?.countryCode ?? '-'}}
					</view>
				</view>
				<view class="flex align-center my-12">
					<img src="/static/images/line.png" style="width: 10px;height: 17px;margin-left: 4px;" alt="" />
					<view class="font28 font400 ml-20 light-grey">{{detail.task?.transit ?? '-'}}</view>
				</view>
				<view class="flex align-center">
					<img src="/static/images/end.png" class="w-36 h-36" alt="" />
					<view class="font32 font-bold ml-12">
						{{detail.task?.fnd?.enName ?? '-'}},{{detail.task?.fnd?.countryCode ?? '-'}}
					</view>
				</view>
				<view class="p">船司：<text class="span">{{detail.task?.carrier ?? '-'}}</text></view>
				<view class="p pb-24">船名航次：<text class="span">{{detail.task?.vesselName}}/{{detail.task?.voyNo}}</text>
				</view>
			</view>
		</view>
		<view class="bg-neutral mt-20">
			<view class="p-24 flex align-center flex-between font-bold font28">
				<view class="dull-grey">总箱量：{{detail.task?.totalNumber}}</view>
				<view style="color: #52C41A;margin-bottom: 6px;">已成功总箱量{{detail.task?.successCount || 0}}</view>
			</view>
			<view style="border-top: 1px solid #F5F7FA;" class="px-24 py-28">
				<!-- 				<view class="p">箱型：<text class="span">{{detail.task?.ctnType}}</text></view>
				<view class="p">箱量：<text class="span">{{detail.task?.ctnNumber}}</text></view>
				<view class="p">上次执行时间：<text class="span">{{detail.task?.execTime}}</text></view> -->
				<view class="light-grey details" v-for="(item) in detail.details" :key="item.id">
					<view class="flex flex-column align-center">
						<view class="circle"></view>
						<view class="line"></view>
					</view>
					<view class="flex flex-column ml-24 font28 font400">
						<view class="time" style="position: relative;top: -4px;">创建时间：<text>{{item.createTime}}</text>
						</view>
						<view class="mt-24">本次刷箱量：<text class="dull-grey">{{item.ctnType}} * {{item.ctnNumber}}</text>
						</view>
						<view class="mt-24">总箱量：<text class="dull-grey">{{detail.task?.totalNumber}}</text></view>
						<view class="mt-24">成功数量：<text style="color: #07C160;">{{detail.task?.successCount}}</text>
						</view>
						<view class="dull-grey mt-24 dull-grey">有效条形码：</view>
						<view v-if="item.barcodes">
							<view class="barcodes" v-for="(i,index) in item.barcodes.split(',')" :key="index">{{i}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.task-detail {
		background: #F5F7FA;
		overflow: hidden;

		.p {
			font-weight: 400;
			font-size: 14px;
			color: #909399;
			margin-top: 12px;
		}

		.span {
			font-weight: 400;
			font-size: 14px;
			color: #303133;
		}

		.details {
			display: flex;
			align-items: flex-start;

			.circle {
				width: 11px;
				height: 11px;
				background: #1677FF;
				border-radius: 50%;
			}

			.line {
				width: 1rpx;
				min-height: 206px;
				background: #1677FF;
				// margin-left: 7rpx;
				transform: translateX(-1px);
			}

			.time {
				// padding-top: 33px;
			}

			.barcodes {
				font-weight: 400;
				font-size: 14px;
				color: #1677FF;
				padding: 3px 8px;
				background: #F5F7FA;
				border-radius: 2px;
				margin-right: 5px;
			}
		}

		.details:nth-of-type(1) {
			.time {
				margin-top: 0;
			}
		}

		.details:nth-last-of-type(1) {
			.line {
				display: none;
			}
		}
	}
</style>