<template>
    <div class="flex flex-col items-center gap-[56px]">
        <div class="mx-[30px] md:mx-[60px] h-[76px] flex-col justify-start items-start gap-4 inline-flex">
            <span class="self-stretch text-center text-black text-xl md:text-3xl font-semibold font-['Sora'] leading-9">Tes Internet Addiction Assessment</span>
            <span class="self-stretch text-center text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">Pilihlah salah satu dari 5 pilihan ini untuk menjawab seberapa sering situasi di bawah ini sesuai dengan kebiasaan kamu saat menggunakan smartphone atau internet:</span>
        </div>

        <div id="soal" v-if="dataPertanyaan" class="mx-[30px] md:mx-[60px] h-auto p-9 bg-white rounded-3xl shadow flex flex-col gap-9">
            <div v-if="!loadingSubmit">
                <div v-for="(q, qIndex) in dataPertanyaan.data" class="mb-4">
                    <!-- Tampilkan nomor urut pertanyaan -->
                    <label class="block text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal mb-2">
                        {{ qIndex + 1 }}. {{ q.question }}
                    </label>
        
                    <!-- Daftar jawaban untuk setiap pertanyaan -->
                    <div class="flex flex-col mx-2">
                        <div v-for="(answer, aIndex) in q.answers" :key="aIndex" class="px-2">
                            <span class="text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                                {{ aIndex+1 }}. {{ answer.text }}
                                </span>
                            <div class="flex flex-col gap-2">
                                <span class="text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                                    {{ answer.answers }}
                                </span>
                            </div>
                        </div>
                        <!-- Tombol pilihan jawaban -->
                        <div class="mt-2 flex items-center justify-center gap-4">
                            <button @click="pilihJawaban(answer.value, qIndex)" 
                            v-for="(answer, aIndex) in q.answers" :key="aIndex"
                            :class="{
                            'bg-[#3030f8] border-[#3030f8] text-white': isSelectedAnswer(qIndex, answer.value),
                            'border-[#667084] text-[#667084]': !isSelectedAnswer(qIndex, answer.value)
                            }"
                            class="group size-10 md:w-14 md:h-14 rounded-lg border transition-all hover:border-[#3030f8] flex-col justify-center items-center gap-2.5 inline-flex">
                            <div 
                            :class="{
                            'text-white': isSelectedAnswer(qIndex, answer.value),
                            'group-hover:text-[#3030f8] text-[#667084]': !isSelectedAnswer(qIndex, answer.value)
                            }"
                            class="text-[#667084] text-base md:text-2xl font-semibold font-['Roboto'] leading-loose uppercase">
                            {{ answer.value }}
                        </div>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-10 gap-2 flex flex-col md:flex-row justify-center items-center">
                    <button @click="handleNextQuestion" class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                        <div class="text-white text-base font-normal font-['Roboto'] leading-normal justify-center">Kirim Jawaban</div>
                        <div class="w-6 h-6 relative">
                            <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                        </div>
                    </button>
                </div>
            </div>

            <div v-else class="w-[600px] h-[296px] flex flex-col justify-center items-center">
                <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';

const emit = defineEmits(['refreshData'])

const props = defineProps({
    customerId: Number
})

const router = useRouter()

const loadingSubmit = ref(false)
const loadingQuestion = ref(false)
const dataPertanyaan = ref(null)
const nextPages = ref('')
const jawabanPertanyaan = ref([])

const arrCodeJawabanPertanyaan = ref([])
//const isSubmit = ref(false)


const scrollToSection = () => {
    setTimeout(() => {
        const soalElement = document.getElementById('soal');
        if (soalElement) {
            soalElement.scrollIntoView({ behavior: 'smooth' }); // Scroll dengan animasi halus
        }
    }, 100); 
};

const isSelectedAnswer = (qIndex, value) => {
    return arrCodeJawabanPertanyaan.value[qIndex] === value;
};

const pilihJawaban = (answerValue, qIndex) => {
    arrCodeJawabanPertanyaan.value[qIndex] = answerValue;
    // console.log('Updated answers:', arrCodeJawabanPertanyaan.value);
};

const checkAllQuestionsAnswered = () => {
    // Cek apakah ada jawaban yang masih null atau undefined di halaman saat ini
    return arrCodeJawabanPertanyaan.value.every((answer) => answer !== null && answer !== undefined);
};

const handleNextQuestion = () => {
    // Cek apakah semua pertanyaan sudah dijawab
    const isAllAnswered = checkAllQuestionsAnswered();

    if (isAllAnswered) {
        Swal.fire({
            title: "Kirim jawaban sekarang?",
            text: "Jika belum yakin dengan jawabanmu klik tombol Cek Ulang dibawah.",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#3b3f5c",
            cancelButtonText: "Cek Ulang",
            confirmButtonColor: "#3030f8",
            confirmButtonText: "Ya, kirim",
            customClass: {
                confirmButton: 'bg-biru hover:bg-biru/80 text-white px-4 py-2 rounded ml-5',
                cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded'
            },  
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const payload = {
                        customer_id: props.customerId,
                        answers: arrCodeJawabanPertanyaan.value
                    };

                    const token = Cookies.get('token');
                    const response = await initAPI('post', 'customers/iaa', payload, token);

                    Swal.fire({
                        title: "Jawaban kamu sudah direkam",
                        text: "Kamu bisa melihat hasil test kamu setelah ini.",
                        icon: "success",
                        confirmButtonColor: "#3030f8",
                        confirmButtonText: "OK",
                        customClass: {
                        confirmButton: 'bg-biru hover:bg-biru/80 text-white px-4 py-2 rounded',
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            emit('refreshData');
                        }
                    });
                } catch (error) {
                    // Tampilkan error jika pengiriman gagal
                    console.error("Error submitting answers:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.message || 'Terjadi kesalahan saat mengirim jawaban.',
                        showConfirmButton: false,
                        timer: 2500,
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: "Oopss Perhatikan jawabanmu",
            text: "Ada beberapa jawaban yang belum kamu isi",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "Cek Ulang",
            customClass: {
                confirmButton: 'bg-biru hover:bg-biru/80 text-white px-4 py-2 rounded ml-5',
                cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded'
            },
        });
    }
};

const getDataPertanyaan = async(page = 1) => {
    loadingQuestion.value = !loadingQuestion.value
    const token = Cookies.get('token')
    if(token){
        try {
            const response = await initAPI('get', `iaa/questions`, null, token)
            
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
            nextPages.value = response.data.next_page_url

            scrollToSection()
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