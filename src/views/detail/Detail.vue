<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
		<scroll class="content" ref="scroll" :probetype="3" @scroll="contentScroll" >
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" class="detail-goods-info"></detail-goods-info>
			<detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<goods-list ref="recommends" :recommends="recommends" class="goods-list"></goods-list>
		</scroll>
		<detail-bottom-bar @addToClick="addToClick"></detail-bottom-bar>
		
	</div>
</template>

<script>
	
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	// 引入better-scroll封装的组件
	import Scroll from '@/components/common/scroll/Scroll.vue'
	import GoodsList from '@/components/content/goods/GoodList.vue'
	import {debounce} from '@/common/utils.js'
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail.js'
	import {backTopMixin} from '@/common/mixin.js'
	export default {
		name:'Detail',
		data(){
			return {
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				themeTopYs:[],
				getThemeTopYs:null,
				currentIndex:0
			}
		}, 
		created() {
			this.getThemeTopYs = debounce(() => {
				this.$nextTick(() => {
				this.themeTopYs = []
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
				this.themeTopYs.push(this.$refs.recommends.$el.offsetTop-44);
				// console.log(this.themeTopYs)
				})
			},200)
		},
		mounted() {
			// 保存传进来iid
			this.iid = this.$route.params.iid
			// 根据iid请求详情数据
			getDetail(this.iid).then(res => {
				const data = res.data.result
				// console.log(data)
				// 获取顶部的轮播图中的图片
				this.topImages = data.itemInfo.topImages 
				// 获取商品信息
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				//获取店铺信息
				this.shop = new Shop(data.shopInfo)
				// 获取商品的详情数据
				this.detailInfo = data.detailInfo
				// 获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				// 获取评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
			})
			// 请求推荐数据
			getRecommend().then(res => {
				
				this.recommends = res.data.data.list
				// console.log(this.recommends)
				
			})
		
			
		},
		updated() {
			
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			GoodsList
			
		},
		methods:{
			imageLoad(){
				this.$refs.scroll.refresh()
				this.getThemeTopYs()
			},
			titleClick(index){
				// console.log(index)
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
			},
			contentScroll(position) {
				// console.log(position)
				let length = this.themeTopYs.length
				
				let positionY = -position.y
				for(let i =0; i<length;i++){
					if(this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i]&&
					positionY<this.themeTopYs[i+1])||(i === length -1 && positionY >= this.themeTopYs[i]))){
						this.currentIndex = i;
						// console.log(this.currentIndex)
						this.$refs.nav.currentIndex = this.currentIndex 
					}
				}
				
			},
			addToClick(){
				// 获取需要加入到购物车的数据
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
				product.count = 0
				product.checked = true
				//将商品添加到购物车
				// this.$store.commit('addCart',product)
				this.$store.dispatch('addCart',product).then( res => {
					this.$toast.show(res,1500)
				})
				
			}
				
		}
			
		}
		
		
	
</script>

<style scoped="scoped">
	#detail {
		position: relative;
		z-index: 19;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav-bar {
		position: relative;
		z-index: 99;
		background-color: #fff;
	}
	.content {
		height: calc(100% - 44px);
	}
	.goods-list {
		
		width: 100%;
	}
	.detail-goods-info {
		position: relative;
	}
</style>
