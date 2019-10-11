import Vue from 'vue';
import router from './router';
import store from './store';
import  App from './App.vue';

import './components/UI';

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

new Vue({
        el:'#app',
        components: {App},
        template: '<App/>',
        router,
        store
});