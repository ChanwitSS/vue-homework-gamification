import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import VCalendar from 'v-calendar';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VCalendar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
