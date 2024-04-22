<script lang="ts" setup>
	import { onShow } from "@dcloudio/uni-app";
	import { formatUpdated } from "@/utils/time";
	import { invalidateCache, useRequest } from "alova";
	import { deleteCollectPort, getCollectPort } from "@/services/api/freight";
	import { useRouter } from "uni-mini-router";


	const router = useRouter()

	// 页面初始化
	onShow(() => {
		isSend()
		invalidateCache(getCollectPort())
	})

	const { data: collectData, send: isSend } : any = useRequest(getCollectPort(), { initialData: [] })

	// 取消收藏
	const { send: isDelete, onSuccess: onSuccess } : any = useRequest((id) => deleteCollectPort(id), { immediate: false })

	onSuccess(() => {
		isSend()
		invalidateCache(getCollectPort())
	})

	// 跳转运价列表
	const jump = (item : any) => {
		router.push({
			path: "/pagesA/freight/index?info=" + JSON.stringify(item),
		});
	}
</script>

<template>
	<view class="collect px-20 pb-20">
		<view class="p-24 bg-neutral br12 relative mt-20" v-for="(item, index) in collectData" :key="index"
			@click.stop="jump(item)">
			<view class="absolute right-0 top-0 py-12 px-18 flex align-center bg-light-red br12-sm"
				@click.stop="isDelete(item.id)">
				<img src="/static/images/collect/collect.png" class="w-32 h-32" />
				<view class="ml-4 font26 font400 dull-red">取消收藏</view>
			</view>
			<view class="absolute right-24 top-84 font24 font400 light-grey" v-if="item.modified">
				收藏时间：{{ formatUpdated(item.modified, 10) }}</view>
			<view class="flex align-center">
				<img src="/static/images/collect/por.png" class="w-48 h-48" />
				<view class="font500 font32 dull-grey">
					{{ item.porCnlName }} - {{ item.porEnName }}
				</view>
			</view>
			<view class="line br2"></view>
			<view class="flex align-center">
				<img src="/static/images/collect/fnd.png" class="w-48 h-48" />
				<view class="font500 font32 dull-grey">
					{{ item.fndCnlName }} - {{ item.fndEnName }}
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.collect {
		.line {
			width: 2rpx;
			height: 40rpx;
			background: #edeff2;
			margin: 8rpx 0 8rpx 18rpx;
		}
	}
</style>