<template>
	<div class="wrapper">
		<div class="header">
			<img src="/static/img/logo.png" alt="">
		</div>
		<div class="search">
			<input type="text" placeholder="搜索从这里开始...">
			<button><i class='iconfont icon-search'></i></button>
		</div>
		<div class="banner">
			<img src="/static/img/banner.jpeg" alt="">
		</div>
		<div class="content">
			<div class="content-top">
				<div class="xian"></div>
				<div class="content-title">新品上架</div>
			</div>
			<!-- 轮播 -->
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div v-for='el in arrItem' class="swiper-slide">
						<img class="img" :src="el.imgUrl">
						<span class="name" v-text="el.pname"></span>
						<span class="price" v-text="el.pprice"></span>
					</div>
				</div>
			</div>
			<div class="check">
				<button type="button" @click="bag">查看全部</button>
			</div>

			<div class="brand">
				<h2>热门品牌</h2>
				<div class="brand-content">
					<img src="/static/img/floor2.png" alt="">
					<img src="/static/img/floor202.png" alt="">
					<img src="/static/img/floor203.png" alt="">
					<img src="/static/img/floor204.png" alt="">
					<img src="/static/img/floor205.png" alt="">
					<img src="/static/img/floor206.png" alt="">
				</div>
				<button type="button" class="check" @click="bag">查看全部</button>
			</div>
			<div class="information">
				<div class="xian"></div>
				<div class="content-title">潮流资讯</div>
			</div>
			<div class="content-btm-pics">
				<img src="/static/img/content101.jpg" >
				<img src="/static/img/content102.jpg" >
				<img src="/static/img/content103.jpg" >
			</div>
		</div>
		<div class="footer">
			<StNav></StNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import StNav from'../../components/StNav';
        import Swiper from 'swiper';
        import 'swiper/dist/css/swiper.css';
	export default{
	        components: {StNav},
                mounted:function(){
                        new Swiper('.swiper-container', {
                                slidesPerView: 3,
                                spaceBetween: 30,
                                pagination: {
                                        el: '.swiper-pagination',
                                        clickable: true,
                                },
                        })},
		data() {
	                return {
                                arrItem:[
                                        {
                                                name:'swiperSlide1',
                                                imgUrl:'/static/img/pic101.jpeg',
	                                        pname: 'BVLGARI',
	                                        pprice: '￥13650'
                                        },
                                        {
                                                name:'swiperSlide2',
                                                imgUrl:'/static/img/pic102.jpeg',
	                                        pname: 'CHRISTIAN DRIO',
	                                        pprice: '￥9360'
                                        },
                                        {
                                                name:'swiperSlide3',
                                                imgUrl:'/static/img/pic103.jpeg',
	                                        pname: 'CHRISTIAN DIOR',
	                                        pprice: '￥7020'
                                        },
                                        {
                                                name:'swiperSlide4',
                                                imgUrl:'/static/img/pic104.jpeg',
	                                        pname:'PRADA',
	                                        pprice: '￥4020'
                                        },
                                        {
                                                name:'swiperSlide5',
                                                imgUrl:'/static/img/pic105.jpeg',
	                                        pname: 'PRADA',
	                                        pprice:'￥7761'
                                        },
                                        {
                                                name:'swiperSlide6',
                                                imgUrl:'/static/img/pic106.jpeg',
	                                        pname:'MONCLER',
	                                        pprice:'￥3042'
                                        },
                                ]
	                }
		},
		methods: {
                        bag() {
                                this.$router.push({path: '/list/1/14'})
                        }
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.wrapper
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		.header
			flex-shrink: 0
			width: 100%
			height: 0.68rem
			background-color: #f3f3f3
			text-align: center
			position: fixed
			left: 0
			top: 0
			z-index: 100
			img
				width: 2.6rem
				height: 0.44rem
				margin-top: 0.1rem
		.search
			margin-top: 0.8rem
			display: flex
			flex-shrink: 0
			height: 0.6rem
			input
				outline: none
				padding-left: 0.6rem
				border:1px solid #f3f3f3
				border-radius: 0.1rem
				font-size: 0.26rem
				flex-grow: 1
			button
				width: 0.6rem
				height: 0.6rem
				outline: none
				border: none
				background-color: #f3f3f3
				i
					font-size: 0.3rem
					color: #ccc
		.banner
			flex-shrink: 0
			height: 5.6rem
			margin-top: 0.3rem
			img
				width: 100%
				height: 100%
		.content
			margin-top: 0.2rem
			flex-grow: 1
			width: 100%
			padding-bottom: 1.2rem
			background-color: #eee
			.content-top
				height: 0.7rem
				text-align: center
				position: relative
				background-color: white
				margin-top: 0.2rem
				.xian
					position: absolute
					left: 50%
					top: 50%
					transform: translate(-50%, -50%)
					width: 3rem
					height: 1px
					background-color: #000000
				.content-title
					width: 1.54rem
					height: 0.4rem
					background-color: #fff
					position: absolute
					top: 50%
					left: 50%
					transform: translate(-50%,-46%)
			.swiper-container
				width: 100%
				height: 5rem
				background-color: white
				.swiper-wrapper
					height: 1rem
					.swiper-slide
						text-align: center
						height: 1.5rem
						img
							width: 2rem
							height: 3rem
						span
							display: block
							margin-bottom: 0.2rem
							text-align: center
			.check
				background-color: white
				padding-bottom: 0.2rem
				button
					display: block
					margin: 0 auto
					font-size: 0.22rem
					outline: none
					background-color: transparent
					border: 1px solid #000
					padding: 0.1rem 0.2rem
			.brand
				margin-top: 0.2rem
				background-color: white
				padding-bottom: 0.2rem
				h2
					text-align: center
					font-weight: 400
					font-size: 0.28rem
					padding:0.2rem 0
				.brand-content
					display: flex
					flex-wrap: wrap
					justify-content: space-between
					height: 5rem
					img
						width: 30%
						margin-bottom: 0.1rem
				button
					display: block
					margin: 0 auto
					font-size: 0.22rem
					outline: none
					background-color: transparent
					border: 1px solid #000
					padding: 0.1rem 0.2rem
					margin-top: 0.3rem
			.information
				height: 0.7rem
				text-align: center
				position: relative
				background-color: white
				margin-top: 0.2rem
				.xian
					position: absolute
					left: 50%
					top: 50%
					transform: translate(-50%, -50%)
					width: 3rem
					height: 1px
					background-color: #000000
				.content-title
					width: 1.54rem
					height: 0.4rem
					background-color: #fff
					position: absolute
					top: 50%
					left: 50%
					transform: translate(-50%,-46%)
			.content-btm-pics
				width: 100%
				img
					width: 100%
		.footer
			flex-shrink: 0
			width: 100%
			height: 1rem
			position: fixed
			left: 0; bottom: 0
			z-index: 100
			background-color: white
			border-top: 1px solid #000
</style>