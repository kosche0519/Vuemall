<template>
	<nav-bar>
		<template v-slot:left>
			<div class="back" @click="backClick">
				<img src="~@/assets/img/common/back.svg" alt="">
			</div>
		</template>
		<template  v-slot:center>
			<div class="title">
				<div v-for="(item,index) in titles" 
						 class="title-item"
						 :class="{active:index === currentIndex}"
						 @click="titleClick(index)">{{item}}</div>
			</div>
		</template>
		<template v-slot:right>
				<div class="right"></div>
		</template>
	</nav-bar>
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar.vue'
	export default { 
		name: 'DetailNavBar',
		components:{
			NavBar
		},
		data(){
			return {
				titles:['商品','参数','评论','推荐'],
				currentIndex:0
			}
		},
		methods:{
			titleClick(index){
				this.currentIndex = index;
				this.$emit('titleClick',index)
				// console.log(index)
			},
			backClick(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.title {
		display:flex;
		font-size: 13px;
	}
	.title-item {
		flex: 1;
		text-align: center;
	}
	.right,.back {
		width: 60px;
	}
	.active {
		color : var(--color-high-text)
	}
	.back img {
		margin-top: 12px;
	
	}
</style>
