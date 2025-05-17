<template>
    <!-- Modal Popup -->
    <modalMenu v-if="showModal.showTes || showModal.showHasil || showModal.showLainya" 
    :menus="showModal.showTes ? testDatas : showModal.showHasil ? hasilDatas : lainyaDatas"
    :userDatas="props.userDatas" @closeModal="closeModal"
    />

    <button @click="handleClick('showTes')"
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.dashboard'}"
        >
        <div class="self-center">
            <img :class="{'grayscale': $route.name !== 'user.views.deteksi'
                   || $route.name !== 'user.views.assesment'
                   || $route.name !== 'user.views.cpm'
                //    || $route.name !== 'user.views.psikotest'
                   || $route.name !== 'user.views.test_gadget'
                   || $route.name !== 'user.views.rmib'
                   || $route.name !== 'user.views.iq', 
                'grayscale-0': $route.name == 'user.views.deteksi'
                   || $route.name == 'user.views.cpm'
                   || $route.name == 'user.views.assesment'
                //    || $route.name == 'user.views.psikotest'
                   || $route.name == 'user.views.test_gadget'
                   || $route.name == 'user.views.rmib'
                   || $route.name == 'user.views.iq'
                }" 
                src="@/assets/icons/lakukan-tes.svg" alt="icon">
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.cpm'
                   || $route.name !== 'user.views.assesment'
                //    || $route.name !== 'user.views.psikotest'
                   || $route.name !== 'user.views.test_gadget'
                   || $route.name !== 'user.views.rmib'
                   || $route.name !== 'user.views.iq', 
                   'text-black':
                    $route.name == 'user.views.deteksi'
                   || $route.name == 'user.views.cpm'
                   || $route.name == 'user.views.assesment'
                //    || $route.name == 'user.views.psikotest'
                   || $route.name == 'user.views.test_gadget'
                   || $route.name == 'user.views.rmib'
                   || $route.name == 'user.views.iq'
                }" 
                class="font-roboto block text-xs">Lakukan Tes</span>
    </button>

    <button @click="handleClick('showHasil')"
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.dashboard'}"
        >
        <div class="self-center">
            <img class="transition-all duration-100" 
                :class="{'grayscale': $route.name !== 'user.views.hasil_deteksi'
                    || $route.name !== 'user.views.hasil_cpm'
                    || $route.name !== 'user.views.hasil_assessment'
                    || $route.name !== 'user.views.hasil_rmib'
                    || $route.name !== 'user.views.hasil_gadget'
                    || $route.name !== 'user.views.hasil_iq', 'grayscale-0': $route.name == 'user.views.hasil_deteksi'
                    || $route.name == 'user.views.hasil_cpm'
                    || $route.name == 'user.views.hasil_assessment'
                    || $route.name == 'user.views.hasil_rmib'
                    || $route.name == 'user.views.hasil_gadget'
                    || $route.name == 'user.views.hasil_iq'
                    }" 
                src="@/assets/icons/hasil-tes.svg" alt="icon"/>
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.hasil_deteksi'
                    || $route.name !== 'user.views.hasil_cpm'
                    || $route.name !== 'user.views.hasil_assessment'
                    || $route.name !== 'user.views.hasil_gadget'
                    || $route.name !== 'user.views.hasil_rmib'
                    || $route.name !== 'user.views.hasil_iq', 
                   'text-black':
                   $route.name == 'user.views.hasil_deteksi'
                    || $route.name == 'user.views.hasil_cpm'
                    || $route.name == 'user.views.hasil_assessment'
                    || $route.name == 'user.views.hasil_gadget'
                    || $route.name == 'user.views.hasil_rmib'
                    || $route.name == 'user.views.hasil_iq'
                }" 
                class="font-roboto block text-xs">Hasil Tes</span>
    </button>

    <RouterLink :to="{name: 'user.views.reservasi'}" 
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.reservasi'}"
        >
        <div class="self-center">
            <img class="transition-all duration-100" 
                :class="{'grayscale': $route.name !== 'user.views.reservasi', 'grayscale-0': $route.name == 'user.views.reservasi'}" 
                src="@/assets/icons/reservasi.svg" alt="icon"/>
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.reservasi', 'text-black': $route.name == 'user.views.reservasi'}" 
        class="font-roboto block text-xs">Reservasi</span>
    </RouterLink>

    <button @click="handleClick('showLainya')"
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.reservasi'}"
        >
        <div class="self-center">
            <img class="transition-all duration-100" 
                :class="{'grayscale': $route.name !== 'user.views.reservasi', 'grayscale-0': $route.name == 'user.views.reservasi'}" 
                src="@/assets/icons/nav-lainya.svg" alt="icon"/>
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.reservasi', 'text-black': $route.name == 'user.views.reservasi'}" 
        class="font-roboto block text-xs">Lainya</span>
    </button>
</template>

<script setup>
import { ref } from "vue";
import modalMenu from './modalMenu.vue'
import { RouterLink } from 'vue-router';

const props = defineProps(['userDatas'])

const showModal = ref({
    showTes: false,
    showHasil: false,
    showLainya: false
})

const testDatas = ref([
    {name: 'Starter Pack', route: 'user.views.starter_pack', img:  new URL('@/assets/icons/starter-pack.svg', import.meta.url).href},
    {name: 'Test Jatidiri Sejati', route: 'user.views.deteksi', img:  new URL('@/assets/icons/tes-gim.svg', import.meta.url).href},
    {name: 'Test Jatidiri Belajar', route: 'user.views.assesment', img:  new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href},
    {name: 'Test Jatidiri Cerdas', route: 'user.views.iq', img:  new URL('@/assets/icons/tes-iq.svg', import.meta.url).href},
    // {name: 'Test CPM', route: 'user.views.cpm', img:  new URL('@/assets/icons/tes-cpm.svg', import.meta.url).href},
    {name: 'Test Jatidiri Kendali', route: 'user.views.test_gadget', img:  new URL('@/assets/icons/test-iaa.svg', import.meta.url).href},
    {name: 'Test Jatidiri Bakat', route: 'user.views.deteksi', img:  new URL('@/assets/icons/test-rmib.svg', import.meta.url).href},
    // {name: 'Test Jatidiri Bahagia', route: 'user.views.test_kebahagiaan', img:  new URL('@/assets/icons/tes-tik.svg', import.meta.url).href},
])

const hasilDatas = ref([
    {name: 'Hasil Test Jatidiri Sejati', route: 'user.views.hasil_deteksi', img:  new URL('@/assets/icons/tes-gim.svg', import.meta.url).href},
    {name: 'Hasil Test Jatidiri Belajar', route: 'user.views.hasil_assessment', img:  new URL('@/assets/icons/tes-assesment.svg', import.meta.url).href},
    {name: 'Hasil Test Jatidiri Cerdas', route: 'user.views.hasil_iq', img:  new URL('@/assets/icons/tes-iq.svg', import.meta.url).href},
    // {name: 'Hasil Test CPM', route: 'user.views.hasil_cpm', img:  new URL('@/assets/icons/tes-cpm.svg', import.meta.url).href},
    {name: 'Hasil Test Jatidiri Kendali', route: 'user.views.hasil_gadget', img:  new URL('@/assets/icons/test-iaa.svg', import.meta.url).href},
    {name: 'Hasil Test Jatidiri Bakat', route: 'user.views.deteksi', img:  new URL('@/assets/icons/test-rmib.svg', import.meta.url).href},
    // {name: 'Hasil Test Jatidiri Bahagia', route: 'user.views.hasil_bahagia', img:  new URL('@/assets/icons/tes-tik.svg', import.meta.url).href},
])

const lainyaDatas = ref([
    {name: 'Profile', route: 'user.views.profile', img:  new URL('@/assets/icons/icon-profile.svg', import.meta.url).href},
    {name: 'Keluar', route: null, img:  new URL('@/assets/icons/icon-logout.svg', import.meta.url).href},
])

const handleClick = (type) => {
    showModal.value[type] = true
}

const closeModal = () => {
    // console.log(`diklik`)
    Object.keys(showModal.value).forEach(key => {
        // Jika nilai dari properti adalah true, ubah menjadi false
        if (showModal.value[key]) {
            showModal.value[key] = false;
        }
    });
}
</script>