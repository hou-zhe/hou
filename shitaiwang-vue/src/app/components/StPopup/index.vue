<template>
	<div class="st-popup" v-show="isShow" @click.self="$emit('close')">
		<div class="content"  :class="{ top:align =='top', bottom: align ==='bottom' }">
			<i class="iconfont" v-if="align === 'bottom'" @click="$emit('close')"></i>
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: { isShow: Boolean, align: { type: String, default: 'bottom' } }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.st-popup
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 800
		background-color: rgba(0,0,0,0.7)
		.content
			position: absolute
			left: 0
			background-color: white
			width: 100%
			&.top
				top: 0
				border-radius: 0 0 0.08rem 0.08rem
			&.bottom
				bottom: 0
				border-radius: 0.08rem 0.08rem 0 0
</style>