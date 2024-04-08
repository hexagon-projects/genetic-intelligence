<template>
  <div v-if="currentRouteName !== 'views.login' 
  && currentRouteName !== 'views.register'
  && currentRouteName !== 'user.views.payment_status'
  && currentRouteName !== 'views.reset_password'
  ">
    <navbar/>
  </div>
  <router-view></router-view>
  <div v-if="currentRouteName !== 'views.login' 
  && currentRouteName !== 'views.register'
  && currentRouteName !== 'user.views.payment_status'
  && currentRouteName !== 'views.reset_password'
  ">
    <footerComp/>
  </div>
</template>

<script>
import navbar from './components/navbar/newNavbar.vue'
import footerComp from './components/footer/footer.vue';
import { ref, watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {navbar, footerComp},
  setup() {
    const showNavbar = ref(true);
    const showFooter = ref(true);
    const router = useRoute()

    const currentRouteName = computed(() => router.name)

    // watchEffect(() => {
    //   showNavbar.value = router.meta.showNavbar !== false;
    //   showFooter.value = router.meta.showFooter !== false;
    // });

    return {
      showNavbar,
      showFooter,
      currentRouteName
    };
  },
}
</script>

