import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueSweetalert2);