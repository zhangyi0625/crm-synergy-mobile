<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useAuthStore } from "@/state/modules/auth";
onLaunch(() => {
  console.log("App Launch");
  /**
   * 用新户首次进入时跳转login页 使用验证码注册登录
   * 之前进入时判断获取token 实现自动登录
   */
});
onShow(() => {
  const authStore = useAuthStore();
  authStore.initToken();
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/assets/main.scss";
@import "../src/uni_modules/vk-uview-ui/index.scss";
@import "@/assets/reset.css";
</style>
