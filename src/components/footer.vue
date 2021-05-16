<template>
   <q-footer class="bg-grey-8 text-white">

       <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="primary"
        dense
        no-caps
        :ripple="false"
        align="justify"
        class="bg-grey-3 text-grey-5 footer-tabs">
         <q-route-tab class="footer-tab" exact name="menu" icon="menu_book" label="Меню" :to="{name:'index'}" />
        <q-route-tab class="footer-tab" to="promo" name="discount" icon="loyalty" label="Акции" />
        <q-route-tab class="footer-tab"  exact name="cart"   to="/cart">
          <q-icon class="absolute cart-icon-bg" size="md" name="shopping_cart"></q-icon>
          <p class="q-mb-none q-mt-lg">Корзина</p>
          <q-badge v-if="cart_items_count>0"  color="primary" floating> {{cart_items_count}}</q-badge>
        </q-route-tab>
        <q-route-tab v-if="!this.$user.loggedIn" class="footer-tab" to="/auth" name="profile" icon="person" label="Войти" />
        <q-route-tab v-else class="footer-tab" to="/lk" name="profile" icon="person" label="ЛК" />
        <q-route-tab class="footer-tab" to="/info"  name="info" icon="info" label="Инфо" />
      </q-tabs>


    </q-footer>


</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tab: 'menu'
    }
  },
  computed:{
    ...mapGetters('cart',['cart_items_count'])

  }
}
</script>


<style lang="sass">
.footer-tab
  padding: 0 10px
.footer-tabs
  & .q-tabs__content
    overflow: visible
  & .q-badge
    top: -23px
    right: -5px
    z-index: 20
.cart-icon-bg
  background: $grey-3
  border-radius: 50%
  border: 3px solid white
  width: 48px
  height: 48px
  top: -24px
  z-index: 10
</style>
