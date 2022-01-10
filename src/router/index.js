import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Home',
    component: ()=>import("../views/404.vue")
  },
  {
    path: '/',
    name: 'index',
    component: ()=>import("../views/index.vue")
  },
  {
    path: '/demo',
    name: 'demo',
    component: ()=>import("../views/demo/index.vue")
  },
]
console.log(routes);
importPages(require.context('../views/page', true, /\.vue$/,'lazy'))
 function importPages (r) {
    r.keys().forEach(key => {
      routes.push({ path: (key.split('.'))[1], component: ()=>r(key)})
    });
  }
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
