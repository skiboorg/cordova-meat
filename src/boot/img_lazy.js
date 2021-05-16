import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

// or with options
// const loadimage = require('./assets/loading.gif')
// const errorimage = require('./assets/error.gif')

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   //error: errorimage,
//   //loading: loadimage,
//   attempt: 1
// })
