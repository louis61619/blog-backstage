import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

// const https = require('https');

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  header:{ 'Access-Control-Allow-Origin':'*' },
  withCredentials: true,
})

instance.interceptors.request.use(config => {
  // 1.發送網路請求時，在中間位置顯示一個loading組件

  // 2.某一些請求要求用戶必須攜帶token，如果沒有攜帶直接跳轉道登入頁面

  // 3.params/data做序列化的操作
  return config
}, err => {

})

// 響應攔截
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  if(err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log("請求錯誤")
      break
      case 401:
        console.log("未授權")
      break

      default:
      break
    }
  }
  return err
})

export default instance

// axios的本質就是創建一個instance並調用request函數，大概