<template>
  <q-dialog full-height
    v-model="is_visible"
    full-width
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"

  >
<!-- :src="payment_url" @before-show="getPizza" src="http://localhost:8000/api/order/pay_success?source=mobile&orderId=8e33a296-667f-7c93-999b-756c5e480276&lang=ru"-->
    <q-card class="column full-height" style="width: 300px">

      <iframe :src="payment_url"
              class="payment-frame"  allowfullscreen>

      </iframe>
      <div class="q-pa-sm   absolute-right z-max">
        <q-btn @click="close" color="primary" icon="close" round />
      </div>

    </q-card>

  </q-dialog>
</template>

<script>


import {  mapGetters, mapActions} from "vuex";

export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapActions('componentState', ['changePaymentVisible']),
    close(){
      this.is_visible=false
      this.$router.push('/')
    },

},
  computed:{
    ...mapGetters('componentState',['payment_url']),
    is_visible: {
      get(){
        return this.$store.state.componentState.payment_visible
      },
      set(val){
        return  this.changePaymentVisible(val)
      }
    }
  }
}
</script>
<style lang="sass">
.payment-frame
  width: 100%
  height: 100%
  border: none
</style>
