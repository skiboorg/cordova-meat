import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

const state = () => ({
  user:{},
  loggedIn:false

})

const mutations = {
 updateUser(state,data){
    state.user = data
  },
  updateUserStatus(state,data){
    state.loggedIn = data
  }
}

const actions = {
  loginUser({dispatch},data){
    api.post('/auth/token/login/',data)
      .then(response=>{
        LocalStorage.set('auth_token',response.data.auth_token)
        api.defaults.headers.common['Authorization'] = 'Token ' + response.data.auth_token
        dispatch('getUser',true)

      })
      .catch(function (error) {
          Notify.create('Проверьте введеные данные')
      })

  },
  async getUser ({commit,dispatch},redirect){
   const response = await api.get( '/api/user/me/')
    console.log('getUser', response)
    commit('updateUser', response.data)
    commit('updateUserStatus', true)
    if (redirect){
      await this.dispatch('cart/fetchCart')
      this.$router.push('/')
    }

  },
  logoutUser({commit}){
    api.post( '/auth/token/logout/')
      .then(response=>{
        console.log('logoutUser', response)
        api.defaults.headers.common['Authorization'] = null
        LocalStorage.remove('auth_token')
        commit('updateUser', {})
        commit('updateUserStatus', false)
      })
      .catch(function (error) {
      })
  }
}

export const getters = {
  isLoggedIn: (state) => state.loggedIn,
  user: (state) => state.user,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
