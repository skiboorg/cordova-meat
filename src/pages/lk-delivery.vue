<template>
  <q-page padding>
    <p class="text-h6 q-mb-none">Адреса доставки</p>
     <q-list >
      <q-item clickable v-ripple v-for="address in $user.user.addresses" :key="address.id">
         <q-item-section>{{address.street}} {{address.house}}</q-item-section>
        <q-item-section avatar>
          <q-icon @click="deleteAddress(address.id)" color="grey-6" name="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-form>
      <p class="text-bold">Добавить новый адрес</p>
      <div class="flex justify-between no-wrap">
          <q-input class=" q-mr-sm" filled v-model="newAddress.street" dense label="Улица *" :rules="[val => !!val || 'Это обязательное поле']"/>
          <q-input  filled v-model="newAddress.house"  dense label="Дом *" :rules="[val => !!val || 'Это обязательное поле']"/>
        </div>
        <div class="flex justify-between no-wrap q-mb-md">
          <q-input class=" q-mr-sm" filled v-model="newAddress.flat" type="number" dense label="Кв " />
          <q-input class=" q-mr-sm" filled v-model="newAddress.podezd" type="number" dense label="Подъезд " />
          <q-input class=" q-mr-sm"  filled v-model="newAddress.code" type="number" dense label="Код двери " />
          <q-input  filled v-model="newAddress.floor" dense type="number" label="Этаж " />
        </div>
      <q-btn @click="userAddressSave" color="primary" class="full-width" label="Добавить"/>
    </q-form>

  </q-page>
</template>

<script>
import {mapActions} from "vuex";

export default {
   data() {
    return {
      newAddress:{
          street:null,
          house:null,
          flat:null,
          podezd:null,
          code:null,
          floor:null
      }


    };
  },
  methods:{
     ... mapActions('auth',['getUser']),
     async userAddressSave(){
      await this.$api.post('/api/user/add_address',this.newAddress)
      await  this.getUser(false)
    },
    async deleteAddress(id){
      await this.$api.delete(`/api/user/delete_address/${id}`)
     await  this.getUser(false)
    },
  }
}
</script>
