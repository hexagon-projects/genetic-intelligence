<template>
  <div class="mx-4 pt-5">
    <FotoProfile :dataCustomer="userData"/>
  </div>
  
  <div class="flex flex-col lg:flex-row justify-center mx-4 pt-5 gap-5">
    <div class="lg:w-1/2">
      <KeepAlive>
        <InformasiPribadi :dataCustomer="userData"/>
      </KeepAlive>
    </div>
  
    <div class="lg:w-1/2 flex flex-col gap-5">
        <InformasiSekolah v-if="userData.is_student == 1" :dataCustomer="userData"/>

        <UbahPassword :dataCustomer="userData"/>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import InformasiPribadi from './customer/informasi_pribadi/informasiPribadi.vue'
import InformasiSekolah from './customer/informasi_sekolah/informasiSekolah.vue'
import UbahPassword from './customer/ubah_password/ubahPassword.vue'
import FotoProfile from './customer/foto_profile/fotoProfile.vue'

export default {
    name: 'customerProfile',
    components: { InformasiPribadi, FotoProfile, InformasiSekolah, UbahPassword },
    setup(){
        
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userRole = computed(() => store.getters.getUserRole)

        return { 
            userData,
            userRole,
        }
      }
    }
</script>