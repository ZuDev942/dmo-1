import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/app.scss'
import 'ant-design-vue/dist/antd.less'

createApp(App).use(router).mount('#app')
