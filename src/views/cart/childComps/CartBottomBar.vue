<template>
	<div class="cart-bottom-bar">
		<div class="check-content">
			<check-button class="check-button"
			 :is-checked="isSelectAll"
			 @click.native="checkClick"></check-button>
			<span>全选</span>
		</div>
		<div class="total-price">
			合计{{totalPrice}}
		</div>
		<div class="settlement">
			去结算({{checkLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from '@/components/content/checkButton/CheckButton.vue'
	export default {
		name:'CartBottomBar',
		components:{
			CheckButton
		},
		computed:{
			totalPrice(){
				return '￥'+ this.$store.state.cartList.filter(item => {
					return item.checked//过滤出被选中的值
				}).reduce((preValue,item) => {
					return preValue + item.price * item.count
				},0).toFixed(2)
			},
			checkLength(){
				return this.$store.state.cartList.filter(item => {
					return item.checked
				}).length
			},
			isSelectAll(){
				if(this.$store.state.cartList.length === 0){
					return false
				}else{
					return this.$store.state.cartList.every(item => item.checked === true)
				}
				
			}
		},
		methods:{
			checkClick(){
				if(this.isSelectAll) {
					this.$store.state.cartList.forEach(item => item.checked = false)
				}else {
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.cart-bottom-bar {
		height: 40px;
		position: relative;
		background-color: #eee;
		color: #000000;
		line-height: 40px;
		display: flex;
	}
	.check-content {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}
	.check-button {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}
	.total-price {
		margin-left: 30px;
		width: 120px;
	}
	.settlement {
		background-color: orangered;
		width: 90px;
		text-align: center;
		position: absolute;
		right: 0;
	}
</style>
