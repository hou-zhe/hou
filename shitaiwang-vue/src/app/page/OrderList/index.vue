<template>
	<div class="page-wrapper">
		<div class="header">
			<router-link to="/profile" class="iconfont icon-back"></router-link>
			<h2 class='title'>我的订单</h2>
		</div>
		<div class="content">
			<div class="left">
				<p class='all' @click="isShow">查看全部订单</p>
				<p class='not' @click="getCartList">查看未付款订单</p>
			</div>
			<div class="right">
				<ul class='all' :class="{hide: !isNot}">
					<li v-for="item in list">
						<router-link :to="`/detail/${ item.id }`">
							<img :src="item.avatar" alt="">
							<div class="wenzi">
								<span class="name" v-text="item.name"></span>
								<span class="remark" v-text="item.remark"></span>
								<span class="price" v-text="`￥`+item.price"></span>
								<span class="shoped">已购 {{ item.shopCount }} 件</span>
							</div>
						</router-link>
					</li>
				</ul>
				<ul class='not' :class="{hide: isNot }">
					<li v-for="item in cartList">
						<router-link :to="`/detail/${ item.pid }`">
							<img :src="item.avatar" alt="">
							<div class="wenzi">
								<span class="name" v-text="item.name"></span>
								<span class="remark" v-text="item.remark"></span>
								<span class="price" v-text="`￥`+item.price"></span>
								<span class="shoped">{{ item.shoppingTime }} </span>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<StNav></StNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
	import StNav from '../../components/StNav';
        export default {
                components: { StNav },
                data() {
                        return{
                                list: [],
	                        cartList: [],
	                        isNot: true
                        }
                },
	        methods: {
                        init() {
                                return API.order.getAllOrderList().then(data=> this.list = data);
                        },
                        getCartList() {
                                this.isNot=false;
                                return API.order.getAllCartList().then(data=> this.cartList = data);
                        },
		        isShow() {
                                this.isNot=true;
		        }
	        },
	        created() {
                        this.init();
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.hide
		display: none
	.page-wrapper
		width: 100%
		height: 100%
		background-color: #eee
		display: flex
		flex-direction: column
		.header
			background-color: white
			height: 1rem
			width: 100%
			flex-grow: 0
			display: flex
			&>*
				text-align: center
				line-height: 0.8rem
				height: 100%
			a
				display: block
				width: 0.8rem
				font-size: 0.36rem
			h2
				flex-grow: 1
				font-style: normal
				font-size: 0.36rem
		.header:after
			content: ''
			display: block
			width: 0.8rem
		.content
			flex-grow: 1
			width: 100%
			height: 100%
			overflow: auto
			display: flex
			.left
				width: 2.2rem
				background-color: #ccc
				p
					height: 1rem
					background-color: #ddd
					margin-top: 0.3rem
					line-height: 1rem
					text-align: center
					font-size: 0.26rem
			.right
				overflow: auto
				ul
					li
						border-bottom: 1px solid #000
						height: 3rem
						a
							display: flex
							padding: 0.2rem
							img
								width: 2rem
								height: 2.5rem
								border-radius: 0.2rem
							.wenzi
								display: flex
								flex-direction: column
								justify-content: center
								margin-left: 0.3rem
								color: #666
								span
									margin-top: 0.1rem
								span.shoped
									background-color: #f1f1f1
									width: 2.5rem
									text-align: right
									color: #666
		.footer
			width: 100%
			background-color: white
			flex-grow: 0
			height: 1rem
</style>