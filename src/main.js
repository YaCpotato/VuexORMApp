import Vue from 'vue'
import begin from './begin.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(begin)
}).$mount('#app')
