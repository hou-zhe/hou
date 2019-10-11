<template>
	<ul class="nav">
		<li>
			<router-link to="/home">
				<i class="iconfont icon-home"></i>
				<span>首页</span>
			</router-link>
		</li>
		<li>
			<router-link to="/category">
				<i class="iconfont icon-category"></i>
				<span>分类</span>
			</router-link>
		</li>
		<li>
			<router-link to="/brand">
				<i class="iconfont icon-pinpai"></i>
				<span>品牌</span>
			</router-link>
		</li>
		<li>
			<router-link to="/cart">
				<i class="iconfont icon-bag"></i>
				<span>购物袋</span>
			</router-link>
		</li>
		<li>
			<router-link to="/profile">
				<i class="iconfont icon-user"></i>
				<span>我</span>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
	export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	ul.nav
		height: 1rem
		display: flex
		li
			flex-grow: 1
			flex-basis: 0
			display: flex
			a
				flex-grow: 1
				display: flex
				flex-direction: column
				align-items: center
				justify-content: center
				color:#757575
				i
					font-size: 0.4rem
			a.router-link-active>i
				color:#000
				font-weight: bolder
				border-radius: 0.1rem
</style>