<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Test Menu
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.deteksi'}" class="text-base text-dark hover:text-dark/70">
                    Test Assessment
                </RouterLink>
            </ol>
        </div>
        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
            <div class="flex flex-col bg-white h-[358px] w-full lg:w-full rounded-lg shadow-lg p-7"
            :class="{'overflow-y-scroll': currForm == 1 && isKlikSiapTest !== 'tidak'}"
            >
                <div v-if="currForm == 0 && isKlikSiapTest == 'tidak'">
                    <div class="hidden lg:flex lg:flex-row items-center">
                        <div class="lg:w-1/2">
                            <div class="flex flex-col mx-14">
                                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Halo! Apakah kamu siap untuk melakukan test?</h1>
                                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Test sekarang juga!</p>
                                <button @click="siaptest" class="my-4 lg:mb-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                    Test Sekarang
                                </button>
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="flex flex-col justify-center">
                                <img src="../../../assets/img/test-assessment.png" class="w-1/2 lg:w-[238px] self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Siap Test Image">
                            </div>
                        </div>
                    </div>
                    <div class="lg:hidden flex flex-col items-center">
                        <div class="lg:w-1/2">
                            <div class="flex flex-col justify-center">
                                <img src="../../../assets/img/sad.png" class="w-1/2 self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="No Data Found">
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="flex flex-col">
                                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Kamu belum melakukan test <span class="italic">Genetic Intelligence Mapping</span>.</h1>
                                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Test sekarang juga!</p>
                                <RouterLink :to="{name: 'user.views.deteksi'}" class="my-4 px-2 py-2 w-full self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                Test Sekarang
                            </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="currForm == 1 && isKlikSiapTest == 'ya'" class="h-full">
                    <div v-if="loadingQuestion" class="flex flex-col justify-center items-center h-full">
                        <span class="mx-auto flex flex-col justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-if="dataPertanyaan && !loadingQuestion" class="h-1/2">
                        <h2 class="font-myFont text-2xl font-medium mb-4">Test Assessment</h2>
                        <div v-for="(q, qIndex) in dataPertanyaan.data" class="mb-4">
                            <label class="block font-myFont text-dark text-base font-medium mb-2">
                                {{ (currPage - 1) * itemsPerPage + qIndex + 1 }}. {{ q.question }}
                            </label>
                            <div class="flex flex-col mx-2">
                                <div v-for="(answer, aIndex) in q.answers" class="px-2">
                                    <label class="block font-myFont text-dark text-sm font-medium mb-2">
                                        <input type="checkbox" :value="answer.value" @change="updateJawaban(qIndex, aIndex, $event.target.checked, answer.value)"
                                            class="mr-2">{{ answer.value }}. {{ answer.answer }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4 flex justify-between items-center">
                            <div></div>
                            <!-- <button v-if="dataPertanyaan.from > 1" type="submit" class="bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Sebelumnya</button> -->
                            <span class="font-myFont text-dark text-base">{{ dataPertanyaan.from }} - {{ dataPertanyaan.to }} dari 30</span>
                            <button v-if="nextPages !== null" @click="selanjutnya(nextPages)" class="font-myFont bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Selanjutnya</button>
                            <button v-if="nextPages == null" @click="kirimJawaban" class="font-myFont bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Kirim Jawaban</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import initAPI from '../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default{
    name: 'TestAssessment',
    setup(){
        const loadingQuestion = ref(false)

        const currForm = ref(0)
        const isKlikSiapTest = ref('tidak')

        const dataPertanyaan = ref(null)
        const currPage = ref('')
        const itemsPerPage = ref('')
        const nextPages = ref('')
        const jawabanPertanyaan = ref([])

        const arrCodeJawabanPertanyaan = []

        const kirimJawaban = () => {
            Swal.fire({
                title: "Lanjut ke halaman berikutnya?",
                text: "Jika belum yakin dengan jawabanmu klik tombol Cek Ulang dibawah.",
                icon: "question",
                showCancelButton: true,
                cancelButtonColor: "#3b3f5c",
                cancelButtonText: "Cek Ulang",
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Lanjutkan"
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log('jawaban yg dikirim', arrCodeJawabanPertanyaan)
                    }
                });
        }

        const updateJawaban = (qIndex, aIndex, isChecked, code) => {
            jawabanPertanyaan.value[qIndex][aIndex] = isChecked
            console.log('jawaban dipilih', jawabanPertanyaan)

            arrCodeJawabanPertanyaan.push(code)
            console.log('code jawaban', code)
            console.log('array', arrCodeJawabanPertanyaan)
        }

        const selanjutnya = (nextPage) => {
            const adaPertanyaanBelumTerjawab = jawabanPertanyaan.value.some(jawaban => jawaban.length === 0);
            console.log(adaPertanyaanBelumTerjawab)
            if (adaPertanyaanBelumTerjawab) {
                console.log("Harap isi semua pertanyaan sebelum melanjutkan.");
                Swal.fire({
                title: "Oopss Perhatikan jawabanmu",
                text: "Ada beberapa jawaban yang belum kamu isi",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Cek Ulang",
                })
            } else {
                Swal.fire({
                title: "Lanjut ke halaman berikutnya?",
                text: "Jika belum yakin dengan jawabanmu klik tombol Cek Ulang dibawah.",
                icon: "question",
                showCancelButton: true,
                cancelButtonColor: "#3b3f5c",
                cancelButtonText: "Cek Ulang",
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Lanjutkan"
                }).then((result) => {
                    if (result.isConfirmed) {
                        getNextDataPertanyaan(nextPage)
                    }
                });
            }
        };

        const getNextDataPertanyaan = async(nextPage) => {
            console.log(`nextPage`, nextPage)
            console.log('jawaban yeuh', jawabanPertanyaan.value)

            loadingQuestion.value = !loadingQuestion.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', nextPage, null, token)
            console.log(`qna`, response.data)
            jawabanPertanyaan.value = response.data.data.map(() => []);
            dataPertanyaan.value = response.data
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPages.value = response.data.next_page_url
            loadingQuestion.value = !loadingQuestion.value
        }

        const getDataPertanyaan = async() => {
            loadingQuestion.value = !loadingQuestion.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'assessments/questions?status=1', null, token)
            console.log(`qna`, response.data)
            jawabanPertanyaan.value = response.data.data.map(() => []);
            dataPertanyaan.value = response.data
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPages.value = response.data.next_page_url
            loadingQuestion.value = !loadingQuestion.value
        }

        const siaptest = () => {
            currForm.value = 1
            isKlikSiapTest.value = 'ya'
            getDataPertanyaan()
        }

        return { 
            loadingQuestion,
            currForm,
            isKlikSiapTest,
            dataPertanyaan,
            itemsPerPage,
            currPage,
            nextPages,
            siaptest,
            updateJawaban,
            selanjutnya,
            kirimJawaban
         }
    }
}
</script>