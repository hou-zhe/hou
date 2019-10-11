<template>
	<el-container class="root">
		<el-header>
			<h1>时态网后台管理系统 <span v-text="name"></span><span class="back" v-show="name" @click="back">退出</span></h1>
		</el-header>
		<el-container>
			<el-aside>
				<!--item与color的区别-->
				<el-menu
					:default-active="key"
					@select="handleMenuSelect"
					background-color="#545c64"
					text-color="#fff"
					active-text-item="#ffd04b">
					<el-menu-item index="password">
						<i class="el-icon-setting"></i>
						<span>修改密码</span>
					</el-menu-item>
					<el-submenu index="maneger">
						<template slot="title">
							<i class="el-icon-s-goods"></i>
							<span>商品分类</span>
						</template>
						<el-menu-item index="category">
							<i class="el-icon-menu"></i>
							<span>商品分类管理</span>
						</el-menu-item>
						<el-menu-item index="product">
							<i class="el-icon-menu"></i>
							<span>商品信息管理</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<el-tabs editable type="card" v-model="key" @tab-remove="handleTabRemove">
						<el-tab-pane
							v-for="item in tabs"
							:key="item.id"
							:name="item"
							:label="tabMap[item].label"
						>
							<component :is="tabMap[item].component"></component>
						</el-tab-pane>
					</el-tabs>
				</el-main>
				<el-footer height="40px">
					<span>&copy; 版权所有: 侯善哲</span>
					<span>tel: 189********</span>
					<span>网址: http://www.situ.1905H5.com</span>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
        var name=sessionStorage.getItem('name');
        import Password from '../Password';
        import Category from '../Category';
        import Product from '../Product';
        import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
        export default {
                components: {ElInput},
                data() {
                        return {
                                key:'',
                                name,
                                tabs: [],
                                tabMap: {
                                        password: {
                                                label: '修改密码',
                                                component: Password
                                        },
                                        category: {
                                                label: '商品分类管理',
                                                component: Category,
                                        },
                                        product: {
                                                label: '商品信息管理',
                                                component: Product
                                        }
                                }
                        }
                },
                methods: {
                        handleMenuSelect(key) {
                                if(this.tabs.indexOf(key) === -1) this.tabs.push(key);
                                this.key = key;
                        },
                        handleTabRemove(key) {
                                let i = this.tabs.indexOf(key);
                                this.tabs.splice(i,1);
                                this.key = this.tabs.length > 0 ? this.tabs[0] : '';
                        },
                        back() {
                                sessionStorage.clear();
                                this.name = '';
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
		min-width: 1200px
		.el-header
			display: flex
			align-items center
			background-color: #111
			position: relative
			h1
				font-size: 30px
				color: #fff
				letter-spacing: 0.5rem
				span
					font-size: 16px
					position: absolute
					top: 35%
					right: 5rem
					letter-spacing 0
				span.back
					right: 2.5rem
					cursor: pointer
		.el-aside
			background-color: #545c64
			.el-menu
				border: none
		.el-container
			overflow auto
		.el-footer
			background-color: #909399
			border-top: 1px solid #b0b0b0
			display: flex
			align-items: center
			span
				margin-right 50px
</style>