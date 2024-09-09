<template>
    <Layout>
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test CPM</div>
        </div>
    
        <BelumTest v-if="!isTested" message="Kamu Belum Melakukan Test Assessment!" 
        subMessage="Wah, sayang sekali kamu belum coba Tes Asesment! Yuk, kenali dulu gaya belajarmu lewat Tes Assessment!"/>
    
        <section class="bg-white py-[52px]">
            <div class="mx-[30px] md:mx-[120px] bg-white grid grid-cols-1">
                <div class="max-h-[716px] p-9 bg-[#3030f8] rounded-3xl flex-col justify-center items-center">
                    <div class="flex flex-col items-center gap-9">
                        <div class="flex-col items-center gap-4 flex">
                            <div class="text-center text-white text-2xl font-semibold font-['Sora'] leading-9">Resume Assesment</div>
                            <div class="text-center text-white text-base font-normal font-['Roboto'] leading-normal">Berikut hasil evaluasi dari tes yang telah Kamu kerjakan. Bagian ini memberikan insight mendalam tentang performa pembelajaran yang efektif untuk kamu, serta rekomendasi gaya pembelajaran untuk pengembangan diri.</div>
                        </div>

                        <div class="flex flex-row gap-8">
                            <div class="flex flex-col gap-6">
                                <span class="text-center text-[#f0f7fd] text-2xl font-semibold font-['Sora'] leading-loose">Resume Assesment Kamu</span>
                                <div class="h-full">
                                    <Bar :data="data" :options="options" />
                                </div>
                            </div>

                            <div class="flex-col justify-center items-start gap-9 inline-flex">
                                <div class="flex-col justify-center items-start gap-4 flex">
                                    <div class="p-9 bg-white rounded-2xl justify-center items-center gap-6 inline-flex">
                                        <div class="flex-col justify-start items-start gap-6 inline-flex">
                                            <div class="text-black text-2xl font-medium font-['Roboto'] leading-loose">Rangkuman Tipe Gaya Belajar Kamu:</div>
                                            <div class="w-[100px] h-[5px] bg-[#3030f8] rounded-[5px]"></div>
                                            <div class="w-[498px] text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Kamu memiliki gabungan gaya belajar visual dan auditori.            Ada hal tertentu yang Kamu akan belajar efektif jika menggunakan gaya belajar visual, dan ada hal lain yang Kamu akan belajar efektif jika menggunakan gaya belajar auditori.            Bahkan, kadang jika kedua gaya belajar digunakan, akan lebih optimal.</div>
                                        </div>
                                    </div>
                                </div>
                                <button @click="scrollToSection" class="transition-all hover:translate-x-1 hover:shadow-2xl h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
                                    <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Baca Selengkapnya</div>
                                    <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                                        <div class="w-3 h-3 relative">
                                            <img src="@/assets/icons/arrow-go.svg" alt="go"/>
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
                <div class="text-center text-black text-3xl font-semibold font-['Sora'] leading-9">Berikut Video Penjelasan Mengenai Hasil Assesment Kamu</div>
                
                <div class="mx-auto w-[50%] block mb-[32px]">
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
                            src="https://api.jatidiri.app/additional_assets/chunks/instruksi/instruksi.m3u8"
                            type="application/x-mpegURL">
                    </video>
                </div>
            </div>
        </section>

        <section id="penjelasan" class="bg-white py-[52px]">
            <div class="mx-[30px] md:mx-[120px] bg-white flex flex-col gap-9">
                <div class="flex-col justify-start items-center gap-4 inline-flex">
                    <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                        <div class="text-[#3030f8] text-base font-medium font-['Roboto'] leading-normal">Keterangan</div>
                    </div>
                    <div class="self-stretch text-center text-[#0b0b79] text-3xl font-semibold font-['Sora'] leading-9">Mengenal Berbagai Tipe Gaya Belajar</div>
                    <div class="self-stretch text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tipe gaya belajar Audio, Visual, Kinestetik, dan campuran adalah salah satu model yang paling dikenal dan digunakan dalam memahami preferensi belajar individu. Berikut adalah penjelasan mengenai masing-masing gaya belajar tersebut:</div>
                </div>

                <div class="mb-[20px] flex flex-row justify-center items-center gap-5">
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
                        <div class="self-stretch justify-center items-start gap-6 inline-flex">
                            <div class="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                                <div class="self-stretch text-[#031b4e] text-2xl font-medium font-['Roboto'] leading-loose">
                                    {{ item.title }}
                                </div>
                            </div>
                            <div class="w-[50.66px] h-[50.66px] relative">
                                <div :class="{'bg-[#3030f8]': isOpenArray[index], 'bg-white': !isOpenArray[index]}" class="w-[50.66px] h-[50.66px] flex items-center justify-center rounded-full shadow">
                                    <span :class="{'rotate-90 text-white': isOpenArray[index], 'text-black': !isOpenArray[index]}" class="transition-all duration-150 text-2xl"><PhCaretRight/></span>
                                </div>
                            </div>
                        </div>

                        <transition
                        name="slide-fade"
                        >
                            <div v-if="isOpenArray[index]" v-html="item.content" class="w-[90%]"></div>
                        </transition>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-white py-[46px]">
            <Reservasi/>
        </section>
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

const isTested = ref(true)
const isOpen = ref(false)

const scrollToSection = () => {
  const section = document.getElementById('penjelasan');
  section.scrollIntoView({ behavior: 'smooth' });
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = ref({
    labels: ['Visual', 'Auditori', 'Kinestetk'],
    datasets: [
        { 
            label: 'Grafik Gaya Belajar',
            backgroundColor: ['#9a89ff', '#feaeae', '#a9f4d0'], // Colors for each bar
            borderColor: ['#9a89ff', '#feaeae', '#a9f4d0'], 
            borderWidth: 1,
            data: [70, 20, 10] 
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
    title: 'Maksimalkan Belajar dengan Gaya Auditori',
    content: `<span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Definisi: <br/>Gaya belajar di mana individu belajar paling efektif melalui penglihatan. Mereka lebih mudah memahami dan mengingat informasi yang disajikan dalam bentuk gambar, grafik, diagram, peta, dan media visual lainnya.<br/><br/>Karakteristik:<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Suka membuat catatan dan menggambar peta konsep.<br/>Memiliki ketertarikan pada warna dan tata letak yang menarik.<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal"> <br/>Strategi Belajar:<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Gunakan grafik, diagram, dan peta konsep untuk mengorganisir informasi.<br/>Gunakan penyorot warna-warni pada buku atau catatan untuk membedakan informasi penting.<br/>Tonton video edukatif yang relevan dengan materi pelajaran.<br/>Buat mind map atau peta pikiran untuk menghubungkan konsep-konsep.</span>`,
  },
  {
    title: 'Pembelajaran Aktif melalui Gaya Kinestetik',
    content: `<span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Definisi: <br/>Gaya belajar di mana individu belajar paling efektif melalui penglihatan. Mereka lebih mudah memahami dan mengingat informasi yang disajikan dalam bentuk gambar, grafik, diagram, peta, dan media visual lainnya.<br/><br/>Karakteristik:<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Suka membuat catatan dan menggambar peta konsep.<br/>Memiliki ketertarikan pada warna dan tata letak yang menarik.<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal"> <br/>Strategi Belajar:<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Gunakan grafik, diagram, dan peta konsep untuk mengorganisir informasi.<br/>Gunakan penyorot warna-warni pada buku atau catatan untuk membedakan informasi penting.<br/>Tonton video edukatif yang relevan dengan materi pelajaran.<br/>Buat mind map atau peta pikiran untuk menghubungkan konsep-konsep.</span>`,
  },
  {
    title: 'Kombinasi Optimal dengan Gaya Belajar Campuran',
    content: `<span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Definisi: <br/>Gaya belajar di mana individu belajar paling efektif melalui penglihatan. Mereka lebih mudah memahami dan mengingat informasi yang disajikan dalam bentuk gambar, grafik, diagram, peta, dan media visual lainnya.<br/><br/>Karakteristik:<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Suka membuat catatan dan menggambar peta konsep.<br/>Memiliki ketertarikan pada warna dan tata letak yang menarik.<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal"> <br/>Strategi Belajar:<br/></span><span style="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Gunakan grafik, diagram, dan peta konsep untuk mengorganisir informasi.<br/>Gunakan penyorot warna-warni pada buku atau catatan untuk membedakan informasi penting.<br/>Tonton video edukatif yang relevan dengan materi pelajaran.<br/>Buat mind map atau peta pikiran untuk menghubungkan konsep-konsep.</span>`,
  }
])

const isOpenArray = ref(items.value.map(() => false))

const toggleOpen = (index) => {
  isOpenArray.value[index] = !isOpenArray.value[index]
}

onMounted(() => {
    const videoId = document.getElementById('example-video')
    if(videoId){
        const player = videojs('example-video');
        player.play();
    
        onBeforeUnmount(() => {
            player.dispose()
        })
    }
})
</script>

<style scoped>
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