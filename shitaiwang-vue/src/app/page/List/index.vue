<template>
	<div class="page-wrapper">
		<!--弹出层-->
		<StPopup :is-show="isFilter" align="top" @close="isFilter = false">
			<div class="filter-dialog">
				<div class="header">
					<span :class="{ active: orderCol==='price' }" @click="toggleOrder('price')">价格<i class="iconfont" :class="{ 'icon-sort-up': orderDir ==='ASC', 'icon-sort-down': orderDir==='DESC' }"></i></span>
					<span :class="{ active: orderCol==='sale' }" @click="toggleOrder('sale')">销量<i class="iconfont" :class="{ 'icon-sort-up': orderDir ==='ASC', 'icon-sort-down': orderDir==='DESC' }"></i></span>
					<input type="text" placeholder="请输入商品名称" v-model="name">
					<i class="iconfont icon-search" @click="search"></i>
				</div>
			</div>
		</StPopup>
		<!--固定定位的gototop和home-->
		<router-link to="/home" class="iconfont icon-home"></router-link>
		<!--<a class="iconfont icon-top" @click="toTop" v-show="showRocket"></a>-->
		<div class="header">
			<router-link to="/category" class="iconfont icon-back"></router-link>
			<a class="iconfont icon-sort" @click="isFilter = true"></a>
			<a class="iconfont icon-category" v-show="showWithListMode" @click="showWithListMode = false"></a>
			<a class="iconfont icon-list" v-show="!showWithListMode" @click="showWithListMode=true"></a>
			<h1 v-text="title"></h1>
		</div>
		<div class="sub-list">
			<ul>
				<li v-for="item in subList">
					<router-link :to="`/list/${ mId }/${ item.id }`" v-text="item.name"></router-link>
				</li>
			</ul>
		</div>
		<div class="content" ref="scroll">
			<div class="content-wrapper">
				<ul class="clearfix"  :class="{ list: showWithListMode, card: !showWithListMode }">
					<li v-for="item in productList" :key="item.id">
						<router-link :to="`/detail/${ item.id }`">
							<div class="avatar-wrapper">
								<img :src="item.avatar" alt="item.name"  class="avatar"/>
							</div>
							<div class="item-detail">
								<h3 class="ellipsis" v-text="item.name"></h3>
								<p class="ellipsis" v-text="item.remark"></p>
								<span class="price">￥{{ item.price }}</span>
								<span class="sale">{{ item.sale }}人已购买</span>
								<em class="delivery" v-text="item.delivery"></em>
							</div>
						</router-link>
					</li>
				</ul>
				<div class="info">
					<i v-if="isLoading" class="loading"></i>
					<i v-else-if="(!hasMore) && productList.length>0" class="iconfont icon-bottom"></i>
					<i v-else-if="(!hasMore) && productList.length ===0"></i>
					<i v-else class="iconfont icon-up-double"></i>
					<p v-text="tipText"></p>
				</div>
			</div>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
        import IScroll from 'iscroll/build/iscroll-probe';
        import  imagesLoaded from 'imagesloaded';
        import StPopup from '../../components/StPopup';
        import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

        export default {
                components: { StPopup },
                data: function() {
                        return {
                                isFilter: false,
                                mId: 0,
                                sId: 0,
                                count: 6,                         //每页几条商品数据
                                name: '',                         //用户输入的搜索名字（默认不筛）
                                orderCol: 'price',           //排序的列名（默认是价格）
                                orderDir: 'DESC',           //排序方向（默认降序）
                                isLoading: false,           //是否正在请求商品数据
                                hasMore: true,              //是否还有更多的商品可供加载
                                isTriggerLoadMore: false,      //标识是否触发了加载更多
	                        goToTop: false,                          //返回顶部
                                showWithListMode: false       //表示当前信息是不是以列表模式展示
                        };
                },
                computed: {
                        ...mapState('category', { categoryList: 'list' }),
                        ...mapState('product', { productList: 'list' }),
                        ...mapGetters('category', ['subList']),
                        title: function(){
                                let target = this.categoryList.find(item => item.id === this.mId);
                                return target ? target.name: '';
                        },
                        tipText() {
                                if(this.isLoading) return '加载中..';
                                if(!this.hasMore) return this.productList.length > 0 ?  '已到达底部..' : '暂无相关商品,敬请期待..';
                                if(this.isTriggerLoadMore) return '放手立即加载';
                                return '上拉加载..';
                        }
                },
                methods: {
                        ...mapActions('category', ['init', 'toggleId']),
                        ...mapActions('product', [ 'getData' ]),
                        _getAjaxParams(loadMore) {
                                return {
                                        cid: this.sId,
                                        name: this.name,
                                        start: loadMore ? this.productList.length : 0,
                                        count: this.count,
                                        orderCol: this.orderCol,
                                        orderDir: this.orderDir
                                };
                        },
                        _getProductData(loadMore = false) {
                                if(!loadMore) {
                                        this.goToTop = false;
                                        this.hasMore = true;
                                }
                                this.isLoading = true;
                                        this.getData(this._getAjaxParams(loadMore))                              //通知仓库请求商品数据
                                                .then(length => {
                                                        this.isLoading = false;
                                                        this.hasMore = length === this.count ? true : false;
                                                });
                        },
                        //创建更新滚动对象
                        _initOrRefreshScroll() {                        //创建更新滚动对象
//		                if(!this.needScrollRefresh) return;
//		                this.needScrollRefresh= false;
                                         imagesLoaded(this.$refs.scroll,() => {
                                        this.$nextTick(() =>{
                                                if(this.scroll) this.scroll.refresh();
                                                else{
                                                        this.scroll = new IScroll(this.$refs.scroll,{
                                                                click:true,
                                                                bounce:false,
                                                                deceleration: 0.003,            //滚动阻尼系数
                                                                probeType: 3
                                                        });
                                                        this.scroll.on('scroll',() =>{
                                                                if(this.hasMore && (!this.isLoading) && !this.isTriggerLoadMore){
                                                                        this.isTriggerLoadMore = this.scroll.y < 0 && this.scroll.maxScrollY ===this.scroll.y;
//                                                                        if(this.scroll.y<0&&this.scroll.maxScrollY - this.scroll.y>50) this.isTriggerLoadMore = true;
//                                                                        else this.isTriggerLoadMore = false;
                                                                }
                                                        });
                                                        this.scroll.on('scrollEnd',() => {
                                                                if(this.scroll.y ===0) this.showRocket = false;
                                                                if(this.scroll.y<0 && !this.showRocket) this.showRocket = true;
                                                                if(this.isTriggerLoadMore) {
                                                                        this.isTriggerLoadMore=false;
                                                                        this._getProductData(true);
                                                                }
                                                        })
                                                }
                                        });
                                });
                        },
	                toTop() {this.scroll.scrollTo(0,0,300);},
                        toggleOrder(orderCol) {
                                if(this.isLoading) { this.$notice('你的操作太频繁了...'); return; }
                                if(orderCol ===this.orderCol) this.orderDir =this.orderDir ==='DESC' ? 'ASC' : 'DESC';
                                else this.orderCol = orderCol;
                                this.isFilter = false;
                        },
                        search() {
                                this._getProductData();
                                this.name='';
                                this.isFilter = false;
                        }
                },
                watch: {
                        sId: function(newValue,oldValue) {this._getProductData();},
                        orderCol() { this._getProductData();},
                        orderDir() {this._getProductData();},
                        showWithListMode: function(newValue,oldValue) {
                                if(this.scroll) this.scroll.scrollTo(0,0,0);
                                this.showRocket= false;
                                this.$nextTick(()=>this._initOrRefreshScroll());
                        },
                        productList: function(newValue,oldValue) {
                                this.$nextTick(() =>this._initOrRefreshScroll());
                        }
                },
                created: function() {
                        this.init().then(() => this.toggleId(parseInt(this.$route.params.mId)));
                },
                //第一次进入组件或每次从没激活导师就会被调用
                activated: function() {
                        this.mId = parseInt(this.$route.params.mId);
                        this.sId = parseInt(this.$route.params.sId);
                },
                //路由变化时的生命周期钩子函数（路由守卫）
                beforeRouteUpdate: function(to, from, next) {
                        if(to.params.sId !== from.params.sId) { 			//自己判断变没变
                                if(this.isLoading) {
                                        this.$notice('你的操作太频繁了...')
                                        return;
                                }
                                this.sId = parseInt(to.params.sId);
                                next();
                        }
                },
                //update函数是一个可以被反复频繁触发的函数，一定要进行合理的使用
                updated: function() {      //函数调用时可以确保组件template中的dom更新完毕
                },
                destroyed: function() {if(this.scroll) this.scroll.destroy();  }                //销毁滚动对象
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.filter-dialog
		padding: 0.3rem 0.2rem 1rem
		.header
			display: flex
			align-items: center
			height: 1rem
			i.iconfont
				font-size: 0.3rem
			span
				display: flex
				flex-shrink: 0
				align-item: center
				font-size: 0.26rem
				padding: 0 0.2rem
				&.active
					color: #bf1111
				i
					margin-left: -0.06rem
			input
				height: 0.7rem
				flex-grow: 1
				margin: 0 0.2rem
				font-size: 0.3rem
				text-align: left
				text-indent: 0.2rem
				outline: none
				border: none
				border-bottom: 1px solid #000
			i.icon-search
				width: 1rem
				font-size: 0.36rem
				flex-shrink 0
	.page-wrapper
		width: 100%
		height: 100%
		background-color: #eee;
		display: flex
		flex-direction: column
		position: relative
		a.icon-home,a.icon-arrow-down
			position: fixed
			right:0.2rem
			z-index: 100
			box-sizing: border-box
			width: 0.84rem
			height: 0.84rem
			text-align: center
			line-height:0.84rem
			font-size: 0.44rem
			border-radius: 50%
			font-weight: blod
		a.icon-home
			bottom: 0.2rem
			background-color: rgba(0,0,0,0.3)
			color: #fff
		a.icon-arrow-down
			bottom:1.24rem
			border: 1px solid #b0b0b0
			background-color: rgba(255,255,255,0.7)
			color: #000
		.header
			flex-shrink: 0
			height: 0.9rem
			position: relative
			*
				height:0.9rem
				line-height: 0.9rem
				text-align: center
			h1
				font-weight: normal
				font-size: 0.34rem
			a
				position: absolute
				top: 0
				width: 0.9rem
				font-size: 0.36rem
				font-weight: blod
				color: #444
				&.icon-back
					left: 0
				&.icon-category,&.icon-list
					right: 0.9rem
				&.icon-sort
					right: 0
		.sub-list
			flex-shrink: 0
			height: 0.9rem
			ul
				display: flex
				overflow: auto
				height: 100%
				border-bottom: 1px solid #999
				li
					flex-shrink:0
					padding:0 0.3rem
					line-height: 0.9rem
					font-size: 0.27rem
					height: 100%
					a
						box-sizing: border-box
						display: block
						height: 100%
						border-bottom: 3px solid transparent
						-webkit-tap-highlight-color:transparent
						&.router-link-active
							border-bottom-color: rgb(132,95,63)
							color: rgb(132,95,63)
		.content
			flex-grow: 1
			margin-top: 0.2rem
			background-color: #fff
			border-radius: 0.2rem
			padding: 0.2rem 0.2rem 0
			overflow: hidden
			touch-action: pan-y
			.content-wrapper
				overflow-x: hidden
				padding: 0.22rem 0.22rem 0
				ul
					.avatar-wrapper
						position: relative
						background-color: rgba(0,0,0,0.02)
						border-radius: 0.1rem
						img.avatar
							position: absolute
							left: 50%
							top: 50%
							transform: translate(-50%, -50%)
							width: 70%
					.item-detail
						position: relative
						display: flex
						flex-direction: column
						overflow: hidden
						h3
							color: #333333
							font-size: 0.3rem
							font-weight: normal
							margin: 0.2rem 0 0.1rem
						p
							color: #999999
							font-size: 0.24rem
							margin: 0.1rem 0
						span.price
							display: block
							color: #860909
							font-size: 0.28rem
							margin: 0.1rem 0
							padding: 0 0.08rem
						span.sale
							position: absolute
							right: 0.08rem
							bottom: 0.1rem
							padding: 0 0.1rem
							color: #999
							background-color: rgba(0,0,0,0.05)
						em.delivery
							display: none
				ul.list
					li
						padding: 0.2rem 0
						background-color: rgba(0,0,0,0.02)
						margin-bottom: 0.3rem
						border-radius: 0.2rem
						a
							display: flex
							.avatar-wrapper
								width: 2.52rem
								height: 2.52rem
								flex-shrink: 0
								padding: 0
							.item-detail
								flex-grow: 1
								margin-left: 0.2rem
								display: flex
								flex-direction: column
								.ellipsis
									text-align: left
									margin-left: 0.2rem
								em.delivery
									display: block
									margin-top: 0.25rem
									font-style: normal
									color: #999
								span.price
									font-size 0.32rem

				ul.card
					margin-right: -0.22rem
					li
						float: left
						width: 50%
						padding-right: 0.22rem
						box-sizing: border-box
						margin-bottom: 0.22rem
						a
							display: flex
							flex-direction: column
							width: 100%
							background-color: white
							border-radius: 0.08rem
							.avatar-wrapper
								width: 100%
								height:0
								padding-top: 100%
							.item-detail
								h3
									text-align:center
								p
									text-align: center
				.info
					height: 1rem
					display: flex
					justify-content: center
					align-items: center
					color: #666
					i
						font-size: 0.24rem
						margin-right: 0.1rem
						&.loading
							width: 0.3rem
							height: 0.3rem
							background-position: center center
							background-size: 130% 130%
</style>