<template>
	<div class="page-wrapper">
		<div class="header">
			<a class="iconfont icon-back" @click="isEdit = false" v-show="isEdit"></a>
			<a class="iconfont icon-back" @click="$router.back()" v-show="!isEdit"></a>
			<h1 class="title" v-if="!isEdit">收货地址</h1>
			<h1 class="title" v-else-if="isAdd">新增地址</h1>
			<h1 class="title" v-else>编辑地址</h1>
			<button class="iconfont icon-remove btn-delete" :class="{ show: isEdit && !isAdd}" @click="removeHandler"></button>
		</div>
		<div class="content address-list" v-show="!isEdit">
			<ul>
				<li v-for="item in list" :key="item.id" @click="backOrderConfirm(item.id)">
					<p class="name" v-text="item.receiveName"></p>
					<p class="tel" v-text="item.receiveTel"></p>
					<p class="address">{{ item.receiveAddress }} {{ item.receiveAddressDetail }}</p>
					<a class="btn-default" :class="{ default: item.isDefault }"
					   v-text="item.isDefault ? '默认': '设为默认地址' "
					   @click.stop="setDefaultHandler(item)"
					></a>
					<i class="iconfont icon-edit btn-update" @click.stop="beginEdit(false,item)"></i>
				</li>
			</ul>
			<button @click="beginEdit(true)">+ 添加地址</button>
		</div>
		<div class="content address-edit" v-show="isEdit">
			<form action="">
				<ul>
					<li>
						<label for='a'>收货人姓名</label>
						<input id="a" placeholder="请输入姓名" v-model="model.receiveName"/>
					</li>
					<li>
						<label for='b'> 手机号码</label>
						<input id='b' placeholder="请输入手机号码" v-model="model.receiveTel"/>
					</li>
					<li class="region" @click="showRegions = true">
						<label>所在区域</label>
						<input class="receive-region"  v-model="model.receiveAddress"/>
						<i class="iconfont icon-arrow-down"></i>
					</li>
					<li>
						<label for='d'>街道地址</label>
						<input  id='d' placeholder="请输入街道地址"  v-model="model.receiveAddressDetail"/>
					</li>
				</ul>
			</form>
			<button @click="saveHandler">保存并使用</button>
		</div>
		<StPopup :is-show="showRegions" @close="showRegions = false">
			<StRegion :work="showRegions" @ok="result => { model.receiveAddress = result; showRegions=false;}" ></StRegion>
		</StPopup>
	</div>
</template>

<script type="text/ecmascript-6">
        import { createNamespacedHelpers } from 'vuex';
        import StRegion from '../../components/StRegion';
        import StPopup from '../../components/StPopup';

        let { mapActions,mapState }= createNamespacedHelpers('address');

        export default {
                components:{ StRegion,StPopup },
                data() {
                        return {
                                isEdit: false,
                                isAdd: true,            //标识当前处于编辑状态的新增还是修改
                                //model映射当前正处于编辑状态的地址信息
                                showRegions: false,
                                model: { id: 0,receiveName: '',receiveTel: '', receiveAddress: '', receiveAddressDetail: '',isDefault: 0 },
                        };
                },
                computed: mapState(['list']),
                methods: {
                        ...mapActions(['init','setDefault','remove','add','update']),
                        setDefaultHandler(item) {
                                if(item.isDefault) return;
                                this.setDefault(item.id);
                        },
                        removeHandler(){
                                if(this.list.length > 1 && this.model.isDefault) {
                                        this.$alert('请取消当前设置的默认地址行为，再进行删除...');
                                        return;
                                }
                                this.$confirm('确认删除当前地址吗？')
                                        .then(() => this.remove(this.model.id))
                                        .then(() =>{
                                                this.isEdit = false;
                                                this.$alert('地址删除成功..');
                                        });
                        },
                        saveHandler () {                                //修改地址
                                if(this.isAdd) {                        //新增保存
                                        this.add(this.model).then(() => this.isEdit = false);
                                }else{                          //修改保存
                                        this.update(this.model).then(() =>this.isEdit = false);
                                }
                        },
                        beginEdit(isAdd,model = {}) {
                                if(isAdd)
                                        this.model = { id: 0,receiveName: '',receiveTel: '', receiveAddress: '', receiveAddressDetail: '',isDefault: 0 };
                                else
                                        this.model = Object.assign({},model);
                                this.isEdit = true;
                                this.isAdd = isAdd;
                        },
                        backOrderConfirm(addressId) {
                                if(this.$route.query.referer) this.$router.replace({ path: '/orderconfirm', query: { addressId } });
                        }
                },
                created() {
                        this.init();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction column
		width: 100%
		height: 100%

		.header
			display: flex
			height: 0.9rem
			border-bottom: 0.04rem solid #b0b0b0
			background-color: white
			&>*
				line-height: 0.9rem
			a
				display: block
				width: 0.9rem
				height: 100%
				line-height: 0.9rem
				font-size: 0.3rem
				text-align: center
				background-color: white
			h1.title
				flex-grow: 1
				text-align center
				font-weight normal
				font-size 0.32rem
				color: #333
			button.btn-delete
				outline: none;
				border: none;
				width: 0.9rem
				visibility: hidden
				background-color: transparent
				font-size 0.36rem
				&.show
					visibility visible
		.content
			flex-grow: 1
			width: 100%
			display: flex
			box-sizing: border-box;
			flex-direction: column;
			background-color: rgb(246,246,246)
			button
				flex-shrink 0
				margin: 0.3rem;
				border: 1px solid rgb(132,95,63)
				color: rgb(132,95,63)
				border-radius: 0.08rem
				height: 0.88rem
				line-height: 0.88rem
				background-color: #fff
				font-size 0.34rem
			&.address-list
				ul
					flex-grow: 1
					li
						border-bottom: 1px solid #b0b0b0;
						margin-bottom: 0.3rem;
						padding: 0.2rem 0.2rem;
						position: relative
						p
							color: #666
							line-height 0.4rem
						a.btn-default
							display: inline-block
							border: 1px solid transparent
							padding: 0.04rem 0.2rem
							margin-top 0.1rem
							color: #0094ff
							text-decoration underline
							&.default
								border-color #bf1111
								text-decoration none
								color: #bf1111
								border-radius 0.1rem
						i.btn-update
							position: absolute
							right: 0.3rem
							top: 50%
							transform translateY(-50%)
							font-size: 0.34rem
			&.address-edit
				display: flex
				flex-direction: column
				form
					width: 100%
					background-color: #fff
					flex-grow: 1
					ul
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
							&.region>i
								font-size: 0.38rem
								color: #b0b0b0
</style>