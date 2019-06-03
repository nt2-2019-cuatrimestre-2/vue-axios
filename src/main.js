import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

import VueBootstrap from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

Vue.use(VueAxios,axios)
Vue.use(VueBootstrap)

new Vue({
  render: h => h(App),
}).$mount('#app')
