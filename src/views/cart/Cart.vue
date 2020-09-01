<template>
	<div class="cart">
		<nav-bar class="cart-bar">
			<template  v-slot:center>购物车({{cartLength}})</template>
		</nav-bar>
		<scroll  class="content" ref="scroll">
			<cart-list></cart-list>
		</scroll>
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar.vue'//引入导航栏组件
	import CartList from './childComps/CartList.vue'//引入商品列表组件
	import Scroll from '@/components/common/scroll/Scroll.vue'//引入滚动组件
	import CartBottomBar from './childComps/CartBottomBar.vue'//引入底部结算栏
	export default {
		name:'Cart',
		components:{
			NavBar,
			CartList,
			Scroll,
			CartBottomBar
		},
		computed:{
			cartLength() {
				return this.$store.state.cartList.length
			}
		},
		activated() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped="scoped">
	.cart {
		height: 100vh;
	}
	.cart-bar {
		background-color: var(--color-tint);
		color: #fff;
		
	}
	.content {
		height: calc(100vh - 44px - 49px - 40px);
		overflow: hidden;
	}
</style>
