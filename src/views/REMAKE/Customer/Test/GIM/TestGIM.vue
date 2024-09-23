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
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test GIM</div>
        </div>
    
        <SelesaiTest v-if="statusTest == 'Selesai Terdeteksi'" routeUrl="user.views.hasil_deteksi" message="Test GIM Selesai!"
        :subMessage="subMessage"/>

        <DiProses v-if="statusTest == 'Sudah Disubmit' || statusTest == 'Dalam Review'" message="Test Kamu Sedang Diproses!" 
        subMessage="Terima kasih telah menyelesaikan Tes GIM! Saat ini, hasil tes kamu sedang diproses oleh tim konsultan kami. Kami akan menghubungi kamu segera setelah analisis selesai untuk memberikan laporan lengkapnya."/>
    
        <section v-if="statusTest == 'Belum'" class="bg-white pb-[34px]">
            <div class="flex flex-col justify-center items-center gap-[24px]">
                <div class="text-center text-black text-lg md:text-xl lg:text-3xl font-semibold font-['Sora'] leading-9">
                    Tes Genetic Intelligence Mapping
                </div>

                <!-- Step Indicator -->
                <div class="w-[70vw] lg:w-[680px] flex items-center justify-center">
                    <div class="w-[50px] h-[50px] lg:w-14 lg:h-14 bg-white rounded-[50%] lg:rounded-[28px] border border-[#3030f8] flex-col justify-center items-center gap-2.5 inline-flex">
                        <div class="w-6 h-6 px-[0.05px] py-[1.58px] justify-center items-center inline-flex">
                            <div class="w-[23.89px] h-[20.83px] relative">
                                <img src="@/assets/icons/test_gim/step_instruksi.svg" alt="icon">
                            </div>
                        </div>
                    </div>

                    <div :class="{'bg-[#667084]': currentIndex == 1, 'bg-[#3030f8]': currentIndex !== 1}" class="w-[18%] lg:w-[38%] h-[5px]"></div>
                    
                    <div 
                        :class="{'border-[#667084]': currentIndex == 1, 'border-[#3030f8]': currentIndex == 2 || currentIndex == 3}"
                        class="w-[50px] h-[50px] lg:w-14 lg:h-14 bg-white rounded-[28px] border flex-col justify-center items-center gap-2.5 inline-flex">
                        <div class="w-6 h-6 px-[0.05px] py-[1.58px] justify-center items-center inline-flex">
                            <div class="w-[23.89px] h-[20.83px] relative">
                                <img :class="{'grayscale': currentIndex == 1, 'grayscale-0': currentIndex == 2 || currentIndex == 3}" src="@/assets/icons/test_gim/Upload_step.svg" alt="icon">
                            </div>
                        </div>
                    </div>

                    <div :class="{'bg-[#667084]': currentIndex == 1 || currentIndex == 2, 'bg-[#3030f8]': currentIndex == 3}" class="w-[18%] lg:w-[38%] h-[5px]"></div>
                    
                    <div 
                        :class="{'border-[#667084]': currentIndex == 1 || currentIndex == 2, 'border-[#3030f8]': currentIndex == 3}"
                        class="w-[50px] h-[50px] lg:w-14 lg:h-14 bg-white rounded-[28px] border flex-col justify-center items-center gap-2.5 inline-flex">
                        <div class="w-6 h-6 px-[0.05px] py-[1.58px] justify-center items-center inline-flex">
                            <div class="w-[23.89px] h-[20.83px] relative">
                                <img :class="{'grayscale': currentIndex == 1 || currentIndex == 2, 'grayscale-0': currentIndex == 3}" src="@/assets/icons/test_gim/Done_step.svg" alt="icon">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-9 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 flex">
                    <div v-if="currentIndex == 1">
                        <Step1 :validasi="validasi" @update-validasi="updateValidasi"/>
                    </div>

                    <div v-if="currentIndex == 2">
                        <Step2 :validasi="validasi" @update-validasi="updateValidasi"/>
                    </div>

                    <div v-if="currentIndex == 3">
                        <Step3 v-if="!loadingSubmit"/>

                        <div v-else class="w-[600px] h-[296px] flex flex-col justify-center items-center">
                            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
                        </div>
                    </div>


                    <!-- Tombol Aksi -->
                    <div v-if="!loadingSubmit" class="self-stretch justify-between items-center inline-flex">
                        <button @click="btnAction('Back')" class="hover:shadow-2xl hover:-translate-x-1 transition-all h-11 pl-1 md:pl-4 pr-3 md:pr-6 py-1.5 rounded-full border border-[#3030f8] justify-center items-center gap-1 lg:gap-3 inline-flex">
                            <div class="w-[21px] h-[21px] lg:w-6 lg:h-6 relative">
                                <img src="@/assets/icons/test_gim/chevron_left.svg" alt="icon">
                            </div>
                            <div class="text-[#3030f8] text-sm md:text-base font-normal font-['Roboto'] leading-normal">Kembali</div>
                        </button>

                        <button @click="btnAction('Next')" :disabled="canProceedToNext == false" 
                        :class="{'hover:shadow-2xl hover:translate-x-1 transition-all': canProceedToNext, 'bg-opacity-50 cursor-not-allowed': !canProceedToNext}"
                        class="h-11 pl-3 pr-1 py-[4px] md:pl-6 md:pr-4 md:py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-1 lg:gap-3 inline-flex">
                            <div class="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                                {{ currentIndex !== 3 ? 'Selanjutnya' : 'Kirim' }}
                            </div>
                            <div class="w-[21px] h-[21px] lg:w-6 lg:h-6 relative">
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
import { useStore } from 'vuex'
import Layout from '@/Layout/Customer/Layout.vue';
import ReservasiFooter from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import DiProses from '@/components/REMAKE/HasilTest/DiProses/DiProses.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
import { onMounted, ref, computed } from 'vue';
import initAPI from '@/api/api';
import Cookies from 'js-cookie';
import Step1 from '@/components/REMAKE/Test/GIM/Step1.vue';
import Step2 from '@/components/REMAKE/Test/GIM/Step2.vue';
import Step3 from '@/components/REMAKE/Test/GIM/Step3.vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Genetic Intelligence Mapping</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`

const loading = ref(true)
const loadingSubmit = ref(false)
const statusTest = ref('Belum')

const currentIndex = ref(1)

const store = useStore()

const validasi = ref({
  checkbox: false,  // Status checkbox in Step 1
  isUpload: false,  // Status upload in Step 2
});

// Function to update validation state
const updateValidasi = (key, value) => {
  validasi.value[key] = value;
};

// Computed property to determine if "Next" button should be enabled
const canProceedToNext = computed(() => {
  if (currentIndex.value === 1) {
    return validasi.value.checkbox; // For Step 1, only enable Next if checkbox is checked
  } else if (currentIndex.value === 2) {
    return validasi.value.isUpload; // For Step 2, only enable Next if an image is uploaded
  }
  return true;
});

const customerId = ref(null)
const reviewImage = computed(() => store.getters.getReviewImage)

const uploadImage = async() => {
    const formData = new FormData();
    formData.append('detection_image', reviewImage.value[0]);
    
    const token = Cookies.get('token')

    try {
        if(reviewImage.value !== null){
            loadingSubmit.value = true
            await initAPI(
                'post','customers/gim-result/upload-test/'+customerId.value, formData, token
            );

            Swal.fire({
            icon: 'success',
            title: 'File di Upload',
            text: 'Deteksi GIM akan segera di proses',
            showConfirmButton: false,
            timer: 2000
            });
            
            await getUserData()
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat mengirim data user',
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        loadingSubmit.value = false
    }
}

const btnAction = (params) => {
    console.log(`aya`)
  switch (params) {
    case 'Back':
        console.log('back');
        if(currentIndex.value > 1) currentIndex.value--
      break;
    
      case 'Next':
      if (currentIndex.value < 3) {
        currentIndex.value++;
      } else if (currentIndex.value === 3) {
        uploadImage();
      }
      break;
  }
};

const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const userData = await initAPI('post', 'login', formData, token)

        customerId.value = userData.data.customer.id
        statusTest.value = userData.data.customer.is_detected

        // isTested.value = userData.data.customer.is_detected == 'Selesai Terdeteksi' ? true 
        // : userData.data.customer.is_detected == 'Sudah Disubmit' ? true
        // : false
        
        // if(userData.data.customer.customers_results !== null && userData.data.customer.customers_results.gim !== null){
        //     GIMDatas.value = userData.data.customer.customers_results
        // }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat mengambil data',
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
</style>