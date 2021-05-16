import { Cookies } from 'quasar'
import { api } from 'boot/axios'

const state = () => ({
  categories:[],
  items:[],
  recommended_items:[],
  recommended_items_for_meat:[],
  souses:[],
  openedPizza:0,
  openedMeat:0,
  currentPizza:null
})

const mutations = {
  updateCategories(state,data){
    state.categories = data
  },
  updateSouses(state,data){
    state.souses = data
  },
  updateItems(state,data){
    state.items = data
  },
  updateRecommendedItems(state,data){
    state.recommended_items = data
  },
  updateRecommendedItemsForMeat(state,data){
    state.recommended_items_for_meat = data
  },
  updateOpenedPizza(state,data){
    state.openedPizza = data
  },
  updateOpenedMeat(state,data){
    state.openedMeat = data
  }
}

const actions = {

  async fetchItems({state,commit,dispatch,}){
    let city_id = Cookies.get('city_id')

    if(state.items.length===0){
      console.log('fetchItems')
      await this.dispatch('city/fetchCity')
      city_id = Cookies.get('city_id')

      const response_souses = await api.get(`/api/items/get_souses_by_city?city_id=${city_id}`)
      commit('updateSouses', response_souses.data)
      //const response_items = await this._vm.$api.get(`/api/items/get_items_by_city?city_id=${city_id}`)
      const response_categories = await api.get(`/api/items/get_categories?city_id=${city_id}`)
      const response_recommended = await api.get(`/api/items/get_recommended_items?city_id=${city_id}`)
      const response_recommended_for_meat = await api.get(`/api/items/get_recommended_items_for_meat?city_id=${city_id}`)

      // commit('updateItems', response_items.data)
      commit('updateRecommendedItems', response_recommended.data)
      commit('updateRecommendedItemsForMeat', response_recommended_for_meat.data)
      commit('updateCategories', response_categories.data)
    }

  },
  changeOpenedPizza({commit,state},data){
    commit('updateOpenedPizza',data)
  },
  async fetchPizza({state},data){
    const response = await api.get(`/api/items/get_item_by_id/${data}`)
    console.log(response.data)
  },


}

const getters = {
  categories: (state) => state.categories,
  souses: (state) => state.souses,
  items: (state) => state.items,

  //getMeatRecommendedItems: (state) => state.items.filter(x => x.is_for_meat),
  recommended_items: (state) => state.recommended_items,
  recommended_items_for_meat: (state) => state.recommended_items_for_meat,
  openedPizza: (state) => state.openedPizza,
  currentPizza: (state) => state.currentPizza,
  getOpenedMeat: (state) => state.openedMeat,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
