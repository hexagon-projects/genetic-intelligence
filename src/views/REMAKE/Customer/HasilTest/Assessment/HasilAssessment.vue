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
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Hasil Test Assessment</div>
        </div>
    
        <BelumTest v-if="!isTested" routeUrl="user.views.assesment" message="Kamu Belum Melakukan Test Assessment!" 
        subMessage="Wah, sayang sekali kamu belum coba Tes Asesment! Yuk, kenali dulu gaya belajarmu lewat Tes Assessment!"/>
    
        <div v-if="isTested">
            <section class="bg-white pb-[52px]">
                <div class="mx-[30px] md:mx-[120px] bg-white grid grid-cols-1">
                    <div class="h-auto lg:max-h-[716px] p-9 bg-[#3030f8] rounded-3xl flex-col justify-center items-center">
                        <div class="flex flex-col items-center gap-9">
                            <div class="flex-col items-center gap-4 flex">
                                <div class="text-center text-white text-xl lg:text-2xl font-semibold font-['Sora'] leading-9">Resume Assesment</div>
                                <div class="w-full lg:w-[80%] text-center text-white text-sm lg:text-base font-normal font-['Roboto'] leading-normal">Berikut hasil evaluasi dari tes yang telah Kamu kerjakan. Bagian ini memberikan insight mendalam tentang performa pembelajaran yang efektif untuk kamu, serta rekomendasi gaya pembelajaran untuk pengembangan diri.</div>
                            </div>

                            <div class="flex flex-col lg:flex-row items-center gap-9">
                                <div class="h-[470px] flex flex-col gap-3">
                                    <span class="text-center text-[#f0f7fd] text-xl lg:text-2xl font-semibold font-['Sora'] leading-loose">Resume Assesment Kamu</span>
                                    <div class="h-full">
                                        <Bar :data="data" :options="options" />
                                    </div>
                                </div>

                                <div class="flex-col justify-center items-start gap-9 inline-flex">
                                    <div class="w-full flex-col justify-center items-start gap-4 flex">
                                        <div class="p-9 mx-auto w-[90%] lg:w-full bg-white rounded-2xl justify-center items-center gap-6 inline-flex">
                                            <div class="flex-col justify-start items-start gap-6 inline-flex">
                                                <div class="text-black text-xl lg:text-2xl font-medium font-['Roboto'] leading-loose">Rangkuman Tipe Gaya Belajar Kamu:</div>
                                                <div class="w-[100px] h-[5px] bg-[#3030f8] rounded-[5px]"></div>
                                                <div class="w-full lg:w-[498px] text-[#667084] text-sm lg:text-base font-normal font-['Roboto'] leading-normal flex flex-col">
                                                    <span v-for="(item, index) in dataAssessment.assessment.description" :key="index">
                                                        {{ item }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="scrollToSection" class="mx-auto transition-all hover:translate-x-1 hover:shadow-2xl h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
                                        <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Baca Selengkapnya</div>
                                        <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                                            <div class="w-3 h-3 relative">
                                                <img class="rotate-90" src="@/assets/icons/arrow-go.svg" alt="go"/>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="max-h-[716px] p-9 bg-[#3030f8] rounded-3xl flex-col justify-center items-center gap-9">
                        <div class="flex-col items-center gap-4 flex">
                            <div class="self-stretch text-center text-white text-3xl font-semibold font-['Sora'] leading-9">Resume Assesment</div>
                            <div class="self-stretch text-center text-white text-base font-normal font-['Roboto'] leading-normal">Berikut hasil evaluasi dari tes yang telah Kamu kerjakan. Bagian ini memberikan insight mendalam tentang performa pembelajaran yang efektif untuk kamu, serta rekomendasi gaya pembelajaran untuk pengembangan diri.</div>
                        </div>

                        <div class="mt-[36px] flex flex-row gap-4 items-start">
                            <div class="flex flex-col items-center gap-6">
                                <div class="text-center text-[#f0f7fd] text-2xl font-semibold font-['Sora'] leading-loose">Resume Assesment Kamu</div>
                            </div>

                        </div>
                    </div> -->
                </div>
            </section>

            <section id="video" class="bg-[#f0f7fd] py-[52px]">
                <div class="mx-[30px] md:mx-[60px] flex flex-col gap-[32px]">
                    <span class="w-full lg:w-[60%] mx-auto text-center text-black text-xl lg:text-3xl font-semibold font-['Sora'] leading-9">Berikut Video Penjelasan Mengenai Hasil Assesment Kamu</span>
                    
                    <div class="mx-auto w-full lg:w-[75%] block mb-[32px]">
                        <div class="flex flex-row gap-1 items-center align-middle mb-1">
                            <PhWarningCircle :size="18" color="#e81111"/><small class="text-xs md:text-sm text-danger font-semibold">Video ini eksklusif dan tidak dapat disebarluaskan.</small>
                        </div>
                        <video id="example-video" ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-sea"
                            controls
                            preload="auto"
                            fluid="true"
                            data-setup='{}'
                            >
                            <source
                                :src="dataAssessment.assessment.video"
                                type="application/x-mpegURL">
                        </video>
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

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import Reservasi from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import BelumTest from '@/components/REMAKE/HasilTest/BelumTest/BelumTest.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { PhWarningCircle } from '@phosphor-icons/vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import { PhCaretRight } from '@phosphor-icons/vue';
import Cookies from 'js-cookie';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

const loading = ref(true)
const isTested = ref(true)
const isOpen = ref(false)

const dataAssessment = ref(null)

const scrollToSection = () => {
  const section = document.getElementById('penjelasan');
  section.scrollIntoView({ behavior: 'smooth' });
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const persentaseJawaban = ref([])

const data = ref({
    labels: ['Visual', 'Auditori', 'Kinestetk'],
    datasets: [
        { 
            label: 'Grafik Gaya Belajar',
            backgroundColor: ['#9a89ff', '#feaeae', '#a9f4d0'], // Colors for each bar
            borderColor: ['#9a89ff', '#feaeae', '#a9f4d0'], 
            borderWidth: 1,
            // data: [70, 20, 10] 
            data: persentaseJawaban.value
        }
    ]
})

const options = ref({
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio
    // aspectRatio: 1,
    plugins: {
    legend: {
      display: false // Hide the legend
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw}`;
        }
      },
      bodyColor: '#ffffff',
      titleColor: '#ffffff'
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#ffffff'
      }
    },
    y: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#ffffff'
      }
    }
  }
})

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

const getAssessmentData = async(userId) => {
    try {
        const token = Cookies.get('token')
    
        const response = await initAPI('get', `customers/assessments?customer_id=${userId}`, null, token)
        // console.log(`data assessment`, response.data)
    
        isTested.value = response.data.data.length > 0 ? true : false
        if(response.data.data.length > 0){
            dataAssessment.value = response.data.data[0]
    
            response.data.data[0].total_answer.forEach(element => {
                persentaseJawaban.value.push(element.percentage) 
            });
        }
    } catch (error) {
        // console.log(`error`,error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mengambil data Assessment user',
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
        // console.log(`data hasil`, userData.data)

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

    const videoId = document.getElementById('example-video')
    if(videoId){
        const player = videojs(videoId);
        // player.play();
    
        onBeforeUnmount(() => {
            player.dispose()
        })
    }
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