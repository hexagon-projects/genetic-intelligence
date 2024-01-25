<template>
  <RouterLink :to="{name: 'admin.views.customers'}" 
  class="
          flex justify-center items-end px-4 py-2 gap-1 font-myFont
          hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
          "
          :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'admin.views.customers', 'text-dark bg-white': $route.name !== 'admin.views.customers'}"
      >
      <PhFolderUser :size="24" weight="duotone" :class="{'text-light': $route.name == 'admin.views.customers','text-biru hover:text-light': $route.name !== 'admin.views.customers'}" />
      Data Customer
  </RouterLink>
  <RouterLink :to="{name: 'admin.views.konsultan'}" 
       class="
          flex justify-center items-end px-4 py-2 gap-1 font-myFont
          hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
          "
          :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'admin.views.konsultan', 'text-dark bg-white': $route.name !== 'admin.views.konsultan'}"
      >
      <PhFolderUser :size="24" weight="duotone" :class="{'text-light': $route.name == 'admin.views.konsultan','text-biru hover:text-light': $route.name !== 'admin.views.konsultan'}" />
      Data Konsultan
  </RouterLink>
  <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
       class="
          flex justify-center items-end px-4 py-2 gap-1 font-myFont
          hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
          "
          :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.hasil_deteksi', 'text-dark bg-white': $route.name !== 'user.views.hasil_deteksi'}"
      >
      <PhFolders :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.hasil_deteksi','text-biru hover:text-light': $route.name !== 'user.views.hasil_deteksi'}" />
      Data Reservasi
  </RouterLink>
  <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
       class="
          flex justify-center items-end px-4 py-2 gap-1 font-myFont
          hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
          "
          :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.hasil_deteksi', 'text-dark bg-white': $route.name !== 'user.views.hasil_deteksi'}"
      >
      <PhMoney :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.hasil_deteksi','text-biru hover:text-light': $route.name !== 'user.views.hasil_deteksi'}" />
      Riwayat Pembayaran
  </RouterLink>
</template>

<script>
import { PhFolderUser, PhUser, PhFolders, PhSignOut, PhMoney } from "@phosphor-icons/vue";
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CustomerNav',
  components: {
    PhFolderUser,
    PhUser,
    PhFolders,
    PhSignOut,
    PhMoney
},
  setup(){
      const store = useStore()
      const userData = computed(() => store.getters.getUserData);

      return {
          userData
      }
  }
}
</script>

<style scoped>
.gradasi {
  background: rgb(11,64,244);
background: linear-gradient(162deg, rgba(11,64,244,1) 26%, rgba(2,178,255,1) 82%); 
}
</style>