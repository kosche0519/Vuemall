// 公共混入
import BackTop from '@/components/content/backTop/BackTop.vue' 
import {POP, NEW, SELL} from "./const"
export const backTopMixin = {
	data(){
		return {
			isShowBackTop:false
		}
	},
	methods:{
		backClick(){
			// console.log('llalalalalala')
			this.$refs.scroll.scrollTo(0,0,500)
		},
		listenShowBackTop(position) {
			this.isShowBackTop = -position.y > 1000
		}
	},
	components:{
		BackTop
	}
}
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
