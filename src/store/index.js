import Vue from 'vue'
import Vuex from 'vuex'

import products from './products-store'
import city from './city-store'
import cart from './cart-store'
import componentState from './component-state-store'
import auth from './auth'
Vue.use(Vuex)
let store = null //added
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      products,
      city,
      cart,
      componentState,
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })
  store = Store   // added
  return Store
}
