<template>
  <div
    v-if="
      currentRouteName !== 'views.login' &&
      currentRouteName !== 'views.register' &&
      currentRouteName !== 'user.views.payment_status' &&
      currentRouteName !== 'views.reset_password' &&
      currentRouteName !== 'views.forgot_password' &&
      currentRouteName !== 'views.404notfound' &&
      currentRouteName !== 'user.views.pembayaran' &&
      currentRouteName !== 'user.views.download_hasil_cpm'
    "
  >
    <!-- <navbar/> -->
  </div>

  <slot></slot>

  <div
    class="hidden lg:block"
    v-if="
      currentRouteName !== 'views.login' &&
      currentRouteName !== 'views.register' &&
      currentRouteName !== 'user.views.payment_status' &&
      currentRouteName !== 'views.reset_password' &&
      currentRouteName !== 'views.forgot_password' &&
      currentRouteName !== 'views.404notfound' &&
      currentRouteName !== 'user.views.pembayaran' &&
      currentRouteName !== 'user.views.download_hasil_cpm'
    "
  >
    <footerComp />
  </div>
</template>

<script setup>
// import navbar from '@/components/REMAKE/Navbar/Navbar.vue'
// import navbar from './components/navbar/newNavbar.vue'
import footerComp from "@/components/REMAKE/Footer/NewFooter.vue";
// import footerComp from './components/footer/footer.vue';
import { ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";

//  const showNavbar = ref(true);
const showFooter = ref(true);
const router = useRoute();

const currentRouteName = computed(() => router.name);
</script>
