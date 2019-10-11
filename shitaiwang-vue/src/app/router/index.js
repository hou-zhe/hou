import Vue from 'vue';
import Router from 'vue-router';
import page from '../page';

Vue.use(Router);

const router = new Router({
        mode:'hash',
        routes:[
                { path:'/',redirect:'./home' },
                { path:'/home',component:page.Home },
                { path:'/category',component:page.Category },
                { path:'/brand',component:page.Brand },
                { path:'/cart',component:page.Cart },
                {
                        path:'/list/:mId/:sId',
                        component: page.List,
                        meta:{ keepAlive: true }
                },
                { path:'/address',component:page.Address },
                { path:'/login',component:page.Login,name: 'login' },
                { path:'/detail/:id',component:page.Detail },
                { path:'/order',component:page.Order },
                { path:'/list',component:page.List },
                { path: '/profile',component:page.Profile },
                { path:'/myorder/:id',component: page.Myorder },
                { path: '/orderconfirm',component: page.OrderConfirm },
                { path: '/orderlist', component: page.OrderList },
                { path: '/personal', component: page.Personal }
        ]
});



//定制路由全局守卫(每当切换路由前都会被自动调用)
router.beforeEach((to,from,next)=> {
        if(to.meta.authenticate && !sessionStorage.getItem('token')){
                router.push({name: 'login', params: { reference:to.fullPath }});
        }
        //如果是直接访问登录页面或是从http401跳的登录
        else if(to.fullPath ==='/login' && !to.params.reference) {
                to.params.reference =from.fullPath;
                next();
        }
        next();
});


export default router;