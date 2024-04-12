import { createSSRApp } from "vue";
import App from "./App.vue";
import "uno.css";
import { setupStore } from "@/state";
import { setupRouter } from "@/router";
import uView from "@/uni_modules/vk-uview-ui";

export function createApp() {
  const app = createSSRApp(App);

  // Configure router
  setupRouter(app);

  // Configure store
  setupStore(app);
  app.use(uView);
  return {
    app,
  };
}
