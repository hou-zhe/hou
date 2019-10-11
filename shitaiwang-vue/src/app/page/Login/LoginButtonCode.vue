<template>
	<button class="btn-code" @click="getCode" v-text="value===''? '获取验证码' : value "></button>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';

        export default {
                props: {
                        value: {
                                type: String,
                                default: '获取验证码'
                        },
                        click: Function
                },
                methods: {
                        getCode() {
                                return API.user.loginCode().then(data=> { this.value = data; })
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	button.btn-code
		width: 30%
		height: 0.6rem
		font-size: 0.28rem
		outline: none
		border: none
		background-color: transparent
		color: #bbbaba
		position: absolute
		bottom:1.8rem
		right: 0
</style>