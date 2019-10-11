<template>
	<div class="page-wrapper">
		<div class="header">
			<a @click="$router.back();" class="iconfont icon-back" v-if="!isEdit"></a>
			<h1 class="title" v-if="!isEdit">个人资料</h1>
			<h1 class="title" v-else>修改资料</h1>
			<button class="btn-toggle" v-if="!isEdit" v-text="isEdit ? '完成' : '编辑'" @click="isEdit = !isEdit">编辑</button>
		</div>
		<div class="content">
			<div class="formal">
				<div class="pic" v-show="!isEdit"><img :src="Img" alt=""></div>
				<ul class="normal" v-show="!isEdit">
					<li>
						<label for='e'>真实姓名：</label>
						<span id="e" v-text="list.trueName"></span>
					</li>
					<li>
						<label > 性别：</label>
						<span  v-text="list.sex"></span>
					</li>
					<li>
						<label>出生日期：</label>
						<span v-text="list.brithday"></span>
					</li>
					<li>
						<label >家庭住址：</label>
						<span  v-text="list.address"></span>
					</li>
				</ul>
			</div>
			<form action="" v-show="isEdit">
				<ul class="edit">
					<li>
						<label for='a'>真实姓名：</label>
						<input id="a" v-model="list.trueName"/>
					</li>
					<li>
						<label for='b'> 性别：</label>
						<input id='b' v-model="list.sex"/>
					</li>
					<li>
						<label>出生日期：</label>
						<input v-model="list.brithday"/>
					</li>
					<li>
						<label for='d'>家庭住址：</label>
						<input  id='d'  v-model="list.address"/>
					</li>
				</ul>
			</form>
		</div>
		<div class="footer normal"  v-show="isEdit">
			<button class="close" @click="isEdit = false">取消</button>
			<button class="confirm"  @click="saveHandler">确认</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
	import Img from './zanwu.jpg'
        export default {
                data() {
                        return{
                                Img,
                                isEdit: false,
	                        list: []
                        }
                },
	        methods:{
                        getList() {
				return API.user.getPersonalList().then(data => this.list =data);
                        },
		        saveHandler(){
                                return API.user.update(this.list).then(() =>this.isEdit = false);
		        }
	        },
	        created() {
                        this.getList();
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		height: 100%
		background-color: #eee
		display: flex
		flex-direction: column
		.header
			height: 0.8rem
			flex-shrink: 0
			display: flex
			justify-content: space-between
			line-height: 0.8rem
			text-align center
			border-bottom 1px solid #000
			a
				display: block
				width: 0.8rem
				height: 100%
				font-size 0.3rem
			h1
				text-align: center
				font-weight: normal
				font-size 0.4rem
				margin: 0 auto
			button.btn-toggle
				width: 0.8rem
				background-color: #eee
				font-size: 0.32rem
		.content
			flex-grow: 1
			overflow: overflow
			display: flex
			flex-direction: column
			background-color: white
			ul.normal
				padding: 0 0.3rem
				li
					border-bottom: 1px solid #b0b0b0
					margin-top: -1px
					height: 1rem
					display: flex
					align-items: center
					label
						font-weight: 600
						width: 2rem
						font-size: 0.32rem
					span
						color: #999
						font-size: 0.3rem
			.pic
				width: 5rem
				margin: 0 auto
				img
					width: 100%
			form
				width: 100%
				background-color: #fff
				flex-grow: 1
				ul.edit
					padding: 0 0.3rem
					li
						border-bottom: 1px solid #b0b0b0
						margin-top: -1px
						height: 1rem
						display: flex
						align-items: center
						&>*
							height: 0.95rem;
							line-height: 0.95rem
						label
							width: 1.6rem
						input
							flex-grow: 1; border: none
							font-size: 0.24rem
		.footer
			flex-shrink: 0
			height: 1rem
			display: flex
			align-items: center
			justify-content: center
			margin-top: 0.3rem
			button
				width: 50%
				height: 1rem
				background-color: white
				font-size: 0.34rem
			.confirm
				background-color: #b4282d
				color: white
</style>