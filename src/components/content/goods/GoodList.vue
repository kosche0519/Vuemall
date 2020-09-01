<template>
	<div class="goods">
		<goods-list-item class="goods-item" 
		v-for=" item in showGoods" :key="item.index" :goods-item="item" ></goods-list-item>
	
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	export default {
		name:'GoodsList',
		components:{
			GoodsListItem
		},
		computed:{
			showGoods() {
				return this.goods.list || this.recommends
			}
		},
		props: {
			goods: {
				type:Object,
				default(){
					return {}
				}
			},
			recommends: {
				type:Array,
				default(){
					return []
				}
			}
		} 
		
	}
</script>

<style>
	.goods {
		display: flex;
		flex-wrap: wrap; 
		justify-content: space-around;
		padding: 2px;
	}

</style>
