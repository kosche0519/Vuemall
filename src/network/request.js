import axios from 'axios'
export function request(config){
	//创建axios的实例
	const instance = axios.create({
				baseURL:'http://152.136.185.210:8000/api/z8',
				timeout:5000
			})
			// 创建axios的拦截器
			// axios.interceptors 这个是全局的拦截器
			instance.interceptors.request.use(config =>{
				// console.log(config)
				//这时候请求就被拦截了，但是做完自己想做的操作之后，需要把请求继续发出去
				return config
			},err=>{
				
			})   //拦截请求的
			instance.interceptors.response.use(res =>{
				// console.log(res)
				return res //同理这边用完也要返回出去
				},err =>{
					console.log(err)
				})  //拦截响应的
			
			// 发送真正的网络请求
			return instance(config)
	
	}
	