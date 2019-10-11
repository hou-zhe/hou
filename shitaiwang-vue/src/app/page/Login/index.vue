<template>
	<div class="page-wrapper">
		<span class="close clearfix"><img :src="close" @click="$router.back();"></span>
		<div class="content">
			<div class="logo"><img :src="logo" alt=""></div>
			<p>探索潮流生活时态</p>
			<LoginPwd v-if="mode"></LoginPwd>
			<LoginPhone v-else></LoginPhone>
		</div>
		<div class="footer">
			<div><a href="">注册</a></div>
			<span class="change" @click="mode=!mode">切换登录方式</span>
			<div><a href="">忘记密码</a></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import LoginPhone from './LoginPhone.vue';
        import LoginPwd from './LoginPwd.vue'
        import close from './imges/close.png';
        import logo from './imges/logo-w.png'
	export default {
                components: { LoginPhone,LoginPwd },
		data() {
                        return {
                                close,
	                        logo,
	                        mode: true
                        }
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display:flex
		flex-direction column
		width: 100%
		height: 100%
		background-image: url('./imges/denglu.png')
		background-size: 100% 100%
		.close
			flex-shrink:0
			height: 0.9rem
			img
				float: right
				margin-top 0.3rem
				margin-right 0.5rem
		.content
			width: 80%
			flex-grow: 1
			position: absolute
			top: 40%
			left: 50%
			transform translate(-50%,-30%)
			.logo
				width: 2rem
				height: 0.5rem
				margin 0 auto
				img
					width: 90%
			p
				color: white
				font-size 0.3rem
				text-align center
				margin-bottom: 0.5rem
		.footer
			height: 1rem
			width: 100%
			flex-shrink 0
			position: absolute
			bottom: 0.5rem
			left: 0
			display: flex
			align-items center
			justify-content space-around
			a
				color: white
				font-size 0.26rem
			span
				color: #b0b0b0
				border-radius 0.1rem
				padding 0.05rem
</style>

