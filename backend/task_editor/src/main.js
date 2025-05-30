import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import Buefy from "buefy"
import 'buefy/dist/buefy.css'
import '@/assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


Vue.config.productionTip = false

Vue.use(Buefy)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
