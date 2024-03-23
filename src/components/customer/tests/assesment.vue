<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Test
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.deteksi'}" class="text-base text-dark hover:text-dark/70">
                    Test Assessment
                </RouterLink>
            </ol>
        </div>
        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
            <div class="flex flex-col bg-white lg:h-[400px] w-full lg:w-full rounded-lg shadow-lg p-7"
            :class="{'overflow-y-scroll': currForm == 1 && isKlikSiapTest !== 'tidak'}"
            >
                <div v-if="isAssessment == true">
                    <sudahTest/>
                </div>

                <div v-else-if="isAssessment == false">
                    <div v-if="currForm == 0 && isKlikSiapTest == 'tidak'">
                        <belumTest @siapTest="siaptest"/>
                    </div>

                    <div v-else-if="currForm == 1 && isKlikSiapTest == 'ya'" class="flex flex-col justify-center">
                        <siapTest/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import belumTest from './assessment_comps/belum_test/belum_test.vue'
import sudahTest from './assessment_comps/sudah_test/sudah_test.vue'
import siapTest from './assessment_comps/siapTest.vue';
import initAPI from '../../../api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ModalConsent from '../../informedConsent/modal.vue'

export default{
    name: 'TestAssessment',
    components: {belumTest, sudahTest, siapTest, ModalConsent},
    setup() {
        const isAssessment = ref(false)
        const currForm = ref(0)
        const isKlikSiapTest = ref('tidak')

        const siaptest = () => {
            currForm.value = 1
            isKlikSiapTest.value = 'ya'
            // getDataPertanyaan()
        }

        onMounted(async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            const userId = JSON.parse(localStorage.getItem('userData'))
            try {
                const response = await initAPI('get', `customers/assessments?customer_id=${userId.id}`, null, token)
                if(response.data.data.length > 0){
                    isAssessment.value = true
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Terjadi error saat mengambil data assessment.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "Tutup"
                })
            }

        })

        return {
            isAssessment,
            currForm,
            isKlikSiapTest,
            siaptest,
         }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>