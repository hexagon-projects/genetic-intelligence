<template>
  <div class="relative">
      <button class="
              flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
              hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
              "
              :class="{
                  'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'admin.views.customers' || $route.name === 'admin.views.konsultan',
                  'text-dark bg-white': $route.name !== 'admin.views.customers' && $route.name !== 'admin.views.konsultan'
              }"
              @click="toggleFilter('users')"
              ref="showUsersRef"
          >
              <PhFolderUser :size="24" weight="duotone" :class="{'text-light': $route.name === 'admin.views.customers' || $route.name === 'admin.views.konsultan','text-biru hover:text-light': $route.name !== 'admin.views.customers' && $route.name !== 'admin.views.konsultan'}" />
          Users
          <PhCaretDown :size="16"/>
      </button>
      <div v-if="showUsers"
          class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <RouterLink :to="{name: 'admin.views.customers'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
              Data Customer
          </RouterLink>
          <RouterLink :to="{name: 'admin.views.konsultan'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
              Data Konsultan
          </RouterLink>
          </div>
      </div>
  </div>

  <div class="relative">
    <button class="
            flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{
                'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'admin.views.reservasi' || $route.name === 'admin.views.reservasi_psikotest',
                'text-dark bg-white': $route.name !== 'admin.views.reservasi' && $route.name !== 'admin.views.reservasi_psikotest'
            }"
            @click="toggleFilter('reservasi')"
            ref="showReservasiRef"
        >
            <PhFolders :size="24" weight="duotone" :class="{'text-light': $route.name == 'admin.views.reservasi' || $route.name == 'admin.views.reservasi_psikotest','text-biru hover:text-light': $route.name !== 'admin.views.reservasi' && $route.name !== 'admin.views.reservasi_psikotest'}" />
        Reservasi
        <PhCaretDown :size="16"/>
    </button>
    <div v-if="showReservasi"
        class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <RouterLink :to="{name: 'admin.views.reservasi'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Reservasi GIM
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.reservasi_psikotest'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Reservasi Psikotest
        </RouterLink>
        </div>
    </div>
  </div>

  <!-- <RouterLink :to="{name: 'admin.views.reservasi'}" 
       class="
          flex justify-center items-end px-4 py-2 gap-1 font-myFont
          hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
          "
          :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'admin.views.reservasi', 'text-dark bg-white': $route.name !== 'admin.views.reservasi'}"
      >
      <PhFolders :size="24" weight="duotone" :class="{'text-light': $route.name == 'admin.views.reservasi','text-biru hover:text-light': $route.name !== 'admin.views.reservasi'}" />
      Data Reservasi
  </RouterLink> -->

  <RouterLink :to="{name: 'admin.views.riwayat_pembayaran'}" 
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
import { PhFolderUser, PhUser, PhFolders, PhSignOut, PhMoney, PhCaretDown } from "@phosphor-icons/vue";
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CustomerNav',
  components: {
    PhFolderUser,
    PhUser,
    PhFolders,
    PhSignOut,
    PhMoney,
    PhCaretDown
},
  setup(){
      const store = useStore()
      const userData = computed(() => store.getters.getUserData);

      const showUsers = ref(false)
      const showUsersRef = ref(false)
      const showReservasi = ref(false)
      const showReservasiRef = ref(false)

      const toggleFilter = (params) => {
            switch(params) {
                case 'users':
                    showUsers.value = !showUsers.value
                    break;
                case 'reservasi':
                    showReservasi.value = !showReservasi.value
                    break;
                case 'lainya':
                    showLainya.value = !showLainya.value
                    break;
            }
            // showReservasi.value = !showReservasi.value
        }

		const closeDropdown = (e) => {
			if (showUsersRef.value && !showUsersRef.value.contains(e.target)) {
				showUsers.value = false;
			}

			if (showReservasiRef.value && !showReservasiRef.value.contains(e.target)) {
				showReservasi.value = false;
			}

			// if (showLainyaRef.value && !showLainyaRef.value.contains(e.target)) {
			// 	showLainya.value = false;
			// }
    	};

        onMounted(() => {
          document.body.addEventListener('click', closeDropdown);
        });

        onBeforeUnmount(() => {
          document.body.removeEventListener('click', closeDropdown);
        });

      return {
          userData,
          showUsers,
          showUsersRef,
          showReservasi,
          showReservasiRef,
          toggleFilter
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