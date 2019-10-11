<template>
	<div class="page-wrapper">
		<div class="header">
			<a @click="$router.back();" class="iconfont icon-back"></a>
			<h2 class="title">提交订单</h2>
		</div>
		<div class="address">
			<span >收货地址</span>
			<div class="list">
				<span  class="receive-name" v-text="address.receiveName"></span>
				<span class='receive-tel' v-text="address.receiveTel"></span>
				<span class='receive-address' v-text="address.receiveAddress +`` +address.receiveAddressDetail"></span>
			</div>
		</div>
		<div class="content">
			<p>商品信息</p>
			<div class="content-content">
				<div class="lft"><img :src="list.avatar"></div>
				<div class="rgt">
					<p class="name" v-text="list.name"></p>
					<p class="remark" v-text="list.remark"></p>
					<p class="price" v-text="`￥`+list.price"></p>
				</div>
			</div>
		</div>
		<div class="footer">
			<p><span>现金券</span><span class="iconfont icon-qianjinxiayige"></span></p>
			<p><span>原价</span><span class='price-n' v-text="`￥` + list.price"></span></p>
			<p><span>配送邮费</span><span>￥ 6</span></p>
			<p><span>应付金额</span><span class='price-t' v-text="`￥`+truePrice"></span></p>
			<button class='submit' @click="generateOrder" >提交订单</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import { mapState,mapActions } from 'vuex'
	import API from '../../util/api.js';
        import http from '../../util/http.js';
        export default {
                data() {
                        return{
                                list: [],
	                        addressId: 0,
	                        ids: []
                        }
                },
	        computed: {
                        address() {return this.$store.state.address.list.find(item => item.id ===this.addressId); },
		        account() { return this.list.price },
		        truePrice(){return this.list.price + 6}
	        },
	        methods: {
                        ...mapActions('address', ['init']),
		        getProduct(id) {
		                return API.order.getProductId(id).then(data=> {this.list = data}  );
		        },
//		        getProductList(id){
//                                return http({
//	                                url: '/order/list/' + id,
//	                                withToken: true
//                                }).then(data => this.list =data);
//		        },
                        generateOrder() {
                                this.ids.push(this.list.id);
                                http({
	                                url:'/cart/settlemented',
	                                data: {
	                                        ids:JSON.stringify(this.ids),
		                                account: this.list.price,
		                                addressId: this.addressId
	                                },
	                                withToken: true
                                }).then(()=>{
                                        this.$router.replace('/order')
                                })
                        },

	        },
	        created() {
                        this.getProduct(this.$route.params.id);
                        this.init().then(() => {
                                let defaultAddress = this.$store.state.address.list.find(item => item.isDefault);
                                this.addressId = defaultAddress ? defaultAddress.id : 0;
                        })
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ddd;
		&>*
			background-color: white;
		.header
			flex-shrink: 0;
			width: 100%;
			height: 0.8rem;
			border-bottom: 1px solid #aaa;
			display: flex;
			align-items: center;
			justify-content: space-between;
			a
				width: 0.8rem;
				height: 100%;
				font-size: 0.32rem;
				text-align: center;
				line-height: 0.8rem;
			h2.title
				font-weight: 400
		.header:after
			content: '';
			width: 0.8rem;
			height: 100%;
		.address
			flex-shrink: 0;
			height: 1.5rem;
			width: 100%;
			box-sizing: border-box;
			padding: 0.2rem;
			display: flex;
			flex-direction: column;
			.list
				margin-top: 0.15rem;
				padding-left: 0.2rem;
				width: 90%;
				height: 100%;
				span
					margin-right: 0.3rem
				span.receive-name
					color: darkred
				span.receive-address
					margin-top: 0.1rem
					display: block
		.content
			flex-shrink: 0;
			height: 2.5rem;
			margin-top: 0.2rem;
			padding: 0.2rem
			.content-content
				display: flex;
				.lft
					margin-top: 0.2rem
					margin-left: 0.2rem
					img
						width: 1.2rem;
						height: 1.6rem;
				.rgt
					margin-top: 0.5rem;
					margin-left: 0.4rem
					p
						margin-bottom: 0.1rem
						color: #8d8d8d
		.footer
			flex-grow: 1
			padding: 0.2rem
			margin-top: 0.2rem
			p
				height: 0.6rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				span.iconfont
					font-size: 0.3rem
				span.price-t
					color: red;
			button.submit
				margin-top: 0.3rem
				height: 0.8rem
				background-color: #000
				color: white
				width: 100%
				font-size: 0.24rem
				outline: none
</style>