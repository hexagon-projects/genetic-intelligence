<template>
  <div class="relative">
      <button class="
              flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
              hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
              "
              :class="{
                  'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'admin.views.customers' || $route.name === 'admin.views.konsultan' || $route.name === 'admin.views.guru',
                  'text-dark bg-white': $route.name !== 'admin.views.customers' && $route.name !== 'admin.views.konsultan' && $route.name !== 'admin.views.guru'
              }"
              @click="toggleFilter('users')"
              ref="showUsersRef"
          >
              <PhFolderUser :size="24" weight="duotone" :class="{'text-light': $route.name === 'admin.views.customers' 
              || $route.name === 'admin.views.konsultan'
              || $route.name === 'admin.views.guru',
              'text-biru hover:text-light': $route.name !== 'admin.views.customers' 
              && $route.name !== 'admin.views.konsultan'
              && $route.name !== 'admin.views.guru'
              }" />
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
          <RouterLink :to="{name: 'admin.views.guru'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Data Kepsek / Guru BK
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

  <RouterLink :to="{name: 'admin.views.riwayat_pembayaran'}" 
       class="
          flex justify-center items-end px-4 py-2 gap-1 font-myFont
          hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
          "
          :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'admin.views.riwayat_pembayaran', 'text-dark bg-white': $route.name !== 'admin.views.riwayat_pembayaran'}"
      >
      <PhMoney :size="24" weight="duotone" :class="{'text-light': $route.name == 'admin.views.riwayat_pembayaran','text-biru hover:text-light': $route.name !== 'admin.views.riwayat_pembayaran'}" />
      Riwayat Pembayaran
  </RouterLink>

  <div class="relative">
    <button class="
            flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{
                'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'admin.views.pengaturan_jawaban_assessment' 
                || $route.name === 'admin.views.pengaturan_hasil_assessment'
                || $route.name === 'admin.views.sekolah',
                'text-dark bg-white': $route.name !== 'admin.views.pengaturan_hasil_assessment' 
                && $route.name !== 'admin.views.pengaturan_jawaban_assessment'
                && $route.name !== 'admin.views.sekolah'
            }"
            @click="toggleFilter('pengaturan')"
            ref="showPengaturanRef"
        >
            <PhGear :size="24" weight="duotone" :class="{'text-light': $route.name == 'admin.views.pengaturan_hasil_assessment' 
            || $route.name == 'admin.views.pengaturan_jawaban_assessment'
            || $route.name == 'admin.views.sekolah',
            'text-biru hover:text-light': $route.name !== 'admin.views.pengaturan_hasil_assessment' 
            && $route.name !== 'admin.views.pengaturan_jawaban_assessment'
            && $route.name !== 'admin.views.sekolah'
            }" />
        Pengaturan
        <PhCaretDown :size="16"/>
    </button>
    <div v-if="showPengaturan"
        class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <RouterLink :to="{name: 'admin.views.pengaturan_harga'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Pengaturan Harga
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.pengaturan_soal_assessment'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Pengaturan Soal Assessment
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.pengaturan_hasil_assessment'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Pengaturan Hasil Assessment
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.pengaturan_code'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Pengaturan Code
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.sekolah'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
            Pengaturan Sekolah
        </RouterLink>
        </div>
    </div>
  </div>
</template>

<script>
import { 
    PhFolderUser, PhUser, PhFolders, 
    PhSignOut, PhMoney, PhCaretDown,
    PhGear
 } from "@phosphor-icons/vue";
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
    PhCaretDown,
    PhGear
},
  setup(){
      const store = useStore()
      const userData = computed(() => store.getters.getUserData);

      const showUsers = ref(false)
      const showUsersRef = ref(false)
      const showReservasi = ref(false)
      const showReservasiRef = ref(false)
      const showPengaturan = ref(false)
      const showPengaturanRef = ref(false)

      const toggleFilter = (params) => {
            switch(params) {
                case 'users':
                    showUsers.value = !showUsers.value
                    break;
                case 'reservasi':
                    showReservasi.value = !showReservasi.value
                    break;
                case 'pengaturan':
                    showPengaturan.value = !showPengaturan.value
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

			if (showPengaturanRef.value && !showPengaturanRef.value.contains(e.target)) {
				showPengaturan.value = false;
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
          showPengaturan,
          showPengaturanRef,
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