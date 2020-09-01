import {request} from './request.js';

export function getDetail(iid){
	return request({
		url:'/detail',
		params: {
			iid
		}
	})
}
// 详情页的最下面的更多推荐
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
// 这里是将详情页中的一些存储位置不同的数据整合到一个对象中方便进行调用
export class Goods {
	constructor(itemInfo,columns,services) {
	    this.title = itemInfo.title
			this.desc = itemInfo.desc
			this.newPrice = itemInfo.price
			this.oldPrice = itemInfo.oldPrice
			this.discount = itemInfo.discountDesc
			this.columns = columns
			this.services = services
			this.realPrice = itemInfo.lowNowPrice
			
		
	}
}

export class Shop {
	constructor(shopInfo) {
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans;
		this.sells = shopInfo.cSells;
		this.score = shopInfo.score;
		this.goodCount = shopInfo.cGoods
	}
}
export class GoodsParam {
	constructor(info,rule) {
	    // images可能没有值
			this.image = info.images ? info.images[0] : '';
			this.infos = info.set;
			this.sizes = rule.tables; 
	}
}