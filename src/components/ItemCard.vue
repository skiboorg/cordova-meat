<template>
<div class="">
   <q-card class="q-mb-sm q-mx-sm" flat >
    <q-card-section :horizontal="$q.screen.lt.sm" class="q-mb-sm " style="position: relative">
<!--      <img  :src="item.image" class="col-5 no-border-radius" style="object-fit: contain;position: relative;z-index: 0">-->
<!--      :contain="item.is_pizza"-->
<!--        :cover="!item.is_pizza"-->

      <q-img
       contain
       no-default-spinner
        class="col-5 no-border-radius"
        :src="item.image"/>

      <q-card-section class="q-px-sm q-py-none col-7">
        <p style="line-height: 20px" class="text-subtitle1 text-bold q-ma-none">{{item.name}}</p>
        <p class="text-caption text-grey q-mb-sm ingridient-items  " :class="{'ingridient-items-w-m-h':$q.screen.gt.sm}">
          {{item.base_ingridients}}

        </p>
       <div class="row justify-between items-center">
          <p v-if="!item.is_pizza && item.weight>0 " class="col-lg-6 col-md-6 col-sm-6 col-xs-6   text-bold no-margin">Вес {{item.weight}} г</p>
          <p v-else class="text-bold no-margin col-lg-6 col-md-6 col-sm-6 col-xs-6 "></p>

          <div v-if="!item.is_pizza" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 units-add flex justify-between items-center  q-mb-sm ">
            <q-btn @click="minusUnit" outline round size="xs" color="primary"  icon="remove" />
            <p style="padding: 8px 0px" class="item-card__unit q-ma-none bg-grey-1">{{total_units}} {{unit_name}}</p>
            <q-btn @click="plusUnit" outline round size="xs" color="primary" icon="add" />
          </div>

        </div>

        <div class="row justify-between items-center">
          <div class="">
            <p class="no-margin"><span style="text-decoration: line-through;color: #7A7878; font-weight: normal" v-if="item.prices.find(x => x.city === this.$q.cookies.get('city_id')).old_price>0">{{item.prices.find(x => x.city === this.$q.cookies.get('city_id')).old_price}}р <br></span></p>
           <p v-if="item.is_pizza" class="text-caption item-card__price col-lg-4 col-md-4 col-sm-4 col-xs-4 text-bold no-margin ">от {{item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price}} р</p>
           <p v-else class="text-caption item-card__price col-lg-3 col-md-3 col-sm-3 col-xs-3 text-bold no-margin ">{{item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price}} р</p>

          </div>
       <q-btn  v-if="item.is_pizza"
               color="primary"
               class="in-cart-btn col-lg-8 col-md-8 col-sm-8 col-xs-8"
               @click="openPizza(item.id)"

               label="В корзину" />
<!--           :label="`от ${item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price} р` " -->
        <q-btn v-else

               class="in-cart-btn col-lg-9 col-md-9 col-sm-9 col-xs-9"
               :loading="is_loading"
               @click="addToCart(item)"
               :size="$q.screen.lt.sm ? 'sm' : 'md'"
               :class="$q.screen.lt.sm ? 'text-h6 text-bold ' : ''"
               color="primary"
               :label="`В корзину ${item.is_meat ?
                item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price * units
                :
                item.prices.find(x => x.city === this.$q.cookies.get('city_id')).price * units} р` " >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />

          </template>
        </q-btn>
        </div>
      </q-card-section>
    </q-card-section>

  </q-card>
  <q-separator spaced="md"/>
</div>




</template>

<script>
import { mapActions } from 'vuex'
export default {
  props:['item'],
  data () {
    return {
      base_price:0,
      min_unit:this.item.min_unit,
      unit_name:this.item.unit_name,
      units:1,
      is_loading:false
    };
  },
  methods:{
    ...mapActions('cart',['fetchCart']),
    ...mapActions('componentState',['changePizzaChooseVisible']),
    ...mapActions('products',['changeOpenedPizza']),
    plusUnit (){
      this.units += 1
    },
    minusUnit (){
      this.units > 1 ? this.units -= 1 : this.units = 1
    },
    openPizza(id){
      this.changeOpenedPizza(id)
      this.changePizzaChooseVisible(true)
    },
    async addToCart (item) {
      this.is_loading = true
      await this.$api.post(`/api/cart/add_to_cart`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item:item,
          selected_size:0,
          weight:0,
          units:this.units,
          city_id:this.$q.cookies.get('city_id'),
          is_meat: item.is_meat
        })
      await this.fetchCart()
      this.$q.notify({
        position:'top',
        message: 'Добавлено в корзину',
        caption: item.name,
        color: 'secondary'
      })
      this.is_loading = false
    },
  },
  computed:{
    total_units(){
      return this.min_unit * this.units
    }
  }
}
</script>
<style lang="sass">
.item-image
  height: 100px
  width: 100px
  background-size: contain !important

.in-cart-btn
  min-width: 120px
.ingredient
  &::after
    content: ','
    margin-right: 3px
  &:last-child
    &::after
      content: none
      margin-right: 0
.units-add
  max-width: 115px
</style>
