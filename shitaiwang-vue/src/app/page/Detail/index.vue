<template>
	<div class="page-wrapper">
		<div class="header">
			<a @click="$router.back();" class="iconfont icon-back"></a>
			<h1 class="title">商品详情</h1>
			<a href="" class="iconfont icon-home"></a>
		</div>
		<div class="content">
			<div class="banner" ref="banner">
				<ul v-if="banner.length > 0" :style="{ width:(banner.length + 2) + '00%' }" >
					<li><img :src="banner[banner.length - 1]" alt=""></li>
					<li v-for="(item,i) in banner" :key="i">
						<img :src="item" alt="">
					</li>
					<li><img :src="banner[0]" alt=""></li>
				</ul>
				<span class="indicator">{{ bannerIndex }}/{{ banner.length }}</span>
			</div>
			<div class="banner-footer">
				<p class="name" v-text="model.name"></p>
				<span class="remark" v-text="model.remark"></span>
				<em class='price'>{{`原价：￥`+ model.price }}</em>
			</div>
			<div class="pic-bottom"><p>{{ model.delivery }}</p></div>
			<div class="detail">
				<span>商品描述</span>
				<div class="describe">{{model.describe}}</div>
			</div>
		</div>
		<div class="footer">
			<router-link to="/cart" class="cart">
				<i class="iconfont icon-bag"><em  v-text="cartCount"></em></i>
			</router-link>
			<div class="start">
				<i class='iconfont icon-xing'></i>
			</div>
			<div class="add-cart" @click="isShopping=true">加入购物袋</div>
			<div class="purches" @click="$router.push({ path: '/myorder/'+ `${ id }` })">立即购买</div>
		</div>
		<StPopup :is-show=isShopping @close="isShopping = false">
			<div class="shopping-dialog">
				<div class='shopping-dialog-header'>
					<div class="img"><img class='avatar' :src="model.avatar" alt="" /></div>
					<em class='price'>￥{{ model.price }}</em>
				</div>
				<div class="shopping-dialog-content">
					<span class="title">数量</span>
					<div class="count-wrapper">
						<StCount :count="count" :increase="() => count = count +1" :decrease="()=>count = count - 1"></StCount>
					</div>
				</div>
				<div class="shopping-dialog-footer">
					<button class='btn-add-cart' @click="buy">确认</button>
				</div>
			</div>
		</StPopup>
	</div>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
	import StPopup from '../../components/StPopup';
	import StCount from '../../components/StCount';
	import { mapActions } from 'vuex';
	import imagesLoaded from 'imagesloaded';
	import IScroll from 'iscroll';

	export default{
	        components: { StPopup,StCount },
		data() {
	                return {
	                        model: {},
		                id: 0,
                                bannerIndex: 0,
		                cartCount: 0,
		                count: 1,
		                isShopping: false
	                }
		},
		computed: {
                        banner() {
                                return this.model.banner ? this.model.banner.split(',') : [];
                        }
		},
		watch: {
                        id( newValue ) {this.getItem(newValue).then(data => this.model = data);},
                        banner(newValue) {
                                if(newValue.length ===0) return;
                                this._initBannerScroll();
                        }
		},
		methods: {
			...mapActions('product',['getItem']),
			_updateCartCount() {
			        if(sessionStorage.getItem('token'))
			                        API.cart.getCartCount().then(data => {this.cartCount = data});
			        else this.cartCount=0;
			},
                        _initBannerScroll() {
                                this.$nextTick(() => {                                                                           //保证banner对应的html元素更新完毕
                                        imagesLoaded(this.$refs.banner,() => {                                        //保证iscroll区域所有图片加载完毕
                                                this.$nextTick(() => {                                                           //保证iscroll区域的所有样式渲染完毕
                                                        this.bannerScroll = new IScroll(this.$refs.banner, {
                                                                scrollY: false,         //关闭纵向滚动
                                                                scrollX: true,          //开启横向滚动
                                                                momentum: false,        //关闭惯性滚动
                                                                snap: true              //开启轮播图模式滚动
                                                        });
                                                        this.bannerScroll.on('scrollStart',() => {clearTimeout(this.timer);});   //停止自动播放
                                                        this.bannerScroll.on('scrollEnd',() => {                                            //调整整个滚动的位置，以实现无缝滚动

                                                                let len = this.banner.length + 2;
                                                                if(this.bannerScroll.currentPage.pageX === 0) {
                                                                        this.bannerScroll.disable();                                            //调整期间，不允许滚动
                                                                        setTimeout(() => {
                                                                                this.bannerScroll.goToPage(len - 2, 0, 0);
                                                                                this.bannerScroll.enable();                                     //恢复滚动
                                                                        },10);
                                                                }
                                                                if(this.bannerScroll.currentPage.pageX === len - 1) {
                                                                        this.bannerScroll.disable();
                                                                        setTimeout(() =>{
                                                                                this.bannerScroll.goToPage(1,0,0);
                                                                                this.bannerScroll.enable();
                                                                        },10);
                                                                }
                                                                let curPage = this.bannerScroll.currentPage.pageX;
                                                                if(curPage === 0) this.bannerIndex = len - 2;
                                                                else if(curPage === len - 1) this.bannerIndex = 1;
                                                                else this.bannerIndex = curPage;
                                                                this.timer = setTimeout(() => this.bannerScroll.next(), 3000);                         //再次开启自动播放
                                                        });
                                                        this.bannerScroll.goToPage(1,0,0);                                                                         //初始化显示第二页（第一张图片）
                                                        this.bannerIndex = 1;                                                                                            //记录更新当前是第几张
                                                        this.timer = setTimeout(() => this.bannerScroll.next(), 3000);                                //开始自动播放
                                                })
                                        })
                                });
                        },
                        buy() {
                                API.cart.addProduct(this.id,this.count).then(() =>{
                                        this.count = 1;
                                        this.isShopping = false;
                                        this.cartCount = this.cartCount +this.count;
                                        this.$notice('成功加入购物车,gogogo...');
                                });
                        }
		},
		created() { this.id = parseInt(this.$route.params.id); this._updateCartCount(); }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.shopping-dialog
		display:flex
		flex-direction: column
		width: 100%
		box-sizing: border-box
		margin: 0.6rem 0 0.4rem
		.shopping-dialog-header
			display:flex
			align-items center
			padding: 0.3rem
			border-bottom: 1px solid #999
			.img
				width: 2rem
				height: 2rem
				background-color: #f1f1f1
				img
					width: 100%
					height: 100%
					box-sizing: border-box
					padding: 0.2rem
			em.price
				font-style: normal
				font-weight: 600
				color: #b60909
				font-size: 0.4rem
				line-height: 1.8rem
				margin-left 0.2rem
		.shopping-dialog-content
			flex-grow: 1
			padding: 0.3rem
			span.title
				font-size: 0.3rem
				margin-top: 0.2rem;
			.count-wrapper
				font-size: 0.3rem
				margin: 0.4rem 0
		.shopping-dialog-footer
			height: 0.8rem
			text-align: center
			margin-top 0.3rem
			.btn-add-cart
				font-size: 0.34rem
				color: white
				border-radius: 0.3rem
				width: 85%
				height: 100%
				background-color: #b60909
				outline: none
	.page-wrapper
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		.header
			height: 0.8rem
			flex-shrink: 0
			display: flex
			justify-content: space-between
			align-items: center
			border-bottom: 1px solid #000
			a
				width: 0.8rem
				text-align: center
				font-size 0.34rem
			h1.title
				font-weight: 400
				font-size: 0.3rem
		.content
			flex-grow: 1
			overflow: auto
			.banner
				position: relative
				overflow: auto
				padding:0
				touch-action:pan-x
				ul
					display: flex
					li
						width: 100%
						height: 10rem
						font-size: 0
						img
							width: 100%
							height: 100%
				span.indicator
					position: absolute
					bottom: 0.5rem
					right: 0.5rem
					color: red
			.banner-footer
				display: flex
				flex-direction: column
				align-items:center
				p.name
					color: #272727
					font-size: 0.3rem
				span.remark
					color: #959595
					font-size 0.24rem
					margin: 0.1rem 0
				em.price
					font-style: normal
			.pic-bottom
				width: 100%
				height: 0.6rem
				background-color: #f1f1f1
				text-align: center
				line-height: 0.6rem
				margin-top: 0.3rem
			.detail
				margin-top: 0.5rem
				padding: 0.3rem
				.describe
					margin: 0.2rem 0
		.footer
			height: 0.9rem
			flex-shrink: 0
			display: flex
			justify-content: center
			align-items: center
			text-align: center
			width:100%
			border-top: 1px solid #666;
			background-color: white
			a.cart
				flex-grow: 1
				border-right: 1px solid #000
				position: relative
				i
					font-size: 0.4rem
					color: black
					em
						font-size: 0.26rem
						font-style: normal
						position: absolute
						top: 0
						right: 0.2rem
						color: red
			.start
				flex-grow: 1
				border-right: 1px solid #000
				i
					font-size: 0.4rem
			.add-cart
				flex-grow: 2
			.purches
				flex-grow: 2
				background-color: black
				height: 100%
				line-height: 0.9rem
				color:white
</style>