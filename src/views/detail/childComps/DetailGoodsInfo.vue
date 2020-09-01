<template>
	<div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
		<div class="info-desc clear-fix">
			<div class="start">
			</div>
			<div class="desc">{{detailInfo.desc}}</div>
			<div class="end"></div>
		</div>
		<div class="info-key">{{detailInfo.detailImage[0].key}}</div>
		<div class="info-list">
			<img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
			 :src="item" @load="imgLoad" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name:'DetailGoodsInfo',
		props:{
			detailInfo: {
				type:Object,
				default(){
					return {}
				}
			}
		},
		data(){
			return {
				counter:0,
				imagesLength:0
			}
		},
		methods:{
			//判断图片加载完了之后进行回调
			imgLoad(){
				if(++this.counter === this.detailInfo.detailImage[0].list.length){
					this.$emit('imageLoad')
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.desc {
		font-size: 14px;
		padding-left: 15px;
		padding-right: 15px;
		line-height: 20px;
	}
	.info-key {
		margin-left: 15px;
		margin-top: 10px;
		}
	img {
		width: 100%;
		border-bottom: 5px solid #eee ;
		
	}
</style>
