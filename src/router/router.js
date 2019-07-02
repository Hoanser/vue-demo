import Vue from 'vue'
import Router from 'vue-router'
import Index from 'src/modules/index/index'
import Shop from 'src/modules/shop/shop'
import Detail from 'src/modules/shop/detail'
import Cart from 'src/modules/shop/cart'
import Order from 'src/modules/shop/order'
import Pay from 'src/modules/shop/pay'
import Community from 'src/modules/community/index'
import Publish from 'src/modules/community/publish'
import Excenter from 'src/modules/excenter/excenter'
import Showessay from 'src/modules/community/showessay'
import Product from 'src/modules/community/product'
import Parent from 'src/modules/community/parent'
import Login from 'src/modules/loginres/login'
import RegisterFast from 'src/modules/loginres/registerfast'
import Setnewpwd from 'src/modules/loginres/setnewpwd'
import Info from 'src/modules/info/index'
import Mine from 'src/modules/mine/mine'
import Myaddress from 'src/components/myaddress'
import Myorder from 'src/components/myorder'
import Myorderall from 'src/components/myorderall'
import Myorderwaitpay from 'src/components/myorderwaitpay'
import Myorderalreadypay from 'src/components/myorderalreadypay'
import Myorderchange from 'src/components/myorderchange'
import Setport from 'src/components/mysetport'
import Setmyinfo from 'src/components/mysetinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/shop',
      component: Shop
    },
    {
      path: '/shop/detail',
      component: Detail
    },
    {
      path: '/shop/cart',
      component: Cart
    },
    {
      path: '/shop/order',
      component: Order
    },
    {
      path: '/shop/pay',
      component: Pay
    },
    {
      path: '/community',
      component: Community
    },
    {
      path: '/community/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/community/product',
      component: Product
    },
    {
      path: '/community/parent',
      component: Parent
    },
    {
      path: '/community/showessay',
      name: 'Showessay',
      component: Showessay
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/registerfast',
      component: RegisterFast
    },
    {
      path: '/setnewpwd',
      name: 'Setnewpwd',
      component: Setnewpwd
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      children: [
        {
          path: '/myaddress',
          component: Myaddress
        },
        {
          path: '/myorder',
          name: 'Myorder',
          component: Myorder,
          children: [
            {
              path: 'myorderall',
              component: Myorderall
            },
            {
              path: 'myorderwaitpay',
              component: Myorderwaitpay
            },
            {
              path: 'myorderalreadypay',
              component: Myorderalreadypay
            },
            {
              path: 'myorderchange',
              component: Myorderchange
            }
          ]
        },
        {
          path: '/setport',
          component: Setport
        },
        {
          path: '/setmyinfo',
          component: Setmyinfo
        }
      ]
    },
    {
      path: '/info',
      component: Info
    },
    {
      path: '/Excenter',
      name: 'Excenter',
      component: Excenter
    }
  ]
})
