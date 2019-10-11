<template>
	<div class="loading" v-show="$store.state.loading.isShow">
		<img :src="pic"/>
	</div>
</template>

<script type="text/ecmascript-6">
	import pic from './loading.png';
        export default {
                data() {
                        return {
                                pic
                        }
                }
        };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.loading
		transition: all 0.5s ease
		img
			position: fixed
			left: 40%
			top:35%
			width: 2rem
			height: 2rem
			animation: myrotate 1s linear
			translation-origin 50% 50%
	@keyframes myrotate
			from
				transform: rotate(0deg)
			to
				transform: rotate(360deg)
</style>