import { LocalStorage } from 'quasar'
import Vue from 'vue'
import {api} from "boot/axios";

const token = LocalStorage.getItem('auth_token')

export default async ({ app, router, Vue, store }) => {
  console.info('boot: init entered', store)
  store.dispatch('cart/fetchCart')
  store.dispatch('products/fetchItems')
  if (token) {
   await store.dispatch('auth/getUser')
  }
  Vue.prototype.$user = store.state.auth
  console.info('boot: init exited')
}
