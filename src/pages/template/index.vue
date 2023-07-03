<template>
	<view> 页面模板,新建pages,将此页面内容复制粘贴到新建.vue文件 </view>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue';
	const title = ref<string | null>(null)
	const list = reactive([] as any)
</script>

<style lang="scss" scoped></style>