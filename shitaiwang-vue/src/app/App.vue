<template>
	<div class="root">
		<StLoading></StLoading>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import StLoading from './components/StLoading';
	export default {
	        components: {StLoading}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.root
		width: 100%
		height: 100%
</style>