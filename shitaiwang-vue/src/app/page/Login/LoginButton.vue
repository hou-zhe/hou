<template>
	<button @click="click">{{ value }}</button>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        value: {
                                type: String,
	                        default: '确认'
                        },
	                click: Function
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	button
		display: block
		width: 100%
		height: 0.7rem
		border: 1px solid #747372
		outline: none
		color: #bbbaba
		background-color: transparent
		font-size: 0.28rem
		margin: 0.5rem 0
</style>