<template>
    <div v-if="loading" class="preloader-overlay">
        <span
            class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-if="dataProfileInclomplete">
        <modalCekProfile />
    </div>

    <Layout v-if="!loading">
        <!-- Breadcrumb -->
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Starter Pack</div>
        </div>

        <section class="bg-white pb-[52px]">
            <div class="mx-[30px] md:mx-[312px] bg-white flex flex-row items-center justify-center">
                <div class="flex flex-col items-center gap-[56px]">
                    <div class="flex flex-col items-center gap-[27px]">
                        <span class="text-[#3030f8] text-base lg:text-lg font-bold font-['Roboto'] leading-7">STARTER
                            PACK</span>

                        <div class="flex flex-col items-center gap-[14px]">
                            <h1
                                class="text-center text-[#170f49] text-2xl lg:text-4xl font-bold font-roboto leading-[62px]">
                                Solusi Instan untuk Eksplorasi Diri
                            </h1>
                            <span
                                class="text-center text-[#6e6b8f] text-sm lg:text-base font-normal font-['Roboto'] leading-normal">Dapatkan
                                akses ke semua tes dengan satu kali pembayaran dan mulai jelajahi potensi diri kamu
                                sekarang juga.</span>
                        </div>
                    </div>

                    <div v-if="!isPaymentStatus"
                        class="shadow-sm grid grid-cols-1 md:grid-cols-2 bg-[#f7f7fc] rounded-[20px] p-1">
                        <div
                            class="bg-white rounded-tl-[16px] rounded-tr-[16px] lg:rounded-tr-none lg:rounded-s-[16px] px-14 py-[74px]">
                            <div class="flex flex-col gap-[24px]">
                                <div class="flex flex-col gap-[18px]">
                                    <div class="flex items-center gap-3">
                                        <img class="w-14 h-14" src="@/assets/icons/starter_pack/pack.svg" alt="icon">
                                        <h1 class="text-[#170f49] text-2xl font-bold font-['Roboto'] leading-normal">
                                            Starter Pack {{ userData.institutions.type }}
                                        </h1>
                                    </div>

                                    <span
                                        class="w-[287px] text-[#6e6b8f] text-base font-normal font-roboto leading-[30px]">Mulai
                                        Sekarang dan Hemat Lebih Banyak! Hanya :</span>
                                </div>

                                <h1 class="text-[#170f49] text-5xl font-bold font-['Roboto'] leading-[48px]">
                                    {{ hargaTest ? hargaTest : '-' }}
                                </h1>

                                <div>
                                    <RouterLink :to="{ path: '/pembayaran/starter-pack' }"
                                        class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                                        <div class="text-white text-base font-normal font-['Roboto'] leading-normal">
                                            Beli Sekarang</div>
                                        <div class="w-6 h-6 relative">
                                            <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                                        </div>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>

                        <!-- Section 2 -->
                        <div class="flex flex-col justify-center rounded-s-[16px] px-14 py-[74px]">
                            <div class="flex flex-col justify-center gap-[24px]">
                                <div class="flex flex-col gap-[24px]">
                                    <h1 class="text-[#170f49] text-lg font-bold font-roboto leading-tight">What’s
                                        included</h1>

                                    <div class="flex flex-col gap-[16px]">
                                        <div v-for="(item, index) in testLists" :key="index"
                                            class="w-full flex items-center gap-2">
                                            <img src="@/assets/icons/starter_pack/check_circle.svg" alt="icon">
                                            <span
                                                class="text-[#170f49] text-base font-normal font-roboto leading-tight">
                                                {{ item.name }}
                                            </span>
                                        </div>

                                        <div class="w-full flex items-center gap-2">
                                            <img src="@/assets/icons/starter_pack/check_circle.svg" alt="icon">
                                            <span
                                                class="text-[#170f49] text-base font-normal font-roboto leading-tight">
                                                {{ testByTypeSekolah }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sudah Bayar Starter Pack -->
                    <div v-if="isPaymentStatus"
                        class="shadow-sm w-[789px] grid grid-cols-1 md:grid-cols-2 bg-[#f7f7fc] rounded-[20px] p-1">
                        <div
                            class="bg-white rounded-tl-[16px] rounded-tr-[16px] lg:rounded-tr-none lg:rounded-s-[16px] px-14 py-[74px]">
                            <div class="flex flex-col gap-[24px]">
                                <div class="flex flex-col gap-[18px]">
                                    <div class="flex items-center gap-3">
                                        <img class="w-14 h-14" src="@/assets/icons/starter_pack/pack.svg" alt="icon">
                                        <h1 class="text-[#170f49] text-2xl font-bold font-['Roboto'] leading-normal">
                                            Starter Pack Kamu Telah Aktif!</h1>
                                    </div>

                                    <div
                                        class="w-[307px] text-[#6e6b8f] text-base font-normal font-['Roboto'] leading-normal">
                                        Selamat! Kamu sekarang memiliki akses penuh ke semua tes. Jelajahi tes yang
                                        tersedia dan mulai perjalananmu untuk mengenal dirimu lebih baik!
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Section 2 -->
                        <div class="flex flex-col justify-center rounded-s-[16px] px-14 py-[74px]">
                            <div class="flex flex-col justify-center gap-[24px]">
                                <div class="flex flex-col gap-[24px]">
                                    <h1 class="text-[#170f49] text-lg font-bold font-roboto leading-tight">
                                        Tes yang Termasuk dalam Paket :
                                    </h1>

                                    <div class="flex flex-col gap-[16px]">
                                        <div class="flex">
                                            <RouterLink :to="{ name: 'user.views.deteksi' }"
                                                class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-2 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                                                <div
                                                    class="text-white text-base font-normal font-['Roboto'] leading-normal">
                                                    Mulai Tes GIM
                                                </div>
                                                <div
                                                    class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                                                    <div class="w-3 h-3 relative">
                                                        <img src="@/assets/icons/arrow-go-biru.svg" alt="icon">
                                                    </div>
                                                </div>
                                            </RouterLink>
                                        </div>

                                        <div class="flex">
                                            <RouterLink :to="{ name: 'user.views.assesment' }"
                                                class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-2 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                                                <div
                                                    class="text-white text-base font-normal font-['Roboto'] leading-normal">
                                                    Mulai Tes Assessment
                                                </div>
                                                <div
                                                    class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                                                    <div class="w-3 h-3 relative">
                                                        <img src="@/assets/icons/arrow-go-biru.svg" alt="icon">
                                                    </div>
                                                </div>
                                            </RouterLink>
                                        </div>

                                        <div class="flex">
                                            <RouterLink :to="{ name: 'user.views.cpm' }"
                                                class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-2 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                                                <div
                                                    class="text-white text-base font-normal font-['Roboto'] leading-normal">
                                                    Mulai Tes CPM
                                                </div>
                                                <div
                                                    class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                                                    <div class="w-3 h-3 relative">
                                                        <img src="@/assets/icons/arrow-go-biru.svg" alt="icon">
                                                    </div>
                                                </div>
                                            </RouterLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-white py-[66px] lg:py-[46px]">
            <Reservasi />
        </section>
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue'
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import initAPI from '@/api/api';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import cekDataProfile from '@/components/cekProfile';
import modalCekProfile from '@/components/modalCekProfile/modalCekProfile.vue';

const dataProfileInclomplete = cekDataProfile()

const loading = ref(true)

const isPaymentStatus = ref('')

const hargaTest = ref('')
const userData = ref('')
const testByTypeSekolah = ref('')

const testLists = ref([
    { name: 'Genetic Intelligence Mapping' },
    { name: 'Tes Assessment' },
])

const getHarga = async () => {
    try {
        const response = await initAPI('get', 'test/payment?type=starter-pack', null, null)
        hargaTest.value = response.data.price
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat mengambil data harga.',
            showConfirmButton: false,
            timer: 2500
        });
    }
}

const getUserData = async () => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')

        const response = await initAPI('post', 'login', formData, token)
        userData.value = response.data.customer
        isPaymentStatus.value = response.data.customer.is_starter_pack == 'Ya' ? true : false

        if (response.data.customer.institutions !== null) {
            testByTypeSekolah.value = response.data.customer.institutions.type !== 'TK' || response.data.customer.institutions.type !== 'SD'
                ? 'Tes IQ' : 'Tes Colored Progressive Matrices'
        }
    } catch (error) {
        // console.log(`error ie`, error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat mengambil data user.',
            showConfirmButton: false,
            timer: 2500
        });
    }
}

onMounted(async () => {
    await Promise.all([
        getHarga(),
        getUserData()
    ]);

    loading.value = false
})
</script>

<style scoped>
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, height 0.5s ease;
}

.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}
</style>