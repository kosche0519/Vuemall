import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		cartList: []
  },
  mutations: {
		addCounter(state,payLoad) {
			payLoad.count +=1
		},
		addToCart(state,payLoad) {
			payLoad.checked = true
			state.cartList.push(payLoad)
		} 
  },
  actions: {
		addCart(context,payLoad){
			return new Promise((resolve,reject) => {
				let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
				if(oldProduct) {
					context.commit('addCounter',oldProduct)
					resolve('当前商品数量加一')
				}else {
					payLoad.count = 1
					context.commit('addToCart',payLoad)
					resolve('添加了新商品')
				}
			})
		}
  },
  modules: {
  }
})
