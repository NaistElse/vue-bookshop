import Vue from 'vue' //入口文件

import VueRouter from 'vue-router' // 导入路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(sessionStorage.getItem('car') || '[]')
var user = JSON.parse(sessionStorage.getItem('user') || '{}')

var store = new Vuex.Store({
  state: {
    car: car,
    user: user
  },
  mutations: {
    getUser (state, user) {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(state.user))
    },
    loginOut (state, user) {},
    getCarlist (state, car) {
      state.car = car
      sessionStorage.setItem('car', JSON.stringify(state.car))
    },
    addCar (state, bookdetail) {
      var flag = false
      state.car.some(item => {
        if (item.book_id === bookdetail.book_id) {
          item.count += bookdetail.count
          flag = true
          return true
        }
      })

      if(!flag) {
        state.car.unshift(bookdetail)
      }


      sessionStorage.setItem('car', JSON.stringify(state.car))
    },
    updateCar (state, bookdetail) {
      state.car.some(item => {
        if (item.book_id === bookdetail.book_id) {
          item.count = parseInt(bookdetail.count)
          return true
        }
      })
      sessionStorage.setItem('car', JSON.stringify(state.car))
    },
    removeCar (state, id) {
      state.car.some( (item, i) => {
        if (item.book_id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      sessionStorage.setItem('car', JSON.stringify(state.car))
    },
    updateBookSelected (state, bookdetail) {
      state.car.some(item => {
        if (item.book_id === bookdetail.book_id) {
          item.select = bookdetail.select
        }
      })
      sessionStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters: {
    getAllCount (state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getBookCount (state) {
      var o ={}
      state.car.forEach(item => {
        o[item.book_id] = item.count
      })
      return o
    },
    getBookSelect (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.book_id] = item.select
      })
      return o
    },
    getBookCountAndAmount (state) {
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.select) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }

})

//  导入 vue-resource
import VueResource from 'vue-resource'
//  安装 vue-resource
Vue.use(VueResource)
Vue.http.options.root = 'http://192.168.123.49:4321'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'



// import mui from "./lib/mui/js/mui.min.js"
// Vue.prototype.mui = mui

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', (dataStr, pattern = "YYYY-MM-DD") => {
  return moment(dataStr).format(pattern)
})

// 导入全部的 mint-ui 组件
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)



import app from './App.vue'

import router from './router.js'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})
