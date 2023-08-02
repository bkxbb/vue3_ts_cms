import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import registerIcons from './global/register-icons'
import registerStore from './store'

// 针对ElMessage和ElLoading等组件引入样式
// 1.手动导入
// import 'element-plus/theme-chalk/el-message.css'
// 2.使用插件
// 安装：npm i -D vite-plugin-style-import   npm install consola -D
// 然后再配置vite.config.ts

// 链式写法
// createApp(App).use(router).use(pinia).mount('#app')

const app = createApp(App)
app.use(registerIcons)
app.use(registerStore)
app.use(router)
app.mount('#app')
