import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elmentui from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import * as echarts from 'echarts'
console.log(echarts);
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(elmentui)
Vue.use(Avue)
Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
