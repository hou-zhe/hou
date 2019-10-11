//所有vue组件的母亲是Vue。父亲是Vue.prototype, javascript规定父亲具有的属性和方法儿子自动具有
import Vue from 'vue';
import notice from './Notice';
import alert from './Alert';
import confirm from './Confirm';

Vue.prototype.$alert = alert;
Vue.prototype.$notice = notice;
Vue.prototype.$confirm = confirm;