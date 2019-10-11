<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="header-top"></div>
			<button class="login" @click="login" v-text="session ? `账号 ` + session : '点击登录'">点击登录</button>
			<button class="clear" v-show="session" @click="clear">退出当前账号</button>
		</div>
		<div class="content">
			<ul class='content-top'>
				<li>
					<i class="iconfont icon-tobe-apply"></i>
					<span>待支付</span>
				</li>
				<li>
					<i class='iconfont icon-tobe-delivery'></i>
					<span>待发货</span>
				</li>
				<li>
					<i class='iconfont icon-tobe-receive'></i>
					<span>待收货</span>
				</li>
			</ul>
			<ul class="content-center">
				<li>
					<i class='iconfont icon-code'></i>
					<span @click="$router.push('/personal')">个人资料</span>
				</li>
				<li>
					<i class='iconfont icon-friends'></i>
					<span>已邀请好友<em>(每邀请一人可获200元现金券)</em></span>
				</li>
				<li>
					<i class='iconfont icon-cash'></i>
					<span>现金券</span>
				</li>
			</ul>
			<ul class='content-btm'>
				<li>
					<router-link to="/orderlist">
						<i class='iconfont icon-order'></i>
						<span>我的订单</span>
						<em>查看全部订单<i class='iconfont icon-than'></i></em>

					</router-link>
				</li>
				<li>
					<router-link to="/address">
						<i class='iconfont icon-address'></i>
						<span>收货地址</span>
					</router-link>
				</li>
				<li>
					<a href="">
						<i class='iconfont icon-phone'></i>
						<span>客服电话</span>
						<em>400-058-7077</em>
					</a>
				</li>
				<li>
					<a href="">
						<i class='iconfont icon-weixin'></i>
						<span>客服微信</span>
						<em><img :src="customPic" alt=""></em>
					</a>
				</li>
				<li>
					<a href="">
						<i class='iconfont icon-set'></i>
						<span>我的设置</span>
						<em>+200元现金券<i class='iconfont icon-than'></i></em>
					</a>
				</li>
				<li>
					<a href="">
						<i class='iconfont icon-about'></i>
						<span>关于我们</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="footer">
			<StNav></StNav>
		</div>

	</div>
</template>

<script type="text/ecmascript-6">
        let session = sessionStorage.getItem('user');
	import StNav from'../../components/StNav';
	import customPic from './kefu.jpg';
	import API from '../../util/api.js';
	export default {
	        components: {StNav},
		data() {
	                return{
                                customPic,
		                session
	                }
		},
		methods: {
	                login() {
	                        this.$router.push({path: '/login'})
	                },
			clear() {
	                        sessionStorage.clear();
                                location.reload();
//				this.session ='';
			}
		},
		watch: {
	                session(newValue){
                                this.$router.push('/login');
			}

		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		box-sizing: border-box
		padding: 0 0.2rem
		display: flex
		flex-direction: column
		background: url(user-background.png) no-repeat center center
		background-size: cover
		.header
			height: 2.8rem
			flex-shrink: 0
			display: flex
			flex-direction: column
			align-items: center
			padding-top: 0.6rem
			.header-top
				background: url(logo-w.png) no-repeat center center
				background-size: 80% auto
				border: 1px solid #cacaca
				border-radius: 0.6rem
				width: 1.2rem
				height: 1.2rem
				margin-bottom: 0.4rem
			button
				color: #cacaca
				border: 1px solid #cacaca
				background-color: transparent
				width: 2rem
				height: 0.4rem
				font-size: 0.24rem
			button.clear
				margin-top: 0.2rem
				color: red
				border: none
		.content
			flex-grow: 1
			padding-bottom: 2rem
			ul
				background: rgba(255,255,255,0.8)
			ul.content-top
				display: flex
				justify-content: center
				align-items: center
				height: 1rem
				border-radius: 0.1rem
				li
					flex-grow: 1
					text-align: center
					border-right: 1px solid #000
					display:flex
					flex-direction: column
					i
						font-size: 0.32rem;
			ul.content-center
				height: 3rem
				display: flex
				flex-direction: column
				border-radius: 0.1rem
				margin-top: 0.3rem
				li
					flex-grow: 1
					border-bottom: 1px solid #000
					display: flex
					align-items: center
					padding-left: 0.2rem
					i
						font-size: 0.4rem
					span
						margin-left: 0.1rem
						font-size: 0.28rem
						em
							font-size: 0.24rem
							font-style: normal
							color: #676767
			ul.content-btm
				height: 5.8rem
				display:flex
				flex-direction: column
				margin-top: 0.3rem
				border-radius: 0.1rem
				padding-bottom: 0.6rem
				li
					width: 100%
					flex-grow: 1
					box-sizing: border-box
					padding:0 0.2rem
					line-height: 1rem
					border-bottom: 1px solid #000
					a
						color: #000
						i
							font-size: 0.4rem
						span
							margin-left: 0.1rem
							font-size: 0.28rem
						em
							font-size: 0.24rem
							font-style: normal
							color: #676767
							float: right
							position: relative
							img
								width: 0.6rem
								height: 0.6rem
								position: absolute
								right: 0.15rem
								top: 0.25rem
							i
								font-size: 0.3rem

		.footer
			width: 100%
			height: 1rem
			flex-shrink: 0
			position: fixed
			bottom: 0
			left: 0
			z-index: 100
			background-color: white
</style>