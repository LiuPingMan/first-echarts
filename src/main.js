import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import './assets/css/global.less'
import '../public/static/theme/chalk'
import './assets/font/iconfont.css'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
