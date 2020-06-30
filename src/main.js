import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2';

import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueSweetalert2);