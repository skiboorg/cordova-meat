<template>
  <div class="">
    <q-header class="bg-white text-black q-py-sm">
      <q-toolbar class="q-pb-md">
        <q-btn v-if="showBack" @click="$router.back()" flat :ripple="false" round dense icon="keyboard_backspace" class="q-mr-sm"/>
        <q-btn v-else flat round dense :ripple="false" class="q-mr-sm"/>
        <q-space/>
        <q-avatar rounded size="50px" class="bg-black ">
          <img class="q-pa-sm" src="~assets/logo_big.svg">
        </q-avatar>
        <q-space/>
        <q-btn @click="right_menu=true" flat round dense icon="menu" class="q-mr-sm"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right_menu" side="right" overlay behavior="mobile" bordered>
      <q-toolbar class="q-pb-md">
        <q-avatar rounded size="50px" class="bg-black q-mt-sm">
          <img class="q-pa-sm" src="~assets/logo_big.svg">
        </q-avatar>
        <q-space/>
        <q-btn @click="right_menu=false"
               flat
               round
               dense icon="close" class="q-mr-sm"/>
      </q-toolbar>

      <div class="q-px-sm">

        <p class="text-bold">Ваш город</p>
         <q-btn-dropdown
      split
      color="primary"
      disable-main-btn
      class="full-width q-mb-md"
      push
      no-caps>
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-icon left name="location_city" />
          <div class="text-center">
            {{currentCity.name}}
          </div>
        </div>
      </template>

      <q-list>
<!--        @click="changeCity(city.id)"-->
        <q-item v-for="city in cities" :key="city.id" clickable v-close-popup >

          <q-item-section>
            <q-item-label>{{city.name}}</q-item-label>
            <q-item-label caption v>{{city.info}}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="city.id === $q.cookies.get('city_id')">
            <q-icon name="check" color="positive" />
          </q-item-section>
        </q-item>


      </q-list>
    </q-btn-dropdown>
        <p class="q-mb-sm text-bold">{{currentCity.adresses.length>1 ? 'Адреса кафе' : 'Адрес кафе'}}</p>
        <p class="q-mb-none" v-for="adress in currentCity.adresses" :key="adress.id">{{adress.address}}</p>
      </div>
      <div v-if="$user.loggedIn" class="q-pa-sm">
        <q-separator class="q-mb-sm"/>

        <p class="text-bold">Бонусы: {{this.$user.user.bonuses}}</p>

        <q-btn class="full-width" color="primary" outline @click="logout" label="Выход"/>
      </div>
    </q-drawer>

  </div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      right_menu: false,
      showBack: false,
      currentCityIsOK:true,
    }
  },
  watch:{
    '$route.path': function(val) {
      console.log(val)
      val!=='/' ? this.showBack = true : this.showBack = false
    }
  },
  computed:{
    ...mapGetters('city',['cities','currentCity'])
  },
  methods:{
    ...mapActions('city',['changeMainCity']),
    ...mapActions('products',['fetchItems']),
    ...mapActions('cart',['fetchCart','eraseCart']),
    ...mapActions('auth',['logoutUser']),
    async changeCity(id){
      this.changeMainCity(id)
      await this.fetchItems()
      await this.$api.post(`api/cart/erase_cart/${this.$q.cookies.get('session_id')}`)
      await this.fetchCart()
    },
    async logout(){
      this.logoutUser()
      await this.eraseCart()
    }
  }
}
</script>
