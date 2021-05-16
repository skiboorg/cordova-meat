<template>
  <q-page padding>
    <q-card class="my-card" v-for="promo in promotions" :key="promo.id">
      <img :src="promo.image">

      <q-card-section>
        <div class="text-h6">{{promo.name}}</div>

      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ promo.text }}
      </q-card-section>
    </q-card>
  </q-page>

</template>

<script>
export default {
   data() {
    return {
    promotions:[]
    };
  },
  async beforeMount() {
     const responce =  await this.$api.get('/api/promotion/get_all')
    this.promotions = responce.data
  },

}
</script>
