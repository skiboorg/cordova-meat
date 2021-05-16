const state = () => ({
  constructor_visible:false,
  pizza_choose_visible:false,
  payment_url:false,
  payment_visible:false
})

const mutations = {
  updateConstructorVisible(state,data){
    state.constructor_visible = data
  },
  updatePizzaChooseVisible(state,data){
    state.pizza_choose_visible = data
  },
  updatePaymentVisible(state,data){
    state.payment_visible = data
  },
  updatePaymentUrl(state,data){
    state.payment_url = data
  },

}

const actions = {
  changeConstructorVisible({commit},data){
    commit('updateConstructorVisible', data)
  },
  changePizzaChooseVisible({commit},data){
    commit('updatePizzaChooseVisible', data)
  },
  changePaymentVisible({commit},data){
    commit('updatePaymentVisible', data)
  },
  changePaymentUrl({commit},data){
    commit('updatePaymentUrl', data)
  },
}

export const getters = {
  is_constructor_visible: (state) => state.constructor_visible,
  is_pizza_choose_visible: (state) => state.pizza_choose_visible,
  is_payment_visible: (state) => state.payment_visible,
  payment_url: (state) => state.payment_url
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
