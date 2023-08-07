import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "./assets/styles/app.scss";

// EventBus Mitt
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

import { setupCalendar } from "v-calendar";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Antd);
app.component("QuillEditor", QuillEditor);
app.use(setupCalendar, {});
app.mount("#__app");
