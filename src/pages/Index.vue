<template>
  <q-page style="    padding-top: 56px;"  class="">

    <q-tabs
      v-model="tab"
      inline-label
      active-color="white"
      indicator-color="primary"
      outside-arrows
      mobile-arrows
      :ripple="false"
      no-caps
      class="  menu-tabs bg-white text-caption q-pb-sm">
      <q-tab :name="index"
             class="text-uppercase"
             :ripple="false"
             :label="item.name"
             v-for="(item,index) in categories"
             :key="item.id"
             @click="selectedCategory=index"
      />
    </q-tabs>
    <div>
      <q-tab-panels v-model="selectedCategory" animated v-touch-swipe.mouse.horizontal="swipe">
        <q-tab-panel :name="index" v-for="(category,index) in categories" :key="category.id">

            <q-virtual-scroll
              :style="{'max-height': listHeight+'px'}"
              :items="category.items"
              :virtual-scroll-slice-size="3"
              :virtual-scroll-item-size="40"

              separator
            >

              <template v-slot="{ item, index }">
                <div v-if="category.is_pizza && index===0" class="">
                  <q-card   class="q-mx-sm q-mb-sm" flat >
                    <q-card-section :horizontal="$q.screen.lt.sm" class="q-mb-sm">
                      <img src="~assets/constr.png" class="col-5 no-border-radius" style="object-fit: contain">
                      <!--          <q-img-->
                      <!--            contain-->
                      <!--            class="col-5"-->
                      <!--            src="~assets/constr.png"/>-->
                      <q-card-section class="q-px-sm q-py-none col-7">
                        <p class="text-subtitle1 text-bold q-ma-none">Пицца-конструктор</p>
                        <p class="text-caption text-grey q-mb-sm">Выберите половинки пицц и соберите свою!</p>
                        <div class="text-right">
                          <q-btn

                            @click="changeConstructorVisible(true)"
                            color="primary"
                            class="in-cart-btn full-width"
                            label="Собрать" />
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-card>
                  <q-separator spaced="md"/>
                </div>

                <ItemCard
                  v-if="!item.is_for_meat && item.is_active && !item.is_gift"
                  :item="item"
                  :key="index"/>
              </template>
            </q-virtual-scroll>
            <!--            -->
            <!--          <ItemCard-->
            <!--                 v-if="!item.is_for_meat && item.is_active && !item.is_gift"-->
            <!--                v-for="item in category.items"-->
            <!--                :item="item"-->
            <!--                :key="item.id"/>-->


        </q-tab-panel>


      </q-tab-panels>

      <!--      <section style="display: none"  v-touch-swipe.mouse.horizontal="swipe"   class="home-page-category" >-->


      <!--<transition-group style="display: inline-block" :name="anim">-->
      <!--      <q-card :key="999" v-if="categories[selectedCategory].is_pizza" class="q-mx-sm q-mb-sm" flat >-->
      <!--        <q-card-section horizontal class="q-mb-sm">-->
      <!--          <img src="~assets/constr.png" class="col-5 no-border-radius" style="object-fit: contain">-->
      <!--&lt;!&ndash;          <q-img&ndash;&gt;-->
      <!--&lt;!&ndash;            contain&ndash;&gt;-->
      <!--&lt;!&ndash;            class="col-5"&ndash;&gt;-->
      <!--&lt;!&ndash;            src="~assets/constr.png"/>&ndash;&gt;-->
      <!--          <q-card-section class="q-px-sm q-py-none col-7">-->
      <!--            <p class="text-subtitle1 text-bold q-ma-none">Пицца-конструктор</p>-->
      <!--            <p class="text-caption text-grey q-mb-sm">Выберите половинки пицц и соберите свою!</p>-->
      <!--            <div class="text-right">-->
      <!--              <q-btn-->

      <!--                   @click="changeConstructorVisible(true)"-->
      <!--                   color="primary"-->
      <!--                   class="in-cart-btn full-width"-->
      <!--                   label="Собрать" />-->
      <!--            </div>-->


      <!--          </q-card-section>-->
      <!--        </q-card-section>-->
      <!--      </q-card>-->
      <!--               <ItemCard-->
      <!--                 v-if="!item.is_for_meat && item.is_active && !item.is_gift"-->
      <!--                v-for="item in categories[selectedCategory].items"-->
      <!--                :item="item"-->
      <!--                :key="item.id"/>-->
      <!--</transition-group>-->
      <!--    </section>-->
    </div>



    <PizzaConstructor/>
    <Pizza/>
  </q-page>
</template>

<script>

import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import ItemCard from "components/ItemCard";
import PizzaConstructor from "components/constructor";
import Pizza from "components/pizza";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  components:{
    ItemCard,
    PizzaConstructor,
    Pizza
  },

  data(){
    return{
      tab:0,
      listHeight:0,
      fullHeight: false,
      selectedCategory:0,
      anim:null,
    }
  },
  async mounted() {
    this.$user.loggedIn ?  await this.getUser(false) : null
    //this.selectedCategory = this.categories[0].id
    this.listHeight=window.innerHeight - 250
  },

  methods: {
    ...mapActions('products',['fetchItems']),
    ...mapActions('auth',['getUser']),
    ...mapActions('cart',['fetchCart']),
    ...mapActions('componentState',['changeConstructorVisible']),
    swipe(details){
      if(details.direction === 'left'){
        this.tab <this.categories.length-1 ? this.tab +=1 : this.tab=0
        this.selectedCategory = this.tab
        this.anim='fadeL'
      }
      if(details.direction === 'right'){
        this.tab >0 ? this.tab -=1 : this.tab=this.categories.length-1
        this.anim='fadeR'
        this.selectedCategory = this.tab
      }
    },


  },
  computed:{
    ...mapGetters('products',['categories','items']),
    ...mapGetters('cart',['items_in_cart']),

  }
}
</script>
<style lang="sass">
.products-grid
  display: grid
  grid-template-columns: repeat(auto-fill,minmax(290px,1fr))
  grid-column-gap: 30px
  grid-row-gap: 30px
  grid-auto-rows: max-content


.menu-tabs
  //position: sticky
  position: fixed
  width: 100%
  top: 82px
  z-index: 100
  & .q-tab
    &__indicator
      bottom: 4px
      height: 40px
      z-index: -1
      border-radius: 4px
//
//  &--active
//    background: $primary
//    border-radius: 4px

.fadeR-enter-active,
.fadeR-leave-active
  transition-property: all
  transition-duration: 200ms
  transform: translateX(0%)

.fadeR-enter,
.fadeR-leave-to
  transform: translateX(100%)

.fadeL-enter-active,
.fadeL-leave-active
  transition-property: all
  transition-duration: 200ms
  transform: translateX(0%)

.fadeL-enter,
.fadeL-leave-to
  transform: translateX(-100%)

</style>
