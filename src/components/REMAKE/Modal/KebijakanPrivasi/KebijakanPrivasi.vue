<template>
    <div class="relative w-full lg:w-[63%] top-5 mx-auto shadow-xl rounded-3xl bg-white p-[36px]">
        <div class="flex flex-col gap-[24px]">
            
            <div class="flex flex-col gap-[23px] items-center">
                <div class="w-[140px] h-[140px] relative">
                    <img src="@/assets/icons/kebijakan_privasi.svg" alt="icon">
                </div>
                <span class="text-center text-[#170f49] text-3xl font-semibold font-['Sora'] leading-9">Kebijakan Privasi</span>
            </div>

            <div class="flex flex-col items-start gap-[12px]">
                <span class="text-[#6e6b8f] text-base font-normal font-['Roboto'] leading-normal">
                    Sebelum Anda melanjutkan untuk menggunakan layanan kami, kami meminta Anda untuk membaca dan menyetujui Syarat dan Ketentuan serta Kebijakan Privasi kami.
                </span>
                <span class="text-[#6e6b8f] text-base font-normal font-['Roboto'] leading-normal">
                    Dengan menggunakan aplikasi kami, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan yang berlaku serta memberikan persetujuan atas pengumpulan dan penggunaan data Anda sesuai dengan Kebijakan Privasi kami.
                </span>
                <span class="text-[#6e6b8f] text-base font-normal font-['Roboto'] leading-normal">
                    Kami akan melindungi privasi dan keamanan informasi Anda dengan sungguh-sungguh.
                </span>
            </div>

            <div class="flex items-center gap-1">
                <input type="checkbox" id="setuju" v-model="isChecked">
                <label for="setuju" class="text-black text-base font-normal font-['Roboto'] leading-normal">
                    Jika anda menyetujui persyaratan diatas silahkan centang tombol ini
                </label>
            </div>

            <div class="flex justify-between items-center">
                <RouterLink :to="{name: 'views.dashboard'}" class="hover:shadow-2xl hover:-translate-x-1 transition-all h-11 pl-4 pr-6 py-1.5 rounded-full border border-[#3030f8] justify-center items-center gap-3 inline-flex">
                    <div class="w-6 h-6 relative">
                        <img src="@/assets/icons/test_gim/chevron_left.svg" alt="icon">
                    </div>
                    <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Kembali</div>
                </RouterLink>

                <button @click="confirmButton" 
                    :class="{'bg-opacity-50 cursor-not-allowed': !isChecked, 'hover:translate-x-1 hover:shadow-2xl bg-opacity-100': isChecked}"
                    class="transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                    <div class="text-white text-base font-normal font-['Roboto'] leading-normal">
                        Selanjutnya
                    </div>
                    <div class="w-6 h-6 relative">
                        <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                    </div>
                </button>
            </div>  
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isChecked = ref(false)

const emit = defineEmits(['toggleKebijakanPrivasi'])

const confirmButton = () => {
    if (isChecked.value) {
        emit('toggleKebijakanPrivasi')
        localStorage.setItem('isKebijakanPrivasi', 'Ya')
    }
}

</script>