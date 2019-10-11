import Vue from 'vue';
//导入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';

import App from './App.vue';
//偏重于pc端页面表现层框架，提供了很多现成的组件供我们使用
Vue.use(ElementUI);

new Vue({
        el: '#app',
        components:{ App },
        store,
        router,
        template: '<App/>'
});