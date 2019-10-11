<template>
	<div class="alert">
		<div class="content">
			<h2><img :src="alert" align="">提 示</h2>
			<span v-text="text"></span>
			<button @click="close">确认</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import alert from './alert.png';
        export default {
                data() {
                        return { text: '',alert};
                },
	        methods: {
                        close() {
                                this.$destroy(true);
                                this.$el.parentNode.removeChild(this.$el);
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.alert
		position: fixed
		top: 0
		left: 0
		z-index: 999
		width: 100%
		height: 100%
		background-color: rgba(0,0,0,0.5)
		.content
			position: absolute
			left: 50%
			top: 50%
			transform: translate(-50%,-50%)
			background-color: #4A4A4A
			min-width: 60%
			max-width: 80%
			border-radius: 0.1rem
			h2
				height: 0.5rem
				color: white
				font-weight: 500
				padding: 0.15rem 0
				font-size: 0.3rem
				img
					width: 0.6rem
					vertical-align: middle
			span
				margin: 0.4rem 0.2rem
				text-indent: 0.3rem
				line-height: 0.5rem
				color: #999
				font-size: 0.28rem
			button
				display: block
				margin: 0.3rem auto
				margin-bottom: 0.2rem
				background-color: #0094ff
				color: white
				font-size: 0.24rem
				padding: 0.12rem 0.3rem
				border-radius: 0.1rem
</style>