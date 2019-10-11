<template>
	<div>
		<LoginInput type="text" placeholder="请输入手机号" @change="value=> phone =value"/>
		<LoginInput type="text" placeholder="请输入验证码" @change="value=>pwd=value" />
		<LoginButtonCode value="获取验证码"></LoginButtonCode>
		<LoginButton value="手机号登录" :click="login" />
	</div>
</template>

<script type="text/ecmascript-6">
        import LoginInput from './LoginInput.vue';
        import LoginButton from './LoginButton.vue';
        import LoginButtonCode from './LoginButtonCode';
        import API from '../../util/api.js';

        export default {
                components: { LoginInput, LoginButton,LoginButtonCode },
                data() {
                        return {
                                phone: '',
                                pwd: '',
	                        code:''
                        }
                },
	        methods: {
                        login(e){
                                return API.user.loginByPhone(this.phone, this.pwd, e.target).then(token =>{
                                        sessionStorage.setItem('token', token);
                                        this.$router.replace(this.$route.params.reference);
                                });
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>