<template>
  <q-page padding>
    <q-list >
      <q-item to="lk-personal" clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="person" />
        </q-item-section>

        <q-item-section>Личные даные</q-item-section>
      </q-item>
  <q-item to="lk-delivery" clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="location_on" />
        </q-item-section>

        <q-item-section>Адрес доставки</q-item-section>
      </q-item>
  <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="password" />
        </q-item-section>

        <q-item-section>Сменить пароль</q-item-section>
      </q-item>




    </q-list>
  </q-page>

</template>

<script>
export default {
  name: 'Error404'
}
</script>
