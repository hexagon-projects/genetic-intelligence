<template>
  <navbar v-if="showNavbar"/>
  <router-view></router-view>
  <footerComp v-if="showFooter"/>
</template>

<script>
import navbar from './components/navbar/newNavbar.vue'
import footerComp from './components/footer/footer.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {navbar, footerComp},
  setup() {
    const showNavbar = ref(true);
    const showFooter = ref(true);
    const router = useRoute()

    watchEffect(() => {
      showNavbar.value = router.meta.showNavbar !== false;
      showFooter.value = router.meta.showFooter !== false;
    });

    return {
      showNavbar,
      showFooter
    };
  },
}
</script>

