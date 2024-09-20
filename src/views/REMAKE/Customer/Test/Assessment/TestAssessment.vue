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
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test Assessment</div>
        </div>

        <SelesaiTest v-if="isTested" message="Test Assessment Selesai!"
        :subMessage="subMessage"/>

        <section v-if="!isTested" class="bg-white pb-[34px]">
            <div class="flex flex-col items-center gap-[56px]">
                <div class="h-[76px] flex-col justify-start items-start gap-4 inline-flex">
                    <span class="self-stretch text-center text-black text-xl md:text-3xl font-semibold font-['Sora'] leading-9">Tes Gaya Belajar</span>
                    <span class="self-stretch text-center text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">Jawablah pertanyaan berikut ini sesuai dengan tingkat kecocokan berdasarkan kondisimu saat ini</span>
                </div>

                <div v-if="dataPertanyaan" class="mx-[30px] md:mx-[60px] h-auto p-9 bg-white rounded-3xl shadow flex flex-col gap-9">
                    <div v-for="(q, qIndex) in dataPertanyaan.data" class="mb-4">
                        <label class="block text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal mb-2">
                            {{ (currPage - 1) * itemsPerPage + qIndex + 1 }}. {{ q.question }}
                        </label>
                        <div class="flex flex-col mx-2">
                            <div v-for="(answer, aIndex) in q.answers" :key="aIndex" class="px-2">
                                <div class="flex flex-col gap-2">
                                    <span class="text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                                        {{ answer.answer }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="mt-2 flex items-center justify-center gap-4">
                                <button @click="pilihJawaban(answer.value, qIndex)" 
                                v-for="(answer, aIndex) in q.answers" :key="aIndex"
                                :class="{
                'bg-[#3030f8] border-[#3030f8] text-white': isSelectedAnswer((currPage - 1) * itemsPerPage + qIndex, answer.value),
                'border-[#667084] text-[#667084]': !isSelectedAnswer((currPage - 1) * itemsPerPage + qIndex, answer.value)
            }"
            class="group size-10 md:w-14 md:h-14 rounded-lg border transition-all hover:border-[#3030f8] flex-col justify-center items-center gap-2.5 inline-flex">
            <div 
                :class="{
                    'text-white': isSelectedAnswer((currPage - 1) * itemsPerPage + qIndex, answer.value),
                    'group-hover:text-[#3030f8] text-[#667084]': !isSelectedAnswer((currPage - 1) * itemsPerPage + qIndex, answer.value)
                }"
                                    class="text-[#667084] text-base md:text-2xl font-semibold font-['Roboto'] leading-loose uppercase">
                                        {{ answer.value }}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
                            {{ soalDari }} - {{ soalKe }} dari {{ totalSoal }}
                        </span>

                        <button @click="handleNextQuestion" class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                            <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Selanjutnya</div>
                            <div class="w-6 h-6 relative">
                                <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    
        <section class="bg-white py-[46px]">
            <ReservasiFooter/>
        </section>
    </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import Layout from '@/Layout/Customer/Layout.vue';
import ReservasiFooter from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
import { useRouter } from 'vue-router';
const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Assesment</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`

const router = useRouter()

const isTested = ref(false)
const loadingQuestion = ref(false)

const dataPertanyaan = ref(null)
const currPage = ref('')
const itemsPerPage = ref('')
const soalDari = ref('')
const soalKe = ref('')
const totalSoal = ref('')
const nextPages = ref('')
const jawabanPertanyaan = ref([])

const arrCodeJawabanPertanyaan = ref([])

const isSelectedAnswer = (globalIndex, value) => {
    return arrCodeJawabanPertanyaan.value[globalIndex] === value;
};

const pilihJawaban = (answerValue, qIndex) => {
    const globalIndex = (currPage.value - 1) * itemsPerPage.value + qIndex; // Hitung indeks global
    arrCodeJawabanPertanyaan.value[globalIndex] = answerValue;
    console.log('Updated answers:', arrCodeJawabanPertanyaan.value);
};

const checkAllQuestionsAnswered = () => {
    // Cek apakah ada jawaban yang masih null atau undefined di halaman saat ini
    return arrCodeJawabanPertanyaan.value.every((answer) => answer !== null && answer !== undefined);
};

const handleNextQuestion = () => {
    if(nextPages.value == null) {
        try {
            const token = Cookies.get('token');
            const response = await initAPI('post', 'your-endpoint-url', {
                answers: arrCodeJawabanPertanyaan.value
            }, token);

            Swal.fire({
                title: "Success!",
                text: "Your answers have been submitted.",
                icon: "success",
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "OK",
            });

            console.log('Response from API:', response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to submit answers',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    } else {
        // Jika ada jawaban yang belum diisi, tampilkan peringatan
        if (!checkAllQuestionsAnswered()) {
            Swal.fire({
                title: "Oopss Perhatikan jawabanmu",
                text: "Ada beberapa jawaban yang belum kamu isi",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Cek Ulang",
            });
        } else {
            // Jika semua jawaban sudah diisi, tampilkan konfirmasi
            Swal.fire({
                title: "Lanjut ke halaman berikutnya?",
                text: "Jika belum yakin dengan jawabanmu klik tombol Cek Ulang dibawah.",
                icon: "question",
                showCancelButton: true,
                cancelButtonColor: "#3b3f5c",
                cancelButtonText: "Cek Ulang",
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Lanjutkan",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Jika dikonfirmasi, panggil getNextQuestion
                    getNextQuestion();
                }
            });
        }
    }
};


const getNextQuestion = async() => {
    if(nextPages.value !== null){
        const page = nextPages.value.split('?page=')[1]
        console.log(`next page`, page)
        await getDataPertanyaan(page)
    }
}

const getDataPertanyaan = async(page = 1) => {
    loadingQuestion.value = !loadingQuestion.value
    const token = Cookies.get('token')
    if(token){
        try {
            const response = await initAPI('get', `assessments/questions?status=1&page=${page}`, null, token)
            
            const totalSoalSaatIni = response.data.data.length;
            const fromIndex = (page - 1) * totalSoalSaatIni; // Indeks global pertama di halaman ini

            // Inisialisasi jawaban jika belum ada
            for (let i = 0; i < totalSoalSaatIni; i++) {
                const globalIndex = fromIndex + i;
                if (arrCodeJawabanPertanyaan.value[globalIndex] === undefined) {
                    arrCodeJawabanPertanyaan.value[globalIndex] = null; // Set jawaban awal ke null
                }
            }
            
            jawabanPertanyaan.value = response.data.data.map(() => []);
            dataPertanyaan.value = response.data
            soalDari.value = response.data.from
            soalKe.value = response.data.to
            totalSoal.value = response.data.total
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPages.value = response.data.next_page_url
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat mengambil data',
                showConfirmButton: false,
                timer: 2000
            });
        }
    } else {
        router.push('/login')
        localStorage.clear()
    }
    loadingQuestion.value = !loadingQuestion.value
}

onMounted(async() => {
    await getDataPertanyaan()
})
</script>