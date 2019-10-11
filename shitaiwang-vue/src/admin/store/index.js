import Vue from 'vue';
import Vuex from 'vuex';
import category from './category.js'

Vue.use(Vuex);

const store = new Vuex.Store({
        modules:{ category }
});

export default store;