<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <div v-if="dataProfileInclomplete">
    <modalCekProfile />
  </div>

  <Layout v-if="!loading">
    <div
      class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex"
    >
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Berkamu
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Lakukan Tes
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
      <div
        class="opacity-75 text-black text-sm font-normal font-roboto leading-tight"
      >
        Jatidiri Potensi
      </div>
    </div>

    <section class="bg-white pb-[34px] mb-10" v-if="!isTested">
      <transition name="fade" mode="out-in">
        <div
          v-if="isKebijakanPrivasi"
          class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
        >
          <KebijakanPrivasi @toggleKebijakanPrivasi="toggleKebijakanPrivasi" />
        </div>
      </transition>

      <div class="flex flex-col justify-center items-center gap-[24px] mb-10">
        <div class="flex flex-col items-center gap-[56px]">
          
          <!-- pertanyaan -->
          <div v-if="currentPage <= maxPage" class="p-5">
            <div class="flex justify-center flex-col mx-auto py-5">
              <div
                class="mx-[30px] md:mx-[60px] h-auto flex-col justify-start items-start gap-4 inline-flex"
              >
                <span
                  class="self-stretch text-center text-black text-xl md:text-3xl font-semibold font-['Sora'] leading-9"
                  >{{ pageTitle }}</span
                >
                <span
                  class="self-stretch text-center text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal" v-html="pageInstruction"
                  ></span
                >
                <span
                  class="self-stretch text-center text-black text-sm md:text-base font-normal font-sora leading-normal"
                  >Tahapan : {{ currentPage }} / {{ maxPage }}</span
                >
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
              <div
                v-for="q in filteredQuestions"
                :key="q.id"
                :class="{
                  'border border-biru bg-biru text-white': isSelected(q.id),
                  'border border-biru': !isSelected(q.id),
                  'p-4 rounded-xl cursor-pointer transition hover:bg-biru hover:text-white': true,
                }"
                @click="handleSelect(q.id)"
              >
                {{ q.description }}
              </div>
            </div>

            <div class="flex gap-5 justify-center items-center">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <button
                @click="nextPage"
                class="bg-biru text-white px-4 py-2 rounded-xl hover:bg-biru/80"
              >
                {{ currentPage === maxPage ? "Kirim Jawaban" : "Lanjut" }}
              </button>
            </div>
          </div>

          <div v-else>
            <h2 class="text-xl font-semibold">Terima kasih!</h2>
            <p>Jawaban kamu telah dikirim.</p>
          </div>
        </div>
      </div>
    </section>

    <SelesaiTest v-if="isTested" routeUrl="user.views.hasil_talent_mapping" message="Test Jatidiri Potensi Selesai!"
        :subMessage="subMessage"/>

    <section class="bg-white py-[46px] mb-10">
      <ReservasiFooter />
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Customer/Layout.vue";
import ReservasiFooter from "@/components/REMAKE/ReservasiFooter/Reservasi.vue";
import { reactive, ref, computed, onMounted, defineEmits } from 'vue'
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
import initAPI from "@/api/api";
import cekDataProfile from "@/components/cekProfile";
import modalCekProfile from "@/components/modalCekProfile/modalCekProfile.vue";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useRouter } from "vue-router";
import { nextTick } from 'vue';

const emit = defineEmits(["refreshData"]);

const currentPage = ref(1)
const maxPage = 4
const questions = ref([])
const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Jatidiri Potensi</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`
const isTested = ref(null)
const loading = ref(false)
const customerId = ref('')


const selectedPerPage = reactive({
  1: [],
  2: [],
  3: [],
  4: []
})

const pageTitles = {
  1: 'PILIHLAH YANG PALING COCOK',
  2: 'PILIHLAH YANG PALING TIDAK COCOK',
  3: 'PILIHLAH YANG COCOK',
  4: 'PILIHLAH YANG TIDAK COCOK'
}

const pageInstructions = {
  1: `Pilihlah 5 s/d 7 pernyataan yang menurut kamu Paling sesuai dengan diri kamu<br/>Pilihlah dengan cara mengklik kotak pernyataan<br/>Setelah selesai memilih silahkan klik Lanjutkan`,
  2: `Pilihlah 5 s/d 7 pernyataan yang menurut kamu Paling tidak sesuai dengan diri kamu<br/>Pilihlah dengan cara mengklik kotak pernyataan<br/>Setelah selesai memilih silahkan klik Lanjutkan`,
  3: `Pilihlah 5 s/d 7 pernyataan yang menurut kamu Sesuai dengan diri kamu<br/>Pilihlah dengan cara mengklik kotak pernyataan<br/>Setelah selesai memilih silahkan klik Lanjutkan`,
  4: `Pilihlah 5 s/d 7 pernyataan yang menurut kamu Tidak sesuai dengan diri kamu<br/>Pilihlah dengan cara mengklik kotak pernyataan<br/>Setelah selesai memilih silahkan klik Kirim Jawaban`
}

const pageTitle = computed(() => pageTitles[currentPage.value])
const pageInstruction = computed(() => pageInstructions[currentPage.value])

const isSelected = (id) => selectedPerPage[currentPage.value].includes(id)

const handleSelect = (id) => {
  const selected = selectedPerPage[currentPage.value]
  const already = selected.includes(id)

  if (currentPage.value === 1 && !already && selected.length >= 7) {
    alert("Maksimal 7 pernyataan untuk tahap pertama")
    return
  }

  if (!already) selected.push(id)
  else selectedPerPage[currentPage.value] = selected.filter(q => q !== id)
}

const filteredQuestions = computed(() => {
  // Ambil semua id yang sudah dipilih di tahap lain
  const usedIdsOtherPages = new Set()
  for (let page = 1; page <= maxPage; page++) {
    if (page !== currentPage.value) {
      selectedPerPage[page].forEach(id => usedIdsOtherPages.add(id))
    }
  }

  // Filter: hilangkan hanya yang dipilih di tahap lain
  return questions.value.filter(q => !usedIdsOtherPages.has(q.id))
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = async () => {
  // ✅ Ambil jumlah pilihan di tahap sekarang
  const selectedCount = selectedPerPage[currentPage.value].length;

  // ✅ Validasi: harus 5 sampai 7 pilihan
  if (selectedCount < 5 || selectedCount > 7) {
    Swal.fire({
      icon: 'warning',
      title: 'Pilihan tidak valid',
      text: 'Kamu harus memilih minimal 5 dan maksimal 7 pernyataan.',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-biru hover:bg-biru/80 text-white px-4 py-2 rounded'
      },
      buttonsStyling: false
    });
    return;
  }

  const confirm = await Swal.fire({
    title: 'Lanjut ke tahap berikutnya?',
    text: 'Pastikan pilihan kamu sudah sesuai sebelum melanjutkan.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, lanjut',
    cancelButtonText: 'Batal',
    reverseButtons: true,
    customClass: {
      confirmButton: 'bg-biru hover:bg-biru/80 text-white px-4 py-2 rounded ml-5',
      cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded'
    },
    buttonsStyling: false
  });

  if (confirm.isConfirmed) {
    // Loading modal
    Swal.fire({
      title: 'Mengirim data...',
      text: 'Mohon tunggu sebentar.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading()
    });

    if (currentPage.value === maxPage) {
      await submitAnswers();
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    Swal.close();

    await Swal.fire({
      title: 'Berhasil!',
      text: 'Silakan lanjut ke tahap selanjutnya.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-biru hover:bg-green-600 text-white px-4 py-2 rounded'
      },
      buttonsStyling: false
    });

    currentPage.value++;
    await nextTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.querySelector('.scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};

const submitAnswers = async () => {
  const allAnswers = []
  for (let page = 1; page <= 4; page++) {
    const selected = selectedPerPage[page]
    for (const qId of selected) {
      allAnswers.push({
        question_id: qId,
        page,
        selected: 1 // ✅ ganti dari true → 1
      })
    }
  }

  const token = Cookies.get('token')
  try {
    await initAPI('post', 'customers/mapping', { answers: allAnswers }, token)
    await getUserData()
  } catch (error) {
    console.error("Error submitting answers", error)
  }
}

const getQuestions = async () => {
  const token = Cookies.get('token')
  loading.value = true
  try {
    const respon = await initAPI('get', 'mapping/questions', null, token)

    // Acak urutan pertanyaan
    const shuffled = respon.data.questions
      .map(q => ({ q, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ q }) => q)

    questions.value = shuffled
    // console.log('Question Mapping (Shuffled)', questions.value)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}



const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const userData = await initAPI('post', 'login', formData, token)

        customerId.value = userData.data.customer.id
        isTested.value = userData.data.customer.customers_mapping == null ? false : true
        // console.log(customerId.value)
        // console.log(isTested.value)   
    } catch (error) {
        // console.log(`error`, error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User',
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
  await getUserData()
  await getQuestions()
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>