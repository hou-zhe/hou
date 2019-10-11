<template>
	<div class="page-wrapper">
		<p>支付成功</p>
		<button class="order" @click="$router.replace('/orderlist')">查看订单</button>
		<button class="home" @click="$router.replace({ path: '/home' })">返回首页</button>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		height: 100%
		background-color: #ddd
		position: relative
		background-image: url(zhuce.png)
		background-repeat no-repeat
		background-size: 100% 100%
		p
			font-size 0.42rem
			letter-spacing 0.1rem
			font-weight: bold
			color: red
			position: absolute
			top: 20%
			left: 50%
			transform: translate(-50%, -50%)
		button.order
			font-size 0.3rem
			color: white
			background-color: coral
			border: 1px solid #000
			padding: 0.1rem 0.4rem
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
		button.home
			font-size 0.3rem
			color: white
			background-color: coral
			border: 1px solid #000
			padding: 0.1rem 0.4rem
			position: absolute
			top: 60%
			left: 50%
			transform: translate(-50%, -50%)
</style>