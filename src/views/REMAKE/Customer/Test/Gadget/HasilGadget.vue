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

        <BelumTest v-if="!isTested" routeUrl="user.views.test_gadget" message="Kamu Belum Melakukan Test Kecanduan Gadget!" 
        subMessage="Wah, sayang sekali kamu belum coba Tes Kecanduan Gadget! Yuk, lakukan tes sekarang juga!"/>

        <div v-if="isTested" >
          <section class=" md:w-[1000px] h-auto mx-auto p-9 bg-white rounded-3xl shadow flex flex-col gap-14 items-center">
            <div class="flex flex-col items-center gap-14 md:w-[1000px]">
              <div class="flex flex-col items-center gap-2 self-stretch justify-center ">
                  <div class="md:w-[200px] md:h-[158.54px] mx-auto">
                      <img src="@/assets/img/logo-jatidiri-hasi-cpm.png">
                  </div>
                  <section class="flex flex-col items-center gap-14 md:w-[1000px]">
                    <span class="w-full text-[#0B0B79] text-2xl font-semibold text-center font-['Sora'] leading-[32px]">Hasil Tes Internet Addiction Assessment</span>
                      <div class=" box-border md:box-content flex flex-col justify-center gap-6 px-6 py-6 rounded-2xl bg-[#3030F8] w-auto shadow-lg self-stretch self-center">
                          <div class="flex justify-between items-center gap-6 leading-[24px] ">
                              <div class="w-[100px] h-[100px] flex mx-auto justify-center items-center">
                                  <img src="@/assets/icons/reshot-icon-search-results.svg">
                              </div>
                              <div class="flex flex-col flex-[1 0 0] items-start gap-4 w-full">
                                <span class=" text-[#FFF] text-base font-normal font-['Roboto'] font-semibold self-stretch leading-8 not-italic">Coba
                                  {{ category }}
                              </span>
                              <span class=" text-[#FFF] text-base font-normal font-['Roboto'] leading-6 mt-2 not-italic">Coba lagi
                                  {{ description }}
                              </span>
                              </div>
                          </div>
                      </div> 
                  </section>
              </div>
            </div>
              
          </section>


          <section class="bg-white py-[46px]">
              <Reservasi/>
          </section>
      </div>
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import BelumTest from '@/components/REMAKE/HasilTest/BelumTest/BelumTest.vue';
//import HasilTest from '@/views/REMAKE/Customer/Test/Gadget/HasilTest';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Cookies from 'js-cookie';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useRoute } from 'vue-router';

const route = useRoute();
const category = route.query.category || 'Tidak Diketahui'; // Ambil kategori dari query parameter
const description = route.query.description || ''; // Ambil deskripsi dari query parameter
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

const loading = ref(true)
const isTested = ref(true)

const dataIaa = ref(null)

const scrollToSection = () => {
  const section = document.getElementById('penjelasan');
  section.scrollIntoView({ behavior: 'smooth' });
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const items = ref([
  {
    title: 'Maksimalkan Belajar dengan Gaya Visual',
    content: `<span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Definisi: <br/>Gaya belajar di mana individu belajar paling efektif melalui penglihatan. Mereka lebih mudah memahami dan mengingat informasi yang disajikan dalam bentuk gambar, grafik, diagram, peta, dan media visual lainnya.<br/><br/>Karakteristik:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Suka membuat catatan dan menggambar peta konsep.<br/>Memiliki ketertarikan pada warna dan tata letak yang menarik.<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal"> <br/>Strategi Belajar:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Gunakan grafik, diagram, dan peta konsep untuk mengorganisir informasi.<br/>Gunakan penyorot warna-warni pada buku atau catatan untuk membedakan informasi penting.<br/>Tonton video edukatif yang relevan dengan materi pelajaran.<br/>Buat mind map atau peta pikiran untuk menghubungkan konsep-konsep.</span>`,
  },
  {
    title: 'Maksimalkan Belajar dengan Gaya Auditori',
    content: `<span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Definisi: <br/>Gaya belajar di mana individu belajar paling efektif melalui pendengaran. Mereka lebih mudah mengingat informasi yang didengar melalui ceramah, diskusi, dan rekaman audio.<br/><br/>Karakteristik:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Suka mendengarkan penjelasan daripada membaca teks.<br/>Mampu mengingat detail percakapan dan suara.<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal"> <br/>Strategi Belajar:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Dengarkan rekaman ceramah atau podcast tentang topik yang sedang dipelajari.<br/>Ikuti diskusi kelompok atau belajar dengan teman untuk berdiskusi tentang materi.<br/>Baca materi pelajaran dengan suara keras.<br/>Gunakan teknik mnemonik auditori seperti rima atau lagu untuk menghafal informasi.</span>`,
  },
  {
    title: 'Pembelajaran Aktif melalui Gaya Kinestetik',
    content: `<span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Definisi: <br/>Gaya belajar di mana individu belajar paling efektif melalui gerakan dan pengalaman fisik. Mereka lebih mudah memahami dan mengingat informasi ketika terlibat dalam aktivitas fisik atau praktis.<br/><br/>Karakteristik:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Suka belajar dengan melakukan dan menyentuh objek.<br/>Memiliki kesulitan duduk diam untuk waktu yang lama.<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal"> <br/>Strategi Belajar:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Gunakan alat bantu fisik atau model saat belajar konsep baru.<br/>Terlibat dalam eksperimen atau proyek praktis yang relevan dengan materi pelajaran.<br/>Gunakan permainan peran atau simulasi untuk memahami konsep.<br/>Beristirahat secara teratur untuk bergerak dan melepaskan energi.</span>`,
  },
  {
    title: 'Kombinasi Optimal dengan Gaya Belajar Campuran',
    content: `<span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Definisi: <br/> Gaya belajar di mana individu memiliki kombinasi dari dua atau lebih gaya belajar (visual, auditori, kinestetik, dan membaca/menulis). Mereka dapat menyesuaikan strategi belajar berdasarkan situasi dan materi pelajaran.<br/><br/>Karakteristik:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Fleksibel dalam pendekatan belajar dan dapat menyesuaikan strategi berdasarkan situasi dan materi pelajaran.<br/>Dapat menggabungkan berbagai teknik belajar untuk meningkatkan pemahaman dan retensi informasi.<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal"> <br/>Strategi Belajar:<br/></span><span class="text-[#667084]  font-normal font-['Roboto'] leading-normal">Gabungkan berbagai metode belajar yang sesuai dengan gaya belajar dominan. Misalnya, baca catatan (visual), diskusikan dengan teman (auditori), dan lakukan eksperimen (kinestetik).<br/>Gunakan alat bantu visual saat mendengarkan penjelasan audio.<br/>Buat catatan dan kemudian bacakan dengan suara keras sambil bergerak.<br/>Ikuti kelas yang menawarkan berbagai metode pengajaran, seperti kuliah interaktif yang mencakup diskusi, presentasi visual, dan aktivitas praktis.</span>`,
  }
])

const isOpenArray = ref(items.value.map(() => false))

const toggleOpen = (index) => {
  isOpenArray.value[index] = !isOpenArray.value[index]
}

const getIaaData = async(userId) => {
    try {
        const token = Cookies.get('token')
    
        const response = await initAPI('get', `customers/iaa?customer_id=${userId}`, null, token)
        console.log(`data iaa`, response.data)
    
        isTested.value = response.data.data.length > 0 ? true : false
        if(response.data.data.length > 0){
            dataIaa.value = response.data.data[0]
    
            response.data.data[0].total_answer.forEach(element => {
                persentaseJawaban.value.push(element.percentage) 
            });
        }
    } catch (error) {
        console.log(`error`,error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mengambil data iaa user',
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

        await getIaaData(userData.data.customer.id)
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

/* Transition for fade and slide effect */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}

/* Mengatur elemen saat mulai masuk dan menghilang */
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px); /* Efek geser saat elemen muncul dan menghilang */
}

/* Mengatur elemen saat masuk ke posisi akhir */
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0); /* Posisi akhir elemen */
}
</style>