import VueRouter from 'vue-router'

// 导入路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import UserContainer from './components/tabbar/UserContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import CategoryContainer from './components/tabbar/CategoryContainer.vue'
import Bookdetail from './components/book/bookdetail.vue'
import UserLogin from './components/login-reg/login.vue'
import UserReg from './components/login-reg/register.vue'



//  创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: HomeContainer },
    { path: '/category', component: CategoryContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/user', component: UserContainer },
    { path: '/home/bookdetail/:id', component: Bookdetail, name: 'bookdetail' },
    { path: '/login', component: UserLogin },
    { path: '/register', component: UserReg }
  ],
  linkActiveClass: 'mui-active'
})

export default router
