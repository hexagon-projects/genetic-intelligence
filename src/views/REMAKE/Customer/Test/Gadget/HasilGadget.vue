<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <Layout v-if="!loading">
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Hasil Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Hasil Test IAA</div>
        </div>
        <div class="flex items-center bg-white">
            <img src="@/assets/img/logo-jatidiri-hasi-cpm.png">
            <span class="text-center text-[#0B0B79] font-normal font-['Sora']">Hasil Tes Internet Addiction Assessment</span>
        </div>

        <BelumTest v-if="!isTested" routeUrl="user.views.gadget" message="Kamu Belum Melakukan Test Assessment!" 
        subMessage="Wah, sayang sekali kamu belum coba Tes Asesment! Yuk, kenali dulu gaya belajarmu lewat Tes Assessment!"/>

        <div v-if="isTested">
            <section class="flex flex-col items-center gap-14 w-[1216px]">
            <!-- Gambar -->
                <div class="flex justify-center">
                   <img src="@/assets/img/logo-jatidiri-hasi-cpm.png" alt="Internet Addiction Assessment" class="w-[200px] h-[158.54px]" />
                </div>
                <!-- Tulisan Hasil Tes -->
                <div class="w-full text-[#0B0B79] text-2xl font-semibold text-center font-['Sora'] leading-[32px]">Hasil Tes Internet Addiction Assessment

                </div>
                <!-- Jarak antar elemen -->
                <div class="flex flex-col items-center gap-14 w-[1216px]">
                    <!-- Box dengan Konten -->
                        <div class="flex justify-center items-center gap-6 p-6 rounded-lg bg-[#3030F8]">
                            <!-- Icon sebagai Gambar -->
                            <div class="flex justify-center">
                                <img src="@assets/icons/reshot-icon-search-results.svg" alt="Icon" class="w-[100px] h-[100px]" />
                            </div>
                            <!-- Tulisan Penggunaan Normal -->
                            <div class="w-full text-[#FFF] text-2xl font-semibold font-['Roboto'] leading-[32px]">Penggunaan Normal</div>
                            <!-- Tulisan Deskripsi -->
                            <p class="w-full text-[#FFF] text-base font-normal font-['Roboto'] leading-[24px]">Kamu punya kontrol yang baik atas penggunaan internet dan jarang mengalami masalah karena waktu yang dihabiskan online.</p>
                        </div>
                    </div>
            </section>

            <section id="penjelasan" class="bg-white py-[52px]">
                <div class="mx-[30px] md:mx-[120px] bg-white flex flex-col gap-9">
                    <div class="flex-col justify-start items-center gap-4 inline-flex">
                        <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                            <div class="text-[#3030f8] text-sm lg:text-base font-medium font-['Roboto'] leading-normal">Keterangan</div>
                        </div>
                        <div class="self-stretch text-center text-[#0b0b79] text-xl lg:text-3xl font-semibold font-['Sora'] leading-9">Mengenal Berbagai Tipe Gaya Belajar</div>
                        <div class="self-stretch text-center text-[#667084] text-sm lg:text-base font-normal font-['Roboto'] leading-normal">Tipe gaya belajar Audio, Visual, Kinestetik, dan campuran adalah salah satu model yang paling dikenal dan digunakan dalam memahami preferensi belajar individu. Berikut adalah penjelasan mengenai masing-masing gaya belajar tersebut:</div>
                    </div>

                    <div class="mb-[20px] pb-2 md:pb-0 flex flex-row justify-start overflow-x-scroll lg:overflow-x-auto lg:justify-center items-center gap-5">
                        <div class="w-[270px] h-[220px] px-[57px] py-4 bg-[#acacfc] rounded-3xl shadow justify-center items-center inline-flex">
                            <div class="flex flex-col items-center gap-2">
                                <img src="@/assets/icons/icon-visual.svg" alt="visual">
                                <span class="text-white text-base font-medium font-['Roboto'] leading-normal">Visual</span>
                            </div>
                        </div>

                        <div class="w-[270px] h-[220px] px-[57px] py-4 bg-[#8383FB] rounded-3xl shadow justify-center items-center inline-flex">
                            <div class="flex flex-col items-center gap-2">
                                <img src="@/assets/icons/icon-auditori.svg" alt="auditori">
                                <span class="text-white text-base font-medium font-['Roboto'] leading-normal">Auditori</span>
                            </div>
                        </div>

                        <div class="w-[270px] h-[220px] px-[57px] py-4 bg-[#5959F9] rounded-3xl shadow justify-center items-center inline-flex">
                            <div class="flex flex-col items-center gap-2">
                                <img src="@/assets/icons/icon-kinestetik.svg" alt="kinestetik">
                                <span class="text-white text-base font-medium font-['Roboto'] leading-normal">Kinestetik</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-6">
                        <div v-for="(item, index) in items" :key="index"  @click="toggleOpen(index)"
                        :class="{'border-[#3030f8]': isOpenArray[index]}" 
                        class="transition-all duration-500 ease-in-out cursor-pointer h-auto p-9 bg-white rounded-3xl border shadow-md flex-col justify-start items-start gap-2.5 inline-flex">
                            <div class="self-stretch justify-center items-center gap-6 inline-flex">
                                <div class="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                                    <div class="self-stretch text-[#031b4e] text-base lg:text-2xl font-medium font-['Roboto'] leading-loose">
                                        {{ item.title }}
                                    </div>
                                </div>
                                <div class="w-[50.66px] h-[50.66px] relative">
                                    <div :class="{'bg-[#3030f8]': isOpenArray[index], 'bg-white': !isOpenArray[index]}" class="w-[50.66px] h-[50.66px] flex items-center justify-center rounded-full shadow">
                                        <span :class="{'rotate-90 text-white': isOpenArray[index], 'text-black': !isOpenArray[index]}" class="transition-all duration-150 text-xl lg:text-2xl"><PhCaretRight/></span>
                                    </div>
                                </div>
                            </div>

                            <transition
                            name="slide-fade"
                            >
                                <div v-if="isOpenArray[index]" v-html="item.content" class="w-[90%] text-xs lg:text-base"></div>
                            </transition>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-white py-[46px]">
                <Reservasi/>
            </section>
        </div>
    </Layout>
</template>
<script>
import Layout from '@/Layout/Customer/Layout.vue';
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import BelumTest from '@/views/REMAKE/Customer/Test/Gadget/BelumTest.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import { PhCaretRight } from '@phosphor-icons/vue';
import Cookies from 'js-cookie';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const loading = ref(true)
const isTested = ref(true)
const isOpen = ref(false)

const dataAssessment = ref(null)
const items = ref([
  {
    title: 'Pengunaan Normal',
    content: `<span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Definisi: <br/>Kamu punya kontrol yang baik atas penggunaan internet dan jarang mengalami masalah karena waktu yang dihabiskan online<br/></span>`,
  },
  {
    title: 'Cenderung Kecanduan',
    content: `<span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Definisi: <br/>Kamu mulai menunjuk tanda-tanda bahwa penggunaan internet mungkin sudah terlalu banyak dan mengganggu aktivitas seperti sekolah atau hubungan dengan orang lain.<br/></span>`,
  },
  {
    title: 'Kecanduan Serius',
    content: `<span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Definisi: <br/>Penggunaan internet sudah terlalu banyak dan mulai menyebabkan masalah besar dalam hidupmu. Perlu ada tindakan untuk mengurangi ketergantungan ini.<br/></span>`,
  },
])
const getAssessmentData = async(userId) => {
    try {
        const token = Cookies.get('token')
    
        const response = await initAPI('get', `customers/iaa?customer_id=${userId}`, null, token)
        console.log(`data iaa`, response.data)
    
        isTested.value = response.data.data.length > 0 ? true : false
        if(response.data.data.length > 0){
            dataAssessment.value = response.data.data[0]
    
            response.data.data[0].total_answer.forEach(element => {
                persentaseJawaban.value.push(element.percentage) 
            });
        }
    } catch (error) {
        console.log(`error`,error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mengambil data IAA user',
            showConfirmButton: false,
            timer: 2000
        });
    }
}

const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const userData = await initAPI('post', 'login', formData, token)
        console.log(`data hasil`, userData.data)

        await getAssessmentData(userData.data.customer.id)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mengambil data user',
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        loading.value = false
    }
}


onMounted(async() => {
    await getUserData()
})
</script>