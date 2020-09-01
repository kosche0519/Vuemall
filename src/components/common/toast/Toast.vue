<template>
	<div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
	export default {
		name:'Toast',
		data(){
			return {
				message:'',
				isShow:false
			}
		},
		methods:{
			show(message='Toast',duration=2000){
				this.isShow = true;
				this.message = message
				setTimeout(() => {
					this.isShow = false;
					this.message = ''
				},duration)
			}
		}
		
	}
</script>

<style scoped="scoped">
	.toast {
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(0,0,0,.8);
		color: #fff;
		z-index: 999;
		padding: 8px 10px;
		border-radius: 10px;
	}
</style>
