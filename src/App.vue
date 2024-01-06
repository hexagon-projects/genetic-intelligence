<template>
  <navbar v-if="showNavbar"/>
  <router-view></router-view>
  <!-- <footerComp/> -->
</template>

<script>
import navbar from './components/navbar/navbar.vue'
import footerComp from './components/footer/footer.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {navbar, footerComp},
  setup() {
    const showNavbar = ref(true);
    const router = useRoute()

    watchEffect(() => {
      showNavbar.value = router.meta.showNavbar !== false;
    });

    return {
      showNavbar,
    };
  },
}
</script>

