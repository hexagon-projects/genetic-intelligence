<template>
    <div class="relative w-full lg:w-[63%] top-5 mx-auto shadow-xl rounded-3xl bg-white p-[36px]">
        <div class="flex flex-col gap-[24px]">
            
            <div class="flex flex-col gap-[23px] items-center">
                <div class="w-[140px] h-[140px] relative">
                    <img src="" alt="icon">
                </div>
                <span class="text-center text-[#170f49] text-3xl font-semibold font-['Sora'] leading-9">Intruksi Pengerjaan Tes RMIB</span>
            </div>

            <div class="flex flex-col items-start gap-[12px]">
                <span class="text-[#6e6b8f] text-base font-normal font-['Roboto'] leading-normal">
                    Terdapat berbagai macam pekerjaan yang tersusun dalam beberapa kelompok. Setiap kelompok terdiri dari 12 jenis pekerjaan. Setiap pekerjaan merupakan keahlian khusus yang memerlukan latihan atau pendidikan keahlian tersendiri.
                </span>
                <span class="text-[#6e6b8f] text-base font-normal font-['Roboto'] leading-normal">
                    Pilih pekerjaan dari setiap kelompok yang Kamu sukai, beri nomor 1 untuk yang paling disukai, diikuti 2, 3, dan seterusnya, serta nomor 12 untuk yang paling tidak disukai.
                </span>
                <span class="text-[#6e6b8f] text-base font-normal font-['Roboto'] leading-normal">
                    Bekerjalah secepatnya, dan tuliskan nomor nomor sesuai dengan kesan dan keinginan Kamu yang pertama muncul.
                </span>
            </div>

            <div class="flex justify-center items-center">
                <button class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full flex justify-center items-center gap-3">
                    <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Mulai Tes</div>
                        <div class="w-6 h-6 relative">
                            <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                        </div>
                </button>
            </div>  
        </div>
    </div>
</template>

<script setup>
// import { ref } from 'vue';
// import { RouterLink } from 'vue-router';

// const isChecked = ref(false)

// const emit = defineEmits(['toggleKebijakanPrivasi'])

// const confirmButton = () => {
//     if (isChecked.value) {
//         emit('toggleKebijakanPrivasi')
//         localStorage.setItem('isKebijakanPrivasi', 'Ya')
//     }
// }
</script>