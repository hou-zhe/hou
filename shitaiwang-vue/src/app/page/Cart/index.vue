<template>
	<div class="page-wrapper">
		<div class="header">
			<a @click="$router.back();" class="iconfont icon-back"></a>
			<h1 class="title">购物袋</h1>
			<button class="btn-toggle" v-text="isEdit ? '完成' : '编辑'" @click="isEdit = !isEdit">编辑</button>
		</div>
		<div class="cart-empty" v-if="list.length ===0">
			<img :src="emptyImage" alt="">
			<p>购物车还没有商品哦~</p>
			<router-link to="/home">去逛逛</router-link>
		</div>
		<template v-else>
			<div class="content" >
				<ul class="cart-list">
					<li v-for="item in list" :key="item.id">
						<i class="checkbox" :class="{ checked: item.select1 }" v-show="!isEdit" @click="toggleSelect1(item.id)"></i>
						<i class="checkbox" :class="{ checked: item.select2 }" v-show="isEdit" @click="toggleSelect2(item.id)"></i>
						<router-link :to="`/detail/${ item.pid }`" class="avatar-wrapper">
							<img :src="item.avatar" alt="">
						</router-link>
						<div class="cart-info">
							<router-link :to="`/detail/${ item.pid }`" class="name-wrapper">
								<h3 v-text="item.name"></h3>
								<p class="remark" v-text="item.remark"></p>
								<p class="delivery" v-text="item.delivery"></p>
							</router-link>
							<div class="cart-info-footer">
								<span class="price" v-text="`￥ ${ item.price }`"></span>
								<div class="count-wrapper">
									<StCount :count="item.count"
									         :decrease="e =>decrease({ id: item.id,loadingEl:  e.target.parentNode })"
									         :increase="e =>increase({ id: item.id,loadingEl: e.target.parentNode })"
									></StCount>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="footer footer-normal" :class="{ hide: isEdit }">
			<span class="all" @click="toggleAllSelect1(!allSelect1)">
				<i class="checkbox" :class="{ checked: allSelect1 }"></i>
				全选</span>
				<span class="account-wrapper"><em class="count" v-text="`应付金额：￥${ account }`"></em></span>
				<button class="btn-settlement" v-if="total1" @click="$router.push('/orderconfirm')" :disabled="total1 ===0" :class="{ disabled: total1 ===0 }">去结算
					<em class="total" v-show="total1" v-text="`已选数目(${ total1 })`"></em>
				</button>

				<button class="btn-settlement empty" v-else @click="" :disabled="total1 ===0" :class="{ disabled: total1 ===0 }">去结算
				</button>
			</div>
			<div class="footer footer-edit" :class="{ hide: !isEdit }">
				<span class="all" @click="toggleAllSelect2(!allSelect2)"><i class="checkbox" :class="{ check:allSelect2 }"></i>全选</span>
				<button class="btn-delete"  @click="remove" :disabled="total2 ===0" :class="{ disabled: total2===0 }">删除
					<em class="total" v-show="total2" v-text="`(${ total2 })`"></em></button>
			</div>
			<div class="final">
				<StNav></StNav>
			</div>
		</template>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	import StNav from '../../components/StNav';
        import StCount from '../../components/StCount';
        import emptyImage from './empty_cart.png';

	let { mapActions,mapState,mapMutations,mapGetters } = createNamespacedHelpers('cart');
	export default {
	        components: { StCount,StNav },
		data() {
		        return{
		                isEdit: false,
			        emptyImage
		        }
		},
		computed: {
			...mapState(['list']),
                        allSelect1() { return this.list.every(item=>item.select1); },
                        allSelect2() { return this.list.every(item =>item.select2); },
                        total1() { return this.list.reduce((result,item) =>item.select1 ? item.count + result: result,0 ); },
                        total2() { return this.list.reduce((result,item) =>item.select2 ? item.count + result: result,0 );  },
                        account() { return this.list.reduce((result,item) =>item.select1 ?  item.count * item.price + result : result, 0); }
		},
		methods: {
			...mapMutations(['reset','toggleAllSelect1','toggleAllSelect2','toggleSelect1','toggleSelect2']),
			...mapActions(['init','decrease','increase','remove'])
		},
		created() { this.init() }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	i.checkbox
		display:inline-block
		width: 0.26rem
		height:0.26rem
		background:url(./radio.png) no-repeat center center
		background-size: 100%
		margin-right: 0.1rem
		vertical-align:middle
	i.checkbox.checked
		display:inline-block
		width: 0.26rem
		height:0.26rem
		background:url(./radio-active.png) no-repeat center center
		background-size: 100%
		align: middle
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
			line-height: 0.8rem
			text-align center
			border-bottom 3px solid #f1f1f1
			a
				display: block
				width: 0.8rem
				height: 100%
				font-size 0.3rem
			h1
				text-align: center
				font-weight: normal
				font-size 0.4rem
			button.btn-toggle
				width: 0.8rem
				background-color: #fff
				font-size: 0.32rem
		.cart-empty
			flex-grow: 1
			display: flex
			flex-direction: column
			justify-content: center
			align-items: center
			img
				width: 1.8rem
				height: 1.8rem
			p
				color: #666
				font-size: 0.26rem
				padding: 0.26rem 0
			a
				width: 2rem
				border-radius: 0.35rem
				border: 1px solid #bb9e72
				color: #bb9e72
				text-align: center
				font-size: 0.26rem
		.content
			flex-grow: 1
			ul
				background-color: #f1f1f1
				li
					width: 100%
					height: 1.8rem
					margin-bottom: 0.2rem
					display: flex
					align-items center
					justify-content: space-between
					box-sizing: border-box
					padding: 0 0.3rem
					background-color: white
					i
						margin: auto 0
						flex-shrink: 0
					a.avatar-wrapper
						width: 1.2rem
						height: 100%
						img
							width: 100%
				.cart-info
					display: flex
					flex-grow: 1
					justify-content: space-between
					a.name-wrapper
						color: #939393
						margin-left 0.2rem
						h3
							color: #707070
							font-size 0.28rem
							font-weight: 600
						p.remark
							margin: 0.2rem 0
					.cart-info-footer
						display:flex;
						flex-direction: column;
						justify-content: space-between;
						margin-top: 0.2rem
						.st-count
							margin-bottom 0.1rem
						span.price
							font-size: 0.28rem
							color: red
							text-align: center
		.footer
			flex-shrink: 0
			display: flex
			justify-content: space-between
			align-items: center
			flex-wrap: wrap
			padding: 0 0.2rem
			span
				margin-top 0.2rem
				em
					font-style: normal
					font-size: 0.28rem
			button
				width: 100%
				height: 0.8rem
				margin: 0.2rem 0
				font-size: 0.3rem
				background-color: #000
				color: white
				em
					font-style: normal
					font-size: 0.26rem
			button.empty
				background-color: #ccc
				&.disabled
					background-color: #b0b0b0
		.footer.hide
			display: none
		.final
			border-top: 1px solid #999
</style>