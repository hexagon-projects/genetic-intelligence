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
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Hasil Test IQ</div>
        </div>
    
        <BelumTest v-if="!isTested" routeUrl="user.views.iq" message="Kamu Belum Melakukan Test IQ!" 
        subMessage="Wah, sayang sekali kamu belum coba Tes IQ! Yuk, kenali dulu score IQ mu lewat Test IQ!"/>

        <div v-if="isTested">
            <section class="bg-white pb-[52px]">
                <div class="mx-[30px] md:mx-[120px] bg-white flex flex-col lg:flex-row items-center justify-center gap-[98px]">
                    <div class="flex flex-col items-center gap-4">
                        <div class="h-8 px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                            <div class="text-[#3030f8] text-base font-medium font-['Roboto'] leading-normal">Skor IQ</div>
                        </div>
    
                        <img v-if="imageIQIcon" class="w-[240px] md:w-[340px] lg:w-[240px]" :src="baseUrl+'open/iq-icons/'+imageIQIcon" alt="grade">
                    </div>
    
                    <div class="w-auto h-auto lg:w-[498px] lg:h-[265px] flex-col justify-start items-start gap-6 inline-flex">
                        <div class="self-stretch text-black text-3xl font-semibold font-['Sora'] leading-9">Hasil IQ (Intelligence Quotient) Kamu!</div>
                        <div class="w-[100px] h-[8px] bg-[#3030f8] rounded-[5px]"></div>
                        <div class="self-stretch">
                            <p class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
                                Kamu telah selesai melakukan Test IQ dan mendapatkan hasil IQ sebesar 
                                <span class="text-[#3030f8] font-medium">{{ dataIQ.customer_iq }}</span> 
                                Yang dimana score IQ tersebut tergolong kategori 
                                <span class="text-[#3030f8] font-medium">{{ dataIQ.iq.category }}</span>
                            </p>
                        </div>
    
                        <button @click="scrollToSection" class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-2 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                            <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Baca Selengkapnya</div>
                            <div class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                                <div class="w-3 h-3 relative">
                                    <img class="rotate-90" src="@/assets/icons/arrow-go-biru.svg" alt="go">
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
    
            <!-- <section id="video" class="bg-[#f0f7fd] py-[52px]">
                <div class="mx-[30px] md:mx-[60px] flex flex-col gap-[32px]">
                    <span class="w-full lg:w-[70%] mx-auto text-center text-black text-xl lg:text-3xl font-semibold font-['Sora'] leading-9">Berikut Video Penjelasan Mengenai Hasil IQ Kamu</span>
                    
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
                                src="https://api.jatidiri.app/additional_assets/chunks/instruksi/instruksi.m3u8"
                                type="application/x-mpegURL">
                        </video>
                    </div>
                </div>
            </section> -->
    
            <section id="penjelasan" class="bg-white py-[52px]">
                <div class="mx-[30px] md:mx-[120px] bg-white flex flex-col gap-9">
                    <div class="flex-col justify-start items-center gap-4 inline-flex">
                        <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                            <div class="text-[#3030f8] text-sm lg:text-base font-medium font-['Roboto'] leading-normal">Keterangan</div>
                        </div>
                        <div class="self-stretch text-center text-[#0b0b79] text-xl lg:text-3xl font-semibold font-['Sora'] leading-9">Klasifikasi skor IQ</div>
                        <div class="self-stretch text-center text-[#667084] text-sm lg:text-base font-normal font-['Roboto'] leading-normal">
                            Batas umum skor IQ adalah klasifikasi standar yang digunakan untuk mengkategorikan tingkat kecerdasan seseorang berdasarkan hasil tes IQ. Berikut adalah penjelasan lebih rinci tentang berbagai kategori tersebut:
                        </div>
                    </div>
    
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div v-for="(item, index) in classificationIQ" :key="index" 
                        :class="{'bg-[#f0f7fd]': index % 2 === 0, 'bg-white border': index % 2 !== 0}" class="lg:hover:-translate-y-2 transition-all duration-300 h-auto p-5 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                            <div class="w-full flex-col justify-start items-start gap-5 flex">
                                <div class="w-full flex items-center gap-[24px]">
                                    <img class="w-[54px] h-[54px]" :src="item.icon" alt="icon">
                                    <div v-html="item.header" class="font-sora leading-normal">
                                    </div>
                                </div>
                                <div class="w-auto text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
                                    {{ item.content }}
                                </div>
                            </div>
                        </div>
    
                        <div class="h-auto p-5 bg-[#3030f8] rounded-3xl flex-col justify-center items-center gap-3 inline-flex">
                            <div class="-mt-4 self-stretch justify-start items-center gap-4 inline-flex">
                                <div class="w-6 h-6 relative">
                                    <img src="@/assets/icons/hugeicons_note.png" alt="icon">
                                </div>
                                <div class="text-white text-2xl font-medium font-['Roboto'] leading-loose">Catatan</div>
                            </div>
                            <div class="flex-col justify-start items-start gap-5 flex">
                                <div class="w-auto text-white text-base font-normal font-['Roboto'] leading-normal">
                                    <ol class="list-decimal list-outside pl-5 text-base font-normal space-y-2">
        <li class="pl-3">IQ biasanya mengikuti distribusi normal (kurva lonceng), dengan sebagian besar populasi memiliki IQ sekitar rata-rata (100).</li>
        <li class="pl-3">Banyak faktor yang dapat mempengaruhi IQ, termasuk lingkungan, pendidikan, dan genetik.</li>
        <li class="pl-3">IQ adalah salah satu ukuran kecerdasan, tetapi tidak mencakup aspek-aspek lain seperti kreativitas, keterampilan sosial, atau kecerdasan emosional.</li>
      </ol>
                                </div>
                            </div>
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
import { onMounted, ref, onBeforeUnmount } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import Cookies from 'js-cookie';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const baseUrl = import.meta.env.VITE_API_BASE_URL
const imageIQIcon = ref(null)

const scrollToSection = () => {
  const section = document.getElementById('penjelasan');
  section.scrollIntoView({ behavior: 'smooth' });
};

const classificationIQ = ref([
    {
        icon: new URL('@/assets/icons/iq/Superior.svg', import.meta.url).href,
        header: '<div class="w-full"><span class="text-[#141414] text-xl font-medium">Kategori Baik Sekali </span><span class="text-[#141414] text-xl font-normal">(Superior)</span></div>',
        content: 'IQ di atas 119 termasuk dalam kategori "Baik Sekali" atau disebut "Superior." Orang yang masuk dalam kategori ini memiliki kemampuan intelektual yang sangat tinggi dibandingkan populasi umum. Mereka cenderung mudah memahami informasi yang kompleks, berpikir secara analitis, dan mampu memecahkan masalah dengan cepat. Biasanya, mereka dapat unggul di berbagai bidang akademis dan profesional yang memerlukan tingkat pemikiran kritis yang tinggi.'
    },
    {
        icon: new URL('@/assets/icons/iq/Bright_Normal.svg', import.meta.url).href,
        header: '<div class="w-full"><span class="text-[#141414] text-xl font-medium">Kategori Baik </span><span class="text-[#141414] text-xl font-normal">(Bright Normal)</span></div>',
        content: 'Rentang IQ 111-119 diklasifikasikan sebagai "Baik" atau "Bright Normal." Mereka dalam kategori ini memiliki kemampuan intelektual yang di atas rata-rata. Orang-orang dalam kelompok ini biasanya tidak mengalami kesulitan dalam pembelajaran akademis, dan mereka sering dianggap cepat tanggap dalam memahami konsep yang agak kompleks.'
    },
    {
        icon: new URL('@/assets/icons/iq/Average.svg', import.meta.url).href,
        header: '<div><span class="text-[#141414] text-xl font-medium">Kategori Cukup </span><span class="text-[#141414] text-xl font-normal">(Average)</span></div>',
        content: 'IQ dalam rentang 91-110 dikategorikan sebagai "Cukup" atau "Average." Ini adalah kelompok terbesar dalam populasi umum. Mereka memiliki kemampuan intelektual yang memadai untuk menangani sebagian besar tuntutan akademis dan sosial. Orang-orang dalam kategori ini dapat belajar dan berfungsi dengan baik dalam situasi yang standar, meskipun mungkin memerlukan usaha ekstra dalam topik-topik yang sangat rumit.'
    },
    {
        icon: new URL('@/assets/icons/iq/Dull_Normal.svg', import.meta.url).href,
        header: '<div><span class="text-[#141414] text-xl font-medium">Kategori Kurang </span><span class="text-[#141414] text-xl font-normal">(Dull Normal)</span></div>',
        content: 'IQ dengan skor 80-90 tergolong dalam kategori "Kurang" atau disebut "Dull Normal." Individu dalam kategori ini mungkin menghadapi beberapa tantangan dalam tugas akademis atau pekerjaan yang memerlukan pemikiran abstrak dan analitis. Namun, mereka masih mampu berfungsi secara efektif dalam banyak konteks kehidupan sehari-hari, terutama dalam lingkungan yang terstruktur dan didukung.'
    },
    {
        icon: new URL('@/assets/icons/iq/Borderline.svg', import.meta.url).href,
        header: '<div><span class="text-[#141414] text-xl font-medium">Kategori Kurang Sekali </span><span class="text-[#141414] text-xl font-normal">(Borderline)</span></div>',
        content: 'IQ di bawah 80 termasuk dalam kategori "Kurang Sekali" atau "Borderline." Mereka dalam kategori ini seringkali membutuhkan dukungan lebih besar dalam lingkungan belajar atau pekerjaan karena kemampuan intelektual yang lebih terbatas. Pemahaman terhadap konsep abstrak atau tugas-tugas yang memerlukan pemikiran kompleks bisa menjadi tantangan bagi mereka, sehingga bimbingan atau strategi pembelajaran khusus sering diperlukan.'
    },
    // {
    //     icon: new URL('@/assets/icons/iq/grade-3.svg', import.meta.url).href,
    //     header: 'Tinggi (IQ 115 - 130)',
    //     content: 'Orang dengan skor IQ dalam rentang ini sering menunjukkan kemampuan yang luar biasa dalam pemecahan masalah dan berpikir kritis. Mereka cenderung berprestasi tinggi dalam bidang akademik dan profesional.'
    // },
    // {
    //     icon: new URL('@/assets/icons/iq/grade-2.svg', import.meta.url).href,
    //     header: 'Sangat Tinggi (IQ > 130)',
    //     content: 'Skor ini menunjukkan kecerdasan yang sangat tinggi & sering dikaitkan dengan kemampuan luar biasa dalam berbagai bidang intelektual. Individu dalam kategori ini memiliki bakat istimewa & sering berprestasi ditingkat yang tinggi di bidang akademik dan profesional.'
    // },
    // {
    //     icon: new URL('@/assets/icons/iq/grade-1.svg', import.meta.url).href,
    //     header: 'Superior (IQ > 145)',
    //     content: 'Individu kategori ini biasanya menunjukkan kemampuan luar biasa dalam berbagai bidang intelektual, sering kali memiliki bakat istimewa. Mereka mampu menyelesaikan masalah yang sangat kompleks dan sering kali membuat kontribusi signifikan dibidang mereka.'
    // },
])

const loading = ref(true)
const isTested = ref(null)
const dataIQ = ref(null)

const getIQData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')

        const userData = await initAPI('post', 'login', formData, token)

        isTested.value = userData.data.customer.customers_iq !== null ? true : false
        dataIQ.value = userData.data.customer.customers_iq
        imageIQIcon.value = userData.data.customer.customers_iq !== null ? userData.data.customer.customers_iq.iq.icon : null
        
        // imgHasilCategoryIQ.value = new URL(`../../../assets/icons/iq/grade-${dataIQ.value.iq_id}.svg`, import.meta.url).href

    } catch (error) {
        console.log(error)
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
    await getIQData()

    // const videoId = document.getElementById('example-video')
    // if(videoId){
    //     const player = videojs('example-video');
    //     player.play();
    
    //     onBeforeUnmount(() => {
    //         player.dispose()
    //     })
    // }
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