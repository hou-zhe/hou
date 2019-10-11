import axios from 'axios';
import { MessageBox,Loading } from 'element-ui';
import router from '../router';
//一个永远是pending状态的promise
const alwaysPendingPromise = new Promise(() => {});
let loadingInstance = null;

//返回一个promise对象
function http(options) {
        let defaultOptions = { method: 'post', withToken: false };
        //显示loading组件
        options = Object.assign({}, defaultOptions, options);
        if(options.withToken) {
                options.headers = {
                        Authorization:sessionStorage.getItem('token')
                }
        }
        loadingInstance = Loading.service();                    //发送Ajax前显示loading
        return axios(options)
                .then(response =>{
                        if(response.status === 200) return response.data || JSON.parse(response.request.responseText);
                        else throw new Error(response.statusText)
                })
                .then(result =>{
                        let {status, data, message} = result;
                        switch(status){
                                case 200:
                                        if(message !== '') MessageBox.alert(message,'提示',{ showClose: false, type: 'success' });
                                        loadingInstance.close();                //关闭loading
                                        return data;
                                case 401:               //没登录
                                        sessionStorage.removeItem('token');             //不管没登录耗时token过期都把sessionStorage里的token清一下
                                        sessionStorage.removeItem('name');
                                        message= '您未登录或登录超时...';
                                        router.replace('/login');                               //跳转至登录页面
                                case 199:
                                case 500:
                                        throw new Error(message);
                        }
                })
                .catch(err => {
                        MessageBox.alert(err.message,'警告', {showClose: false,type: 'warning'});
                        loadingInstance.close();                        //关闭loading
                        return alwaysPendingPromise;  //返回一个永远是pendging的promise
                })
}

export default http;