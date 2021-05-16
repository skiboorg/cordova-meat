<template>
  <q-page v-if="!orderPlaced" class="q-pa-sm q-mb-lg">
    <p class="text-h6 text-bold">Оформление заказа</p>
    <p class="q-mb-sm text-bold">Доставка</p>
    <q-btn-toggle
      v-model="orderData.delivery_type"
      toggle-color="primary"
      class="q-mb-lg"
      :options="[
        {label: 'Курьером', value: 'Курьером'},
        {label: 'Самовывоз', value: 'Самовывоз'},
      ]"
    />

    <div  class="checkout-form">

      <q-form ref="orderForm" @submit="placeOrder" class="q-gutter-sd q-mb-lg">
        <q-input filled v-model="orderData.name" dense label="Ваше имя *" :rules="[val => !!val || 'Это обязательное поле']"/>
        <q-input pattern="[0-9]*" filled v-model="orderData.phone" dense label="Телефон *" mask="+7 (###) ###-##-##" lazy-rules
                 :rules="[val => !!val  || 'Это обязательное поле', val => val.length > 17 || 'Телефон введен не полностью']"/>
        <q-checkbox class="q-mb-md" dense v-model="orderData.need_callback" label="Перезвоните мне для уточнения деталей заказа" />
        <div v-if="orderData.delivery_type==='Курьером'">
          <div v-if="$user.loggedIn &&  user_addresses.length>0" class="q-mb-sm">
            <q-select dense filled v-model="selectedAddress" :options="user_addresses" label="Выберите адрес доставки" />
            <p class="q-mb-sm">или укажите другой</p>
          </div>
        </div>

        <div v-if="orderData.delivery_type==='Курьером'" class="flex  no-wrap">
          <q-input class="full-width " filled v-model="orderData.street" dense label="Улица *" :rules="[val => !!val || 'Это обязательное поле']"/>
          <q-input  filled class="q-ml-sm" v-model="orderData.house"  dense label="Дом *" :rules="[val => !!val || 'Это обязательное поле']"/>
        </div>
        <div v-if="orderData.delivery_type==='Курьером'" class="flex justify-between no-wrap q-mb-md">
          <q-input class=" q-mr-sm" filled v-model="orderData.flat" type="number" dense label="Кв " />
          <q-input class=" q-mr-sm" filled v-model="orderData.podezd" type="number" dense label="Подъезд " />
          <q-input class=" q-mr-sm"  filled v-model="orderData.code" type="number" dense label="Код двери " />
          <q-input  filled v-model="orderData.floor" dense type="number" label="Этаж " />
        </div>
      </q-form>

    </div>
    <div v-show="orderData.delivery_type!=='Курьером'" class="">
      <p class="text-bold text-h6">Адрес кафе</p>
      <div class="q-mb-sm " v-for="address in adresses" :key="address.id">
        <q-radio dense   v-model="orderData.cafe_address"  :val="address.address" :label="address.address" />
      </div>

      <!--      <div ref="map" style="height: 300px" class="q-mb-sm">-->

      <!--        <yandex-map-->
      <!--          :coords="coordinates"-->
      <!--          :class="'ymapContanerHidden'"-->
      <!--          zoom="14"-->
      <!--          style="width: 100%; height: 100%; padding: 0"-->
      <!--          :cluster-options="{ 1: {clusterDisableClickZoom: true} }"-->
      <!--          :controls="['trafficControl']"-->
      <!--          map-type="map">-->
      <!--          <ymap-marker-->
      <!--            markerId="1"-->
      <!--            marker-type="Placemark"-->
      <!--            :coords="coordinates">-->
      <!--          </ymap-marker>-->
      <!--        </yandex-map>-->


    </div>

    <!--    </div>-->
    <q-input
      class="q-mb-md"
      v-model="orderData.comment"
      label="Комментарий к заказу"
      filled
      type="textarea"
    />
    <p class="text-bold text-h6">{{orderData.delivery_type === 'Курьером' ? 'Когда доставить?' : 'Во сколько заберете?'}}</p>
    <div class="flex justify-between no-wrap q-mb-sm">
      <q-input dense v-show="orderData.delivery_type === 'Курьером'" style="flex-basis: 49%" filled v-model="orderData.date"
               mask="date" label="Дата" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="orderData.date" :options="dateFn"  >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Выбрать дату" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select dense style="flex-basis: 49%" filled v-model="orderData.time" :options="delivery_time" label="Время" />

    </div>

    <p class="text-bold text-primary text-body2">{{orderData.delivery_type==='Курьером' ? 'Доставка в районе 60 минут' : 'Заказ можно будет забрать примерно через 40 минут'}}</p>
    <p class="text-bold text-h6">Оплата</p>
    <div class="flex column items-start q-mb-lg">
      <q-radio v-if="orderData.delivery_type==='Курьером'" class="q-mb-sm" dense  v-model="orderData.payment" val="cash" label="Наличными курьеру" />
      <div v-if="orderData.payment==='cash'" class="flex items-center">
        <p style="flex-basis: 40%">С какой суммы подготовить сдачу?</p>
        <q-input  type="number" class="q-mr-sm" style="flex-basis: 20%" dense  outlined v-model="orderData.cashback" ></q-input>
        <q-checkbox left-label v-model="orderData.no_cashback">Без сдачи</q-checkbox>
      </div>
      <q-radio class="q-mb-sm" dense  v-model="orderData.payment" val="online" label="Онлайн" />
      <q-radio v-if="orderData.delivery_type==='Курьером'" dense  v-model="orderData.payment" val="courier_card" label="Картой курьеру" />

    </div>

    <q-btn v-if="orderData.delivery_type==='Курьером'" color="primary" @click="createOrder" class="text-bold q-mb-lg" size="md"
           :label="`Подтвердить заказ на ${items_in_cart.total_price - cart_bonuses - cart_promo} р, а также + 100р доставка` "/>
    <q-btn v-else color="primary" @click="createOrder" class="text-bold q-mb-lg" size="md"
           :label="`Подтвердить заказ на ${items_in_cart.total_price - cart_bonuses - cart_promo} р` "/>


    <p class="text-caption text-grey-6">Нажимая на кнопку, вы даете согласие на обработку персональных данных</p>

    <Payment/>
  </q-page>
  <q-page v-else class="q-pa-sm q-mb-lg flex column items-center justify-center">
    <p class="text-h6 text-bold">Оформление заказа завершено</p>
    <p class="text-h6 text-bold text-primary q-mb-xl">Номер заказа: {{orderCode}}</p>
    <q-btn label="В меню" color="primary" to="/"/>
  </q-page>
</template>

<script>
import {  mapActions, mapGetters} from "vuex";
import { date } from 'quasar'
import Payment from "components/payment";

export default {
  components:{
    Payment
  },
  data() {
    return {
      myMap: null,
      current_id:null,
      headerCart:true,
      myGeoObject: null,
      currentMark:null,
      orderPlaced:false,
      orderCode:null,
      delivery_type:1,
      adresses:[],
      selectedAddress:null,
      delivery_time: [
        '10:30','11:00', '11:30','12:00', '12:30', '13:00', '13:30','14:00', '14:30','15:00', '15:30', '16:00','16:30','17:00',
        '17:30','18:00', '18:30', '19:00', '19:30','20:00', '20:30','21:00', '21:30', '22:00', '22:30'],
      orderData:{
        pizzaSize:22,
        delivery_type:'Курьером',
        cafe_address:null,
        payment:'cash',
        need_callback:false,
        no_cashback:true,
        comment:null,
        cashback:0,
        name: this.$user.loggedIn ? this.$user.user.fio : '',
        phone: this.$user.loggedIn ? this.$user.user.phone : '',
        street:null,
        house:null,
        flat:null,
        podezd:null,
        code:null,
        floor:null,
        date: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        time:'11:00',
      },

      dateOptions: {
        disabledDate(time) {
          return (time.getTime() + 3600 * 1000 * 24) < Date.now();
        }

      },
    };
  },
  watch:{
    selectedAddress(val){
      console.log(val)
      this.orderData.street = val.street
      this.orderData.house = val.house
      this.orderData.flat = val.flat
      this.orderData.podezd = val.podezd
      this.orderData.code = val.code
      this.orderData.floor = val.floor
    },
    'orderData.delivery_type'(val){
      val === 'Самовывоз' ? this.orderData.payment = 'online' : 'cash'

    }
  },
  mounted() {
    this.orderData.cafe_address = this.currentCity.adresses[0].address

    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let is_not_half_hour = minute < 30
    // for (let i = hour; i < 23; i++) {
    //   this.delivery_time = []
    //   this.delivery_time.push(`${i}:00`)
    //   if (is_not_half_hour)
    //     this.delivery_time.push(`${i}:30`)
    // }
    this.adresses = this.currentCity.adresses
    this.orderData.time= `${is_not_half_hour ? hour : hour+1}:${is_not_half_hour ? '30' : '00'}`
  },
  computed:{
    ...mapGetters('cart',['cart_items_count','items_in_cart','cart_bonuses','cart_promo',]),
    ...mapGetters('city',['cities','currentCity']),
    delivery_price(){
      return  this.orderData.delivery_type==='Курьером' ? 100 : 0
    },
    coordinates () {
      return this.currentCity.adresses.find(x => x.address === this.orderData.cafe_address).coordinates.split(',')
    },
    user_addresses(){
      if (this.$user.loggedIn){
        let addr = []
        for (let i of this.$user.user.addresses){
          addr.push({
            id:i.id,
            label:i.street,
            value:i.id,
            street:i.street,
            house:i.house,
            flat:i.flat,
            podezd:i.podezd,
            code:i.code,
            floor:i.floor,
          })
        }
        return addr
      }
    }
  },
  methods:{
    ...mapActions('cart',['fetchCart','eraseCart']),
    ...mapActions('auth',['getUser']),
    ...mapActions('componentState',['changePaymentVisible','changePaymentUrl']),
    map_init() {
      console.log(this.$refs)
      this.myMap = new ymaps.Map(this.$refs.map, {
        center: [55.76, 37.64], // Москва
        zoom: 10
      }, {
        searchControlProvider: 'yandex#search'
      })
    },
    dateFn (date) {
      return date >= new Date().toISOString().split('T')[0].replace('-','/').replace('-','/')
    },
    async placeOrder(){
      console.log('new order')
      this.$q.loading.show()
      const response = await this.$api.post('/api/order/new_order',
        {
          session_id:this.$q.cookies.get('session_id'),
          data:this.orderData,
          bonuses:this.cart_bonuses,
          promo:this.cart_promo,
          source:'mobile'
        })
      console.log(response.data)
      if (response.data.formUrl){
        console.log('redirect ',response.data.formUrl)
        this.eraseCart()
        this.changePaymentUrl(response.data.formUrl)
        this.changePaymentVisible(true)

        this.$q.loading.hide()
      }else{
        this.orderCode = response.data.code
        this.$q.loading.hide()
        this.orderPlaced = true
        await this.fetchCart()
        this.$user.loggedIn ?  await this.getUser(false) : null
      }
    },
    createOrder(){
      this.$refs.orderForm.submit()
    }
  }
}
</script>
<style lang="sass">
.q-field__bottom--animated
  bottom: 4px
</style>
