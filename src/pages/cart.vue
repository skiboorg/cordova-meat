<template>

  <q-page v-if="cart_items_count>0" class="q-pa-sm q-mb-lg">
      <q-card flat v-for="constructor in items_in_cart.pizza_constructors"
              :key="constructor.id">
        <q-card-section horizontal class="q-mb-sm">
          <q-img
            ratio="16/9"
            style="height: 90px"
            contain
            class="col-2 no-border-radius"
            :src="constructor.items[0].image"
          /> <q-img
          ratio="16/9"
          style="height: 90px"
          contain
          class="col-2 no-border-radius"
          :src="constructor.items[1].image"
        />
          <q-card-section class=" col-6 q-py-none q-pl-sm q-pr-none" >
            <p class="no-margin text-caption text-bold">Пицца из половинок</p>
            <p class="no-margin text-caption">{{constructor.items[0].name}} + {{constructor.items[1].name}} {{constructor.quantity}} шт </p>


            <div class="units-add flex justify-between items-center   ">
              <q-btn
                @click="changeQuantity('remove_constructor_quantity',constructor.code)"
                outline
                round
                size="xs"
                color="primary"
                icon="remove" />
              <p class="q-ma-none bg-grey-1 q-pa-sm">1 шт</p>
              <q-btn
                @click="changeQuantity('add_constructor_quantity',constructor.code)"
                outline
                round
                size="xs"
                color="primary"
                icon="add" />
            </div>

          </q-card-section>
          <q-card-section class="no-padding col-2 flex column justify-between items-center" >
            <q-icon @click="changeQuantity('delete_cart_constructor',constructor.code)"
                    class="inline-block text-grey-6"
                    size="md"
                    name="delete_outline"/>
            <div class="">
              <p v-if="$user.loggedIn" class="no-margin text-caption ">+{{constructor.bonuses}} бал.</p>
              <p class="no-margin text-caption text-bold">{{constructor.price}} р</p>
            </div>

          </q-card-section>
        </q-card-section>
        <q-separator class="q-mb-sm"/>
      </q-card>
      <q-card flat v-for="item in items_in_cart.items"
              :key="item.id">
        <q-card-section horizontal class="q-mb-sm">
          <q-img
            ratio="16/9"
            contain
            style="height: 90px"
            class="col-4 no-border-radius"
            :src="item.item.image"
          />
          <q-card-section class=" col-6 q-py-none q-pl-sm q-pr-none" >
            <p class="no-margin text-caption text-bold">{{item.item.name}}</p>

            <p v-if="item.selected_size > 0" class="no-margin text-caption">
              {{item.quantity * item.item.min_unit}} {{item.item.unit_name}} {{item.selected_size===22 ? '28' : '33'}} см
            </p>
            <p v-else class="no-margin text-caption">{{item.quantity * item.item.min_unit}} {{item.item.unit_name}}</p>

            <div class="units-add flex justify-between items-center   ">
              <q-btn @click="changeQuantity('remove_item_quantity',item.code)"
                     outline round size="xs"
                     color="primary"
                     icon="remove" />
              <p class="q-ma-none bg-grey-1 q-pa-sm">{{item.item.min_unit}} {{item.item.unit_name}}</p>
              <q-btn @click="changeQuantity('add_item_quantity',item.code)"
                     outline round size="xs"
                     color="primary"
                     icon="add" />
            </div>

          </q-card-section>
          <q-card-section class="no-padding col-2 flex column justify-between items-center" >
            <q-icon @click="changeQuantity('delete_item',item.code)" class="inline-block text-grey-6" size="md" name="delete_outline"/>
            <div class="">
              <p v-if="$user.loggedIn" class="no-margin text-caption ">+{{item.bonuses}} бал.</p>
              <p class="no-margin text-caption text-bold">{{item.price}} р</p>
            </div>

          </q-card-section>
        </q-card-section>
        <q-separator class="q-mb-sm"/>
      </q-card>
       <q-card flat v-for="souce in items_in_cart.souces"
              :key="souce.id">
        <q-card-section horizontal class="q-mb-sm">
          <q-img
            ratio="16/9"
            style="height: 90px"
            contain
            class="col-4 no-border-radius"
            :src="souce.item.image"
          />
          <q-card-section class=" col-6 q-py-none q-pl-sm q-pr-none" >
            <p class="no-margin text-caption text-bold">{{souce.item.name}}</p>

            <p class="no-margin text-caption">{{souce.quantity}} шт</p>

            <div class="units-add flex justify-between items-center   ">
              <q-btn @click="changeQuantity('remove_souse_quantity',souce.code)"
                     outline round size="xs"
                     color="primary"
                     icon="remove" />
              <p class="q-ma-none bg-grey-1 q-pa-sm">1 шт</p>
              <q-btn @click="changeQuantity('add_souse_quantity',souce.code)"
                     outline round size="xs"
                     color="primary"
                     icon="add" />
            </div>

          </q-card-section>
          <q-card-section class="no-padding col-2 flex column justify-between items-center" >
            <q-icon @click="changeQuantity('delete_cart_souse',souce.code)" class="inline-block text-grey-6" size="md" name="delete_outline"/>
            <div class="">
              <p v-if="$user.loggedIn" class="no-margin text-caption ">+{{souce.bonuses}} бал.</p>
              <p class="no-margin text-caption text-bold">{{souce.price}} р</p>
            </div>

          </q-card-section>
        </q-card-section>
        <q-separator class="q-mb-sm"/>
      </q-card>
    <div v-if="is_meat_in_cart>0" class="">
       <p class="text-h6">Рекомендуем к шашлыку</p>

        <flicking
    :options="{ gap: 10, moveType: 'freeScroll' }"
    :tag="'div'"
    :viewportTag="'div'"
    :cameraTag="'div'"
    style="height: 100px"
    @need-panel="e => {
      // ADD PANELS
    }"
    @move-end="e => {
      // HANDLE INDEX CHANGE
    }"
  >
      <q-card class="slider-card q-px-sm"   @click="addToCart(item)" v-for="item in recommended_items_for_meat" :key="item.id">
      <q-card-section horizontal>
        <q-img
          contain
          class="col-5 no-border-radius"
          :src="item.image"
        />
        <q-card-section class="col-7 q-px-none q-py-sm q-ml-sm">
         <p class="no-margin text-bold text-caption">{{item.name}}</p>
          <p  class="no-margin text-caption">{{item.prices.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
        </q-card-section>


      </q-card-section>
    </q-card>


  </flicking>
    </div>
    <p class="text-h6">Cоусы</p>
    <flicking
    :options="{ gap: 10, moveType: 'freeScroll' }"
    :tag="'div'"
    :viewportTag="'div'"
    :cameraTag="'div'"
    style="height: 100px"
    @need-panel="e => {
      // ADD PANELS
    }"
    @move-end="e => {
      // HANDLE INDEX CHANGE
    }"
  >

      <q-card class="slider-card"

              @click="addSouseToCart(souse)"
          v-for="souse in souses" :key="souse.id"
      >
      <q-card-section horizontal>
        <q-img
          contain
          class="col-5 no-border-radius"
          :src="souse.image"
        />
        <q-card-section class="col-7">
         <p class="no-margin text-caption text-bold">{{souse.name}}</p>
          <p  class="no-margin text-caption">{{souse.prices.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
        </q-card-section>


      </q-card-section>
    </q-card>


  </flicking>
    <p class="text-h6">Рекомендуем к заказу</p>
      <flicking
        class="q-mb-none"
    :options="{ gap: 10, moveType: 'freeScroll' }"
    :tag="'div'"
    :viewportTag="'div'"
    :cameraTag="'div'"
    style="height: 100px"
    @need-panel="e => {
      // ADD PANELS
    }"
    @move-end="e => {
      // HANDLE INDEX CHANGE
    }"
  >
      <q-card class="slider-card"  @click="addToCart(item)" v-for="item in recommended_items" :key="item.id">
      <q-card-section horizontal >
        <q-img


          class="col-5 no-border-radius"
          :src="item.image"
        />
        <q-card-section class="col-7  q-py-sm ">
         <p class="no-margin text-caption text-bold">{{item.name}}</p>
          <p  class="no-margin text-caption">{{item.prices.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
        </q-card-section>


      </q-card-section>
    </q-card>


  </flicking>


    <div v-if="$user.loggedIn" class="q-mb-none">
      <p  class="q-mb-none">Баллов будет начислено: {{items_in_cart.total_bonuses}} </p>

 <q-checkbox size="sm" class="q-mb-sm" left-label  v-model="with_bonuses" :label="`Списать баллы (${$user.user.bonuses} баллов доступно)`" />

   <q-card-section v-if="!$user.user.promo" horizontal class="flex justify-between">
    <q-input class="full-width" outlined v-model="promoCode" label="Введите промокод" stack-label dense />
     <q-btn class="q-ml-sm" color="primary" :disable="!promoCode" @click="usePromo" outline label="Применить"></q-btn>
   </q-card-section>
    </div>


    <q-btn class="full-width text-h5 text-bold q-mt-lg" color="primary"  size="md"
            to="checkout"
           :label="`Оформить заказ на ${items_in_cart.total_price - cart_bonuses - cart_promo} р` "/>

  </q-page>
  <q-page v-else class="flex items-center justify-center column">
    <img src="~assets/empty-cart.svg" >
    <p class="text-h6">Вы сюда еще ничего не добавили</p>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      is_loading:false,
      promoCode:null,
      with_bonuses: this.cart_bonuses > 0,
    }
  },
  computed:{
    ...mapGetters('cart',['cart_items_count','items_in_cart','cart_bonuses','cart_promo','is_meat_in_cart']),
    ...mapGetters('products',['souses','recommended_items','recommended_items_for_meat']),

  },
  watch:{

    with_bonuses(val){
      if(val){
        this.addBonuses(this.$user.user.bonuses)
      }else
        this.addBonuses(0)
    }
  },
  methods:{
    ...mapActions('cart',['fetchCart','addBonuses','addPromo']),
    ...mapActions('auth',['getUser']),
    async changeQuantity (type,code){
      console.log(type,code)
      this.$q.loading.show()
      let data = {
        session_id:this.$q.cookies.get('session_id'),
        code:code
      }
      await this.$api.post(`/api/cart/${type}`,data)
      await this.fetchCart()
      this.$q.loading.hide()
    },
    async addSouseToCart (item) {
     this.$q.loading.show()
      await this.$api.post(`/api/cart/add_to_cart_souse`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item_id:item.id,
          city_id:this.$q.cookies.get('city_id')
        })
      await this.fetchCart()
      this.$q.loading.hide()
    },
    async addToCart (item) {
      this.$q.loading.show()
      await this.$api.post(`/api/cart/add_to_cart`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item:item,
          selected_size:0,
          weight:0,
          units:1,
          city_id:this.$q.cookies.get('city_id'),
          is_meat: false
        })
      await this.fetchCart()
      this.$q.loading.hide()
    },
    async usePromo (){
      this.$q.loading.show()
      const responce = await this.$api.post(`/api/user/use_promo`,
        {
          code:this.promoCode,
        })
      console.log()
      if (!responce.data.status){
        this.$q.notify({
          message: 'Промокод не найден',
          icon: 'announcement',
          color:'red'
        })

      }else {
        this.$q.notify({
          message: 'Промокод применен',
          icon: 'announcement',
          color:'positive'
        })
        await this.getUser(false)
        this.addPromo(responce.data.discount)
      }
     this.$q.loading.hide()
    },

  }
}
</script>
<style lang="sass">
.slider-card
  width: 220px
  min-height: 92px
</style>
