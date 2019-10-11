import http from './http.js';
export default {
        user: {
                login(ajaxData) { return http({ url: '/user/login/admin', data: ajaxData }); },
                changePwd(ajaxData) {
                        return http({ url: '/user/changepwd', data: ajaxData, withToken: true })
                }
        },
        category: {
                getData(fid){
                        return http({method: 'get', url: '/category/all/' + fid});
                },
                //ajaxData = { fid: ?, avatar: ? , name: ? }
                addCategory(ajaxData){
                        return http({url: '/category/add', data: ajaxData});
                },
                //ajaxData = { id: ? , avatar: ? }
                removeCategory(ajaxData) {
                        return http({ url: '/category/remove',data: ajaxData })
                },
                //ajaxData = { id: ?, fid: ?, avatar: ?, name: ?, oldAvatar: ? }
                updateCategory(ajaxData) {
                        return http({ url:'/category/update', data: ajaxData })
                }
        },
        product: {
                //ajaxData={name: ?, mId:?, sId: ?,begin: ?,pagesize: ?}
                getProductData(ajaxData){
                        return http({url: '/product/admin-list', data: ajaxData});
                },
                //ajaxData={ id: ?, filePath: ?, newBannerImages: ? }
                removeBanner(ajaxData){
                        return http({url: '/product/banner/remove', data: ajaxData});
                }
        }
}

