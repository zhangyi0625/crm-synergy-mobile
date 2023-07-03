<template>
	<AppProvider>
		<view class="container">页面构建中... </view>
		<view class="_u_center">
			<BasicButton @click="jumpList1">List1 → </BasicButton>
		</view>
		<u-button type="primary">主要按钮</u-button>
		<u-button type="success">成功按钮</u-button>
		<u-button type="info">信息按钮</u-button>
	</AppProvider>
</template>

<script lang="ts" setup>
	import BasicButton from '@/components/BasicButton/index.vue';
	import AppProvider from '@/components/AppProvider/inedx.vue';
	import { useRouter } from 'uni-mini-router';

	const router = useRouter();
	const jumpList1 = () => {
		// router.push('/pagesA/list/test1/index11?key=words&page=1&limit=15');
		router.push({ path: '/pagesA/list/test1/index', query: { key: 'word', page: '1', limit: '15' } });
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 128rpx 0;
		text-align: center;
	}
</style>