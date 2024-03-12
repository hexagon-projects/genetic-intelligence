<template>
<div class="flex flex-col justify-center"
    :class="{'h-[352px]': loadingQuestion}"
>
    <div v-if="loadingQuestion" class="flex flex-col justify-center items-center">
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
                        <input type="checkbox" name="jawabanAssessment"
                        v-model="jawabanPertanyaan[qIndex]"
                        :value="answer.value" @change="updateJawaban(qIndex, aIndex, $event.target.checked, answer.value)"
                            class="mr-2">{{ answer.answer }}
                    </label>
                </div>
            </div>
        </div>
    
        <div class="mb-4 flex flex-col gap-1 items-center">
            <div></div>
            <!-- <button v-if="dataPertanyaan.from > 1" type="submit" class="bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Sebelumnya</button> -->
            <span class="font-myFont text-dark text-base">{{ dataPertanyaan.from }} - {{ dataPertanyaan.to }} dari {{ dataPertanyaan.total }}</span>
            <button v-if="nextPages !== null" @click="selanjutnya(nextPages)" class="font-myFont bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Selanjutnya</button>
            <button v-if="nextPages == null" @click="kirimJawaban" class="font-myFont bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Kirim Jawaban</button>
        </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';

export default {
    name: 'SudahTest',
    setup() {
        const router = useRouter()
        const loadingQuestion = ref(false)

        const dataPertanyaan = ref(null)
        const currPage = ref('')
        const itemsPerPage = ref('')
        const nextPages = ref('')
        const jawabanPertanyaan = ref([])

        const arrCodeJawabanPertanyaan = []

        const submitJawaban = async() => {
            console.log(`jawaban final`, arrCodeJawabanPertanyaan)
            const token = JSON.parse(localStorage.getItem('token'))
            const userId = JSON.parse(localStorage.getItem('userData'))
            try {
                const data = new FormData();
                data.append('customer_id', userId.id)
                data.append('answers', JSON.stringify(arrCodeJawabanPertanyaan));
                console.log(`FD`, data)
                const response = await initAPI('post', 'customers/assessments', data, token)
                if(response.data.message){
                    Swal.fire({
                        title: "Jawaban kamu sudah direkam",
                        text: "Kamu bisa melihat hasil test kamu setelah ini.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#0b40f4",
                        confirmButtonText: "Mengerti"
                    })
                    router.go()
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Terjadi error saat merekam jawaban.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "Tutup"
                })
            }
            
        }

        const getCheckedJawaban = () => {
            let getJawaban = document.getElementsByName('jawabanAssessment');
            for (let j = 0; j < getJawaban.length; j++) {
                if(getJawaban[j].checked){
                    // console.log(`ie aya nu di cek`, getJawaban[j])
                    arrCodeJawabanPertanyaan.push(getJawaban[j].value)
                }
            }
        }

        const kirimJawaban = () => {
            getCheckedJawaban()

            Swal.fire({
                title: "Kirim jawaban sekarang?",
                text: "Jika belum yakin dengan jawabanmu klik tombol Cek Ulang dibawah.",
                icon: "question",
                showCancelButton: true,
                cancelButtonColor: "#3b3f5c",
                cancelButtonText: "Cek Ulang",
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Ya, kirim"
                }).then((result) => {
                    if (result.isConfirmed) {
                        // console.log('jawaban yg dikirim', arrCodeJawabanPertanyaan)
                        submitJawaban()
                    }
                });
        }

        const updateJawaban = (qIndex, aIndex, isChecked, code) => {
            // jawabanPertanyaan.value[qIndex][aIndex] = isChecked
            jawabanPertanyaan.value[qIndex] = [isChecked ? code : ''];
            console.log('jawaban dipilih', jawabanPertanyaan)

            // arrCodeJawabanPertanyaan.push(code)
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

                getCheckedJawaban()

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

            console.log(`data jawaban`, arrCodeJawabanPertanyaan)

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

        onMounted(async() => {
            getDataPertanyaan()
        })

        return { 
            loadingQuestion,
            dataPertanyaan,
            itemsPerPage,
            currPage,
            nextPages,
            jawabanPertanyaan,
            updateJawaban,
            selanjutnya,
            kirimJawaban
        }
    }
}
</script>