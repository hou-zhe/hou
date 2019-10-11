<template>
	<div class="st-input">
		<input :type="type" :placeholder="placeholder" @input="e=>$emit('change',e.target.value)">
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        type: {
                                type: String,
                                default: 'text'
                        },
	                placeholder: {
                                type: String,
		                default: '请输入...'
	                }

                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.st-input
		height: 1rem
		display: flex
		align-items: center
		border-bottom: 1px solid #d3d3d3
		input
			outline: none
			border: none
			font-size: 0.28rem
			text-indent: 0.3rem
			background-color: transparent
			color: #fff
			&::-webkit-input-placeholder
				color: rgb(153,153,153)
</style>