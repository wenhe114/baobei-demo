import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elmentui from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';

import * as echarts from 'echarts'
console.log(echarts);
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(elmentui)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
