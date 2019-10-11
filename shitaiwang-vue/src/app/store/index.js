//创建仓库对象并导出

import Vue from 'vue';
import Vuex from 'vuex';

//导入所有子仓库
import category from './category.js';
import product from './product.js';
import loading from './loading';
import cart from './cart';
import address from './address.js';

Vue.use(Vuex);

const store = new Vuex.Store({
        modules: {
                category,
                product,
                loading,
                cart,
                address,
        },
        state: { a: 100 },
        getters: {},
        mutations: {
                a: function(state,payload) {
                        state.a = payload;
                        console.log(payload);
                        console.log('总仓库的mutations中的a方法被调用');
                }
        },
        //包含很多方法
        //没有资格修改仓库中的任何status数据
        //actions中的方法中的代码一般都是耗时的异步的代码
        //方法的第一个参数是当前仓库对象本身(里面有很多方法和属性),第二个是通过dispatch调用实际传来的额外payload荷载
        actions: {
                a:function(store,payload) {
                        console.log(store);
                        console.log(payload);
                        console.log('总仓库的actions方法中的a方法被调用了');
                }
        }
});

export default store;