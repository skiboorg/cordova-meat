<template>
<q-page padding>
  <p class="text-h6">Личные данные</p>
  <q-form class="q-gutter-sm q-mb-lg">
     <q-input  filled v-model="userData.fio" label="ФИО" />
  <q-input  disable filled v-model="userData.phone" label="Телефон" />


  </q-form>
 <q-btn color="primary" class="full-width " @click="userDataSave" label="Сохранить"/>

</q-page>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      userData:{
        fio:this.$user.user.fio,
        email:this.$user.user.email,
        birthday:this.$user.user.birthday,
        phone:this.$user.user.phone,
      },

    };
  },
  methods:{
    ... mapActions('auth',['getUser']),
    async userDataSave(){
      const responce = await this.$api.post('/api/user/update',{userData:this.userData})
      console.log(responce.data)
      await  this.getUser(false)
    },
  }
}
</script>
