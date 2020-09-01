import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from '@/components/common/toast/index.js'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 事件总线这个$bus默认是不存在的，所以这里在原形上添加这个，值是vue实例
// 安装自己封装的toast插件
Vue.use(toast)

// 解决移动端点击的300毫秒延迟
FastClick.attach(document.body)

// 使用图片懒加载的插件
Vue.use(VueLazyLoad)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
