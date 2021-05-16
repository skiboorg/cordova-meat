<template>
  <q-layout view="hHh lpR fFf">
    <Header/>
    <q-page-container>
<!--      <transition name="fade">-->
      <router-view />
<!--        </transition>-->
    </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script>
import Header from 'src/components/header'
import Footer from "components/footer";
export default {
  components:{
    Header,
    Footer
  }
}
</script>
<style>
.page-enter-active,
.page-leave-active {

  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
  transform: translateX(0%);
}
.page-enter,
.page-leave-to {
  transform: translateX(-100%);

}
</style>
