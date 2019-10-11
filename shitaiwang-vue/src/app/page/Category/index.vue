<!--在template区域进行“声明式”-->
<!--组件template区域可以无条件访问组件data中的和computed中的数据-->
<template>
	<div class="page-wrapper">
		<div class="header">
			<a class="iconfont icon-back" @click="$router.back();"></a>
			<h2>分类</h2>
			<span class="iconfont icon-search"></span>
		</div>
		<div class="content">
			<div class="left">
				<ul>
					<!--事件绑定的值一定要是-->
					<li v-for="item in mainList"
					    :key="item.id"
					    :class="{active: activeId === item.id }"
					    v-on:click="toggleId(item.id)">
						<span v-text="item.name"></span>
					</li>
				</ul>
			</div>
			<div class="right">
				<div class="right-wrapper">
					<img :src="avatar" alt="">
					<ul v-if="subList.length>0">
						<li v-for="item in subList" :key="item.id">
							<router-link :to="`/list/${ activeId }/${ item.id }`">
								<img :src="item.avatar" alt="">
								<span v-text="item.name"></span>
							</router-link>
						</li>
					</ul>
					<p v-else>暂无相关分类信息</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<StNav></StNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import {createNamespacedHelpers} from 'vuex';
        import StNav from '../../components/StNav';

        let{ mapState,mapActions,mapGetters } = createNamespacedHelpers('category');
        export default {
                components: {StNav},
                computed: {
	                ...mapState(['list','activeId']),
	                ...mapGetters(['subList']),
                        mainList: function(){
                                return this.list.filter(item => item.fid === 0);
                        },
                        avatar:function() {
                                return this.activeId === 0 ? '' : this.list.find(item => item.id ===this.activeId).avatar;
                        }
                },
                methods: mapActions(['init','toggleId']),
                created: function() {
                        this.init().then(data =>this.toggleId(data[0].id)); }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
		.header
			flex-shrink: 0
			height: 0.7rem
			display: flex
			justify-content: space-between
			line-height 0.7rem
			&>*
				font-size: 0.34rem
			a
				width: 0.8rem
				text-align: center
			h2
				font-weight: normal
			span
				width: 0.8rem
				text-align: center
		.content
			flex-grow: 1
			border-top: 1px solid #b0b0b0
			border-bottom:  1px solid  #b0b0b0
			display: flex
			overflow:hidden
			.left
				width: 1.5rem
				flex-shrink: 0
				overflow: auto
				ul
					li
						padding: 0.26rem 0
						span
							display: block
							height: 0.48rem
							line-height: 0.48rem
							text-align: center
							color: #333333
							border-left: 3px solid transparent
						&.active>span
							color: #845f3f
							border-left-color: #845f3f
			.right
				flex-grow: 1
				border-left: 1px solid #b0b0b0
				padding: 0.3rem
				overflow: auto
				.right-wrapper
					overflow:hidden;
					img
						width:100%;
					ul
						margin-right: -0.6rem;
						li
							float: left;
							box-sizing:border-box;
							padding-right: 0.6rem;
							margin-bottom: 0.4rem;
							width:33.33333%;
							a
								display:flex;
								flex-direction: column;
								width:100%;
								img
									width:100%;
								span
									text-align: center;

		.footer
			flex-shrink: 0
			height: 1rem
			margin-top 0.1rem
</style>