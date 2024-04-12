<script lang="ts" setup>
import { PropsType } from "./type";

const emit = defineEmits(["handleClick"]);
const props = defineProps<PropsType>();

const onClick = () => {
  emit("handleClick");
};
</script>

<template>
  <view class="custom-cell"></view>
</template>

<style>
.custom-cell {
}
</style>
