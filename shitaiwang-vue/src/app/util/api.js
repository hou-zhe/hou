//负责和服务器对接
import http from './http.js';
export default {
        category: {
                getData(fid) { return http({ method: 'get', url: 'category/all/' + fid }); } },
        cart: {
                getCartInfo() { return http({ url: '/cart/list', withToken: true }); },
                increase(id,loadingEl) { return http({ withToken: true,method: 'get', url: '/cart/increase/' + id, loading: false,loadingEl });  },
                decrease(id,loadingEl) { return http({withToken: true, method: 'get', url: '/cart/decrease/' + id, loading: false,loadingEl  });  },
                remove(ids) { return http({withToken: true, url: '/cart/delete', data: { ids: JSON.stringify(ids) } }); },
                settlement(ids, account, addressId) { return http({ withToken: true,url: '/cart/settlement',data: {ids: JSON.stringify(ids),account,addressId} }); },
                addProduct(pid,count) { return http({ withToken: true,url: '/cart/addproduct', data: { pid,count } }); },
                getCartCount() { return http({ withToken: true, method: 'get', url: '/cart/getcount' }); }
        },
        user: {
                loginByPwd(account,pwd) { return http({ url: '/user/login/pwd', data: { account,pwd },loading:false }); },
                loginByPhone(tel,code) { return http({ url: '/user/login/phone',data: {tel,code}, loading: false }); },
                loginCode(){ return http({ url: '/user/login/getcode',method: 'get',loading: false }); },
                //获取个人资料
                getPersonalList(){return http({ url: '/user/getlist',withToken: true })},
                //个人资料修改
                update({...ajaxData}) {
                        return http({ url: '/user/update', withToken: true, data: ajaxData });
                }
        },
        product: {
                getList(ajaxData) {
                        return http({ url: '/product/all',data: ajaxData, loading: false })
                },
                getItem(id) { return http({ url: '/product/pics/'+ id, method: 'get' }); }
        },
        address: {
                list() {
                        return http({ url: '/address/list', withToken: true });
                },
                //ajaxData = { receiveName, receiveTel, receiveAddress, receiveAddressDetail }
                add( ajaxData ) {
                        return http({ url: 'address/add', withToken: true, data: ajaxData });
                },
                //将要解析的从对象中摘出来，其余的收缩成一个新的对象
                update({id,...ajaxData}) {
                        return http({ url: '/address/update/' + id, withToken: true, data: ajaxData });
                },
                remove(id) {
                        return http({ url: '/address/delete/' + id, withToken: true });
                },
                setDefault(id) {
                        return http({ url: '/address/default/' + id, withToken: true });
                }
        },
        order: {
                getProductId(id) {
                        return http({ url: '/order/all/' + id,method: 'get',withToken: true })
                },
               getAllOrderList() {
                        return http({ url: '/myorder/list',withToken: true });
                },
                //获取所有未付款订单
                getAllCartList() {
                        return http({ url: '/myorder/cartlist',withToken: true });
                }
        }
};