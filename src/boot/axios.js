import Vue from 'vue'
import axios from 'axios'
import { LocalStorage } from 'quasar'

Vue.prototype.$axios = axios
const api = axios.create({ baseURL: process.env.API })
Vue.prototype.$api = api

const token = LocalStorage.getItem('auth_token')
if (token) {
  api.defaults.headers.common['Authorization'] = 'Token ' + token
  console.log(api.defaults.headers.common)
}

export { axios, api }

