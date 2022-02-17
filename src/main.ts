import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./routes/index";
import store from "./store";
const app = createApp(App);

app.use(router).use(store).use(Antd).mount("#app");
