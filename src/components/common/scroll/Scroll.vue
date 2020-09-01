<template>
	<div class="wrapper" ref='wrapper'>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'Scroll',
		props:{
			probetype:{
				type:Number,
				default: 0
				
			},
			pullUpLoad: {
				type: Boolean,
				default:false
			}
		},
		data(){
			return {
				scroll:null
			}
		},
		mounted(){
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probetype,
				pullUpLoad: this.pullUpLoad
			})
			this.scroll.scrollTo(0,0,500)
			this.scroll.on('scroll',(position) => {
				this.$emit('scroll',position)
			})	
			this.scroll.on('pullingUp', () => {
				this.$emit('pullingUp')
			})
		},
		methods:{
			scrollTo(x,y,time=500) {
				this.scroll.scrollTo(x,y,time)
			},
			finishPullUp(){
				this.scroll.finishPullUp()
			},
			refresh(){
				// console.log('lalalalal')
				this.scroll.refresh()
			},
			getScrollY(){
				return this.scroll ? this.scroll.y :0
			}
		}
		
	}
</script>

<style>
</style>
