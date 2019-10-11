<template>
	<div>
		<LoginInput type="text" placeholder="请输入手机号/邮箱/账号" @change="value=> account =value"/>
		<LoginInput type="password" placeholder="请输入登录密码" @change="value=>pwd=value" />
		<LoginButton value="登录" :click="login" />
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginInput from './LoginInput.vue';
	import LoginButton from './LoginButton.vue';
	import API from '../../util/api.js';

        export default {
                components: { LoginInput, LoginButton },
	        data() {
                        return {
                                account: '',
	                        pwd: ''
                        }
	        },
                methods: {
                        login(e){
                                return API.user.loginByPwd(this.account, this.pwd, e.target).then(token =>{
                                        sessionStorage.setItem('token', token);
                                        this.$router.replace(this.$route.params.reference);
                                        sessionStorage.setItem('user',this.account)
                                });
                        }
                }
        }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>