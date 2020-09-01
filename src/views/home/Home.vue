<template>
	<div id="home">
		<nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
		<tab-control class="tab-control"
		:titles="['流行','新款','精选']"
		@tabclick="tabclick"
		ref="tabControl1"
		v-show="isTabFixed"></tab-control>
		<scroll class="content" 
						ref="scroll" 
						:probetype="3"
						@scroll="contentScroll" 
						:pull-up-load="true" 
						@pullingUp = "loadMore"><!-- scroll组件用于将可滚动内容进行滚动优化 -->
			<home-swiper :banners="banners"
									 @swiperImageLoad="swiperImageLoad"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-control class="tab-control"
			:titles="['流行','新款','精选']"
			@tabclick="tabclick"
			ref="tabControl2"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
	
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		
	</div>
</template>

<script>
	// 导入顶部标题组件
	import NavBar from '@/components/common/navbar/NavBar'
	// 引入轮播图的组件
	import HomeSwiper from './childComponents/HomeSwiper.vue'
	//引入圆形的分类视图（随便写的名字）组件
	import RecommendView from './childComponents/RecommendView.vue'
	// 引入推荐组件
	import FeatureView from './childComponents/FeatureView.vue'
	// 引入流行相关组件
	import TabControl from '@/components/content/tabControl/TabControl.vue' 
	// 引入商品列表组件
	import GoodsList from '@/components/content/goods/GoodList.vue'
	// 引入滚动封装组件
	import Scroll from '@/components/common/scroll/Scroll.vue'
	// 引入回到顶部组件
	import BackTop from '@/components/content/backTop/BackTop.vue'
	import { getHomeMultidata , getHomeGoods }  from '@/network/home'
	import {debounce} from '@/common/utils.js'
	export default{
		name:'Home',
		components:{
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			NavBar,
			GoodsList,
			Scroll,
			BackTop
			
		},
		data(){
			return {
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
					
				},
				currentType: 'pop',
				isShowBackTop: false,
				tabOffsetTop: 0,
				isTabFixed:false,
				saveY:0//离开之后保存坐标位置，回来之后回到这个位置
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType]
			}
		},
		created(){
			// 请求多个数据
			this.getHomeMultidata()
			// 请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
		
		},
		mounted(){
			const refresh = debounce(this.$refs.scroll.refresh,500)
			// 监听item中的图片加载完成-----使用的是事件总线
			this.$bus.$on('itemImageLoad',() => {
				refresh()
			})
			// 所有组件都一个属性$el,用于获取组件中的元素
			// console.log(this.$refs.tabControl)
			// console.log(this.$refs.tabControl.$el.offsetTop)
			// this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
			
		},
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY() 
		},
		methods:{
			/*
			这是事件监听相关的方法
			*/
	
			tabclick(index){
				// console.log(index)
				switch (index) {
					case 0 :
					this.currentType = 'pop'
					break;
					case 1 :
					this.currentType = 'new'
					break;
					case 2 :
					this.currentType = 'sell'
					break;
				}
				this.$refs.tabControl1.currentIndex = index 
				this.$refs.tabControl2.currentIndex = index 
			},
			backClick(){
				// console.log('llalalalalala')
				this.$refs.scroll.scrollTo(0,0,500)
			},
			contentScroll(position){
				// 判断返回顶部是否要显示
				this.isShowBackTop = -position.y > 1000
				// 判断
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
				
				
			},
			swiperImageLoad(){
				// console.log(this.$refs.tabControl2.$el.offsetTop)
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},
			/*
			以下是网络请求中抽出来的相关方法
			*/
			// 这里是把created生命周期中要执行的函数单独抽到methods里，这样简洁
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					// console.log(res)
					this.banners=res.data.data.banner.list;
					this.recommends=res.data.data.recommend.list;
				})
			},
			// 并且在使用这个方法的时候还可以请求三次数据
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type,page).then(res => {
					// console.log(res)
					this.goods[type].list.push(...res.data.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.finishPullUp()
					// console.log(this.goods['pop'])
				})
			}
			
			
		}
		
	}
</script>

<style scoped>
	#home {
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
/* 		position: sticky;
		top: 0;
		z-index: 9; */
		
	}
	.tab-control{
		position: relative;
		z-index: 9;
	
	}
	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}

</style>
