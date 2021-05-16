<template>

  <q-dialog full-height
    v-model="is_visible"
    full-width
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
    @before-show="getPizza"
  >

    <q-card class="column full-height" style="width: 300px">
      <q-toolbar><p class="text-h6 no-margin">{{pizza.name}}</p><q-space/>
        <q-icon @click="closeModal" size="md" name="close"></q-icon>
      </q-toolbar>


      <q-separator class="q-my-sm"/>
      <q-card-section>
         <p class="text-caption">Каллорий: {{pizza.belki}} Белки: {{pizza.belki}} Жиры: {{pizza.fat}} Углеводы: {{pizza.uglevod}}</p>
        <q-separator class="q-my-sm"/>
        <p class="no-margin">Состав:</p>
          <q-checkbox size="xs"
                      class="pizza-ingridient"
                      :class="{'no-checkbox':!ingredient.is_can_removed}"
                      v-for="(ingredient,index) in pizza.base_ingridients"
                      :key="ingredient.id"
                      left-label
                      :disable="!ingredient.is_can_removed"
                      v-model="pizza.base_ingridients[index].is_removed"
                      :true-value="false"
                      :false-value="true"
                      :label="ingredient.name" />
<q-separator class="q-my-sm"/>
<!--        <q-separator class="q-my-sm"/>-->
        <p class="q-mb-sm">Размер</p>
        <div class="flex items-center q-mb-md">
          <q-btn-toggle
  class="q-mr-sm"
      v-model="pizzaSize"
      toggle-color="primary"
      :options="[
        {label: '22 см', value: 22},
        {label: '33 см', value: 33},
      ]"
    />
          <p class="no-margin">{{weight}} г</p>

        </div>
        <q-separator class="q-my-sm"/>
        <p>Добавить ингредиенты</p>
<flicking
    :options="{ gap: 10, moveType: 'freeScroll' }"
    :tag="'div'"
    :viewportTag="'div'"
    :cameraTag="'div'"
    style="height: 200px"
    @need-panel="e => {
      // ADD PANELS
    }"
    @move-end="e => {
      // HANDLE INDEX CHANGE
    }"
  >
  <q-card
    flat
    v-for="(ingredient,index) in pizza.additional_ingridients" :key="ingredient.id"
    @click="toggleAdditionIngridient(index,ingredient.price.find(x => x.city === $q.cookies.get('city_id')).price)">
    <q-img
      style="width: 85px;height: 65px"
        :src="ingredient.image"
      contain
        />
    <div class="text-center relative-position">
      <p class="text-caption q-mb-none">{{ingredient.name}}</p>
      <p class="text-caption text-bold">{{ingredient.price.find(x => x.city === $q.cookies.get('city_id')).price}}р</p>
      <q-badge v-if="ingredient.is_added" style="position: absolute; bottom: 0;right: 0" color="positive"> <q-icon name="done" color="white" /></q-badge>
    </div>

  </q-card>


  </flicking>
      </q-card-section>



   <div class="q-pa-sm full-width" style="position: absolute;bottom: 0" >
          <p class="h4 text-bold">Сумма: {{total_price}} р</p>
       <q-btn
         color="primary"
         :loading="is_loading"
         @click="addToCart"
         class="full-width"
         label="В корзину" >
         <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
          </template>
       </q-btn>
        </div>

    </q-card>

  </q-dialog>



</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data () {
    return {
      pizza:{
        prices:[]
      },
      pizzaSize:22,
      basePrice:0,
      price_22:0,
      price_33:0,
      additional_price:0,
      is_meat:false,
      is_loading:false,
    }
  },
  methods: {
    ...mapActions('componentState', ['changePizzaChooseVisible']),
    closeModal(){
      this.is_loading = false
      this.pizzaSize = 22
      this.additional_price = 0
      this.changePizzaChooseVisible(false)
    },
     async addToCart () {
      this.is_loading=true
      await this.$api.post(`/api/cart/add_to_cart`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item:this.pizza,
          selected_size: this.pizzaSize,
          weight:this.weight,
          units:1,
          city_id:this.$q.cookies.get('city_id'),
          is_meat:this.is_meat

        })
      await this.$store.dispatch('cart/fetchCart')
       this.$q.notify({
        position:'top',
        message: 'Добавлено в корзину',
        caption: this.pizza.name,
        color: 'secondary'
      })

      this.closeModal()
    },
    async getPizza(){
      const response = await this.$api.get(`/api/items/get_item_by_id/${this.openedPizza}`)
      this.pizza = response.data
      this.price_22 = this.pizza.prices.find(x => x.city === this.$q.cookies.get('city_id')).price
      this.price_33 = this.pizza.prices.find(x => x.city === this.$q.cookies.get('city_id')).price_33
      this.basePrice = this.price_22
      console.log(this.pizza)

    },
    toggleAdditionIngridient (index,price) {
      if(!this.pizza.additional_ingridients[index].is_added){
        this.pizza.additional_ingridients[index].is_added = true
        this.additional_price += price
      }else{
        this.pizza.additional_ingridients[index].is_added = false
        this.additional_price -= price
      }
    },

  },
  computed:{
    ...mapGetters('products',['openedPizza']),
    is_visible: {
      get(){
        return this.$store.state.componentState.pizza_choose_visible
      },
      set(val){
        return  this.changePizzaChooseVisible(val)
      }
    },
    weight(){
      return this.pizzaSize === 22 ? this.pizza.weight : this.pizza.weight_33
    },
    total_price(){
      return this.basePrice + this.additional_price
    }
  },
  watch:{
    pizzaSize: function (val){

      if (val === 22){
        console.log('22')
        this.basePrice = this.price_22
      }
      else {
        console.log('33')
        this.basePrice = this.price_33
      }
    }
  }
}
</script>
<style lang="sass">
.pizza-ingridient
  &::before
    content: ','
    margin-right: 5px
  &:last-child
    &::before
      content: none
.no-checkbox
  & .q-checkbox__inner
    display: none


</style>
