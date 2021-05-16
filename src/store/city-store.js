import { Cookies } from 'quasar'

const state = () => ({
  cities:[],
  main_city:null,
  city_info:null,
})

const mutations = {
  updateCity(state,data){
    state.cities = data
  },
  updateMainCity(state,data){
    state.main_city = data
  },

}

const actions = {
  async fetchCity({commit,state,dispatch}){
    console.log('fetchCity')
    const city_id = Cookies.get('city_id')

    const response = await this._vm.$api.get(`/api/items/get_cities`)
    console.log('response city',response.data)
    if (!city_id){
       dispatch('changeMainCity',response.data.find(x => x.is_main === true).id)
    }
    commit('updateCity',response.data)

  },
  changeMainCity({commit}, data) {
    console.log('changeMainCity')
    let city_in_cookie = Cookies.get('city_id')
    if (city_in_cookie !== data){
      Cookies.set('city_id',data)
      commit('updateMainCity', data)
      console.log('setMainCity',data)
    }
  }
}

const getters = {
  cities: (state) => state.cities,
  mainCity: (state) => state.main_city,
  currentCity: (state) => state.cities.find(x => x.id === Cookies.get('city_id'))
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


