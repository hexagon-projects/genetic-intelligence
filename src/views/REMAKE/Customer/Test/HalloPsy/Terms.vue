<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import Cookies from 'js-cookie';
import initAPI from '@/api/api';
import { loadFromStorage, saveToStorage, clearStorage } from '../../../../../utils/storage';

const STORAGE_KEY = 'termsAccepted';

const router = useRouter()
const store = useStore();

const showPaymentModal = ref(false)
const isClosing = ref(false)
const isMobile = ref(false)
const paymentProcessing = ref(false)
const paymentSuccess = ref(false)
const paymentError = ref(null)
const meetLink = ref(null)

const checkedTerms = ref([])

const paymentMethods = ref([])
const loading = ref(false)
const error = ref(null)

const selectedPaymentMethod = ref(null)

const virtualAccountOpen = ref(false)
const digitalPaymentOpen = ref(false)
const instantPaymentOpen = ref(false)

const paymentGroups = computed(() => {
  const groups = {
    virtualAccount: [],
    digitalPayment: [],
    instantPayment: []
  }

  paymentMethods.value.forEach(method => {
    if (method.paymentMethod.startsWith('VA') || method.paymentMethod.startsWith('B') ||
      method.paymentMethod.startsWith('I') || method.paymentMethod.startsWith('M') ||
      method.paymentMethod.startsWith('BR') || method.paymentMethod.startsWith('NC') ||
      method.paymentMethod.startsWith('BV')) {
      groups.virtualAccount.push(method)
    }
    else if (method.paymentMethod.startsWith('OV') || method.paymentMethod.startsWith('DA') ||
      method.paymentMethod.startsWith('LA') || method.paymentMethod.startsWith('SA') ||
      method.paymentMethod.startsWith('LQ') || method.paymentMethod.startsWith('SL') ||
      method.paymentMethod.startsWith('OL') || method.paymentMethod.startsWith('JP')) {
      groups.digitalPayment.push(method)
    }
    else if (method.paymentMethod.startsWith('IR') || method.paymentMethod.startsWith('FT') ||
      method.paymentMethod.startsWith('SP') || method.paymentMethod.startsWith('NQ') ||
      method.paymentMethod.startsWith('GQ')) {
      groups.instantPayment.push(method)
    }
  })

  return groups
})

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

const initializeCheckedTerms = () => {
  checkedTerms.value = []
  termsAndConditions.forEach((item) => {
    item.items.forEach(() => {
      checkedTerms.value.push(false)
    })
  })
}

const fetchPaymentMethods = async () => {
  try {
    loading.value = true
    const token = Cookies.get('token')
    const response = await initAPI('get', 'payment/methods', null, token)
    paymentMethods.value = response.data.data.paymentFee
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch payment methods:', err)
  } finally {
    loading.value = false
  }
}

const storedTerms = loadFromStorage(STORAGE_KEY);
if (storedTerms) {
  checkedTerms.value = storedTerms;
}

watch(checkedTerms, (newTerms) => {
  saveToStorage(STORAGE_KEY, newTerms);
}, { deep: true });


const processPayment = async () => {
  try {
    paymentProcessing.value = true;
    paymentError.value = null;

    const bookingData = store.state.bookingProcess;
    const token = Cookies.get('token');

    const bookingResponse = await initAPI('post', 'user/bookings', {
      consultants_id: bookingData.consultantId,
      slot_id: bookingData.selectedSlot.id,
      package_id: bookingData.selectedPackage.id,
      amount: bookingData.selectedPackage.price,
      medical_answers: Object.entries(bookingData.medicalAnswers)
        .map(([questionId, answer]) => ({
          question_id: parseInt(questionId),
          answer
        })),
      counseling_answers: Object.entries(bookingData.counselingAnswers)
        .map(([questionId, answer]) => ({
          question_id: parseInt(questionId),
          answer
        }))
    }, token);

    const bookingId = bookingResponse.data.data.id;

    const paymentResponse = await initAPI('post', `user/bookings/${bookingId}/pay`, {
      payment_method: selectedPaymentMethod.value.paymentMethod
    }, token);

    if (paymentResponse.data.success) {
      clearStorage('bookingTimeFilter2')
      clearStorage('bookingData')
      meetLink.value = paymentResponse.data.data.meet_link;
      paymentSuccess.value = true;
      ['bookingData', 'medicalAnswers', 'counselingAnswers', 'termsAccepted'].forEach(key => {
        clearStorage(key);
      });
    } else {
      paymentError.value = paymentResponse.data.message || 'Payment processing failed';
    }

  } catch (err) {
    console.error('Payment processing failed:', err);
    paymentError.value = err.response?.data?.message || 'Payment processing failed. Please try again.';
  } finally {
    paymentProcessing.value = false;
  }
};

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  initializeCheckedTerms()
  fetchPaymentMethods()
})

const terms = `
    <h1>Syarat dan Ketentuan Jatidiri.app</h1>
    <ol>
        <li>
            <h2>Pendahuluan</h2>
            <p>Dengan mengakses dan menggunakan layanan Jatidiri.app, Anda menyetujui Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan salah satu bagian dari ketentuan ini, mohon untuk tidak menggunakan layanan kami.</p>
        </li>
        <li>
            <h2>Layanan yang Ditawarkan</h2>
            <p>Jatidiri.app menyediakan layanan konseling digital dan berbagai tes psikologi untuk membantu pengguna memahami diri mereka lebih baik.</p>
        </li>
        <li>
            <h2>Pendaftaran Akun</h2>
            <ul>
                <li>Pengguna harus mendaftar dengan informasi yang akurat.</li>
                <li>Pengguna bertanggung jawab untuk menjaga keamanan akun mereka.</li>
                <li>Pengguna tidak diperkenankan untuk membagikan akun mereka kepada pihak lain.</li>
            </ul>
        </li>
        <li>
            <h2>Penggunaan Layanan</h2>
            <ul>
                <li>Layanan ini hanya dapat digunakan untuk tujuan pribadi dan tidak boleh disalahgunakan untuk tujuan ilegal.</li>
                <li>Jatidiri Apps berhak untuk menangguhkan akun yang melanggar kebijakan ini.</li>
            </ul>
        </li>
        <li>
            <h2>Biaya dan Pembayaran</h2>
            <ul>
                <li>Beberapa layanan dalam Jatidiri Apps memerlukan pembayaran.</li>
                <li>Pembayaran dilakukan melalui metode yang tersedia di platform.</li>
                <li>Tidak ada pengembalian dana kecuali dalam keadaan tertentu sesuai kebijakan kami.</li>
            </ul>
        </li>
        <li>
            <h2>Kerahasiaan dan Keamanan Data</h2>
            <p>Kami menjaga kerahasiaan data pengguna sesuai dengan Kebijakan Privasi.</p>
        </li>
        <li>
            <h2>Perubahan Syarat dan Ketentuan</h2>
            <p>Kami berhak untuk mengubah Syarat dan Ketentuan ini sewaktu-waktu. Pengguna disarankan untuk memeriksa secara berkala.</p>
        </li>
        <li>
            <h2>Hukum yang Berlaku</h2>
            <p>Syarat dan Ketentuan ini diatur oleh hukum yang berlaku di Indonesia.</p>
        </li>
    </ol>
`;

const termsAndConditions = [
  {
    section: "Agreement",
    items: [
      "With this, I give approval to start counseling digitally with the psychologist]. I understand that I can contact the psychologist if I have a question or concern .",
    ]
  }
];

const handleCheckboxChange = (sectionIndex, itemIndex) => {
  let flatIndex = 0;
  for (let i = 0; i < sectionIndex; i++) {
    flatIndex += termsAndConditions[i].items.length;
  }
  flatIndex += itemIndex;

  checkedTerms.value[flatIndex] = !checkedTerms.value[flatIndex]
}

const allTermsAccepted = computed(() => {
  return checkedTerms.value.length > 0 &&
    checkedTerms.value.every(checked => checked)
})

const openPaymentModal = () => {
  if (!allTermsAccepted.value) return;
  showPaymentModal.value = true
  isClosing.value = false
}

const closePaymentModal = () => {
  isClosing.value = true
  setTimeout(() => {
    showPaymentModal.value = false
    virtualAccountOpen.value = false
    digitalPaymentOpen.value = false
    instantPaymentOpen.value = false
  }, 500)
}

const toggleVirtualAccount = () => {
  digitalPaymentOpen.value = false
  instantPaymentOpen.value = false
  virtualAccountOpen.value = !virtualAccountOpen.value
}

const toggleDigitalPayment = () => {
  virtualAccountOpen.value = false
  instantPaymentOpen.value = false
  digitalPaymentOpen.value = !digitalPaymentOpen.value
}

const toggleInstantPayment = () => {
  virtualAccountOpen.value = false
  digitalPaymentOpen.value = false
  instantPaymentOpen.value = !instantPaymentOpen.value
}

const goBack = () => {
  router.go(-1);
};

const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method
  closePaymentModal()
  processPayment()
}
</script>

<template>
  <div class="w-full min-h-screen bg-[#F0F7FD]">
    <div
      class="p-4 lg:px-20 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12 bg-[#F0F7FD] font-sora pb-20 md:pb-0 text-[#494949] md:max-w-[60%] lg:max-w-[40%] mx-auto">
      <div class="flex justify-between items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none" @click="goBack"
          class="cursor-pointer">
          <path
            d="M7.46967 0.46967C7.76256 0.176777 8.23744 0.176777 8.53033 0.46967C8.82322 0.762563 8.82322 1.23744 8.53033 1.53033L3.35876 6.70191C2.08955 7.97112 2.08955 10.0289 3.35876 11.2981L8.53033 16.4697C8.82322 16.7626 8.82322 17.2374 8.53033 17.5303C8.23744 17.8232 7.76256 17.8232 7.46967 17.5303L2.2981 12.3588C0.443109 10.5038 0.443106 7.49624 2.29809 5.64125L7.46967 0.46967Z"
            fill="#363538" />
        </svg>
        <h1 class="text-xl md:text-2xl font-bold">Terms & Condition</h1>
        <div></div>
      </div>

      <div>
        <p class="text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4
        [&_li]:my-2 [&_h2]:font-bold" v-html="terms"></p>
      </div>

      <div v-for="(item, sectionIndex) in termsAndConditions" :key="sectionIndex" class="space-y-2">
        <p class="text-sm font-bold">{{ item.section }}</p>
        <div v-for="(statement, itemIndex) in item.items" :key="itemIndex" class="">
          <input type="checkbox" :id="`statement-${sectionIndex}-${itemIndex}`"
            @change="handleCheckboxChange(sectionIndex, itemIndex)">
          <label :for="`statement-${sectionIndex}-${itemIndex}`" class="text-sm ml-2">{{ statement }}</label>
        </div>
      </div>

      <div class="hidden md:block">
        <button @click="openPaymentModal" :disabled="!allTermsAccepted"
          class="w-full py-3 rounded-full font-bold transition-colors duration-200"
          :class="allTermsAccepted ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white cursor-not-allowed'">
          Process
        </button>
      </div>

      <div class="fixed bottom-4 left-4 right-4 md:hidden">
        <button @click="openPaymentModal" :disabled="!allTermsAccepted"
          class="w-full py-3 rounded-full font-bold transition-colors duration-200"
          :class="allTermsAccepted ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white cursor-not-allowed'">
          Process
        </button>
      </div>
    </div>

    <!-- Payment Processing Modal -->
    <div v-if="paymentProcessing"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#CBCBFD]/10 rounded-3xl">
        </div>
        <div class="relative z-10">
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="absolute inset-0 rounded-full animate-pulse bg-blue-100"></div>
              <div
                class="relative w-20 h-20 rounded-full flex items-center justify-center transform scale-0 icon-scale bg-gradient-to-br from-blue-400 to-blue-600">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
              </div>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-center mb-3 text-gray-800 opacity-0 title-fade">Processing</h3>
          <p class="text-center mb-8 text-gray-600 leading-relaxed opacity-0 message-fade">Please wait while we process
            your payment...</p>
        </div>
      </div>
    </div>

    <!-- Payment Success Modal -->
    <div v-if="paymentSuccess"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div class="absolute inset-0 bg-gradient-to-br from-green-100 via-transparent to-[#CBCBFD]/10 rounded-3xl">
        </div>
        <div class="relative z-10">
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="absolute inset-0 rounded-full animate-pulse bg-green-100"></div>
              <div
                class="relative w-20 h-20 rounded-full flex items-center justify-center transform scale-0 icon-scale bg-gradient-to-br from-green-400 to-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white transform rotate-0 icon-rotate"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-3 h-3 rounded-full particle-1 bg-green-300"></div>
              <div class="absolute -bottom-2 -left-2 w-2 h-2 rounded-full particle-2 bg-green-400"></div>
              <div class="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full particle-3 bg-green-200"></div>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-center mb-3 text-gray-800 opacity-0 title-fade">Success!</h3>
          <p class="text-center mb-4 text-gray-600 leading-relaxed opacity-0 message-fade">Your booking has been
            confirmed.</p>
          <div class="mb-6 p-3 bg-gray-100 rounded opacity-0 message-fade">
            <p class="font-medium text-center">Meeting Link:</p>
            <a :href="meetLink" target="_blank" class="text-blue-600 break-all text-center block">{{ meetLink }}</a>
          </div>
          <button @click="router.push('/hallopsy')"
            class="w-full py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/20 opacity-0 button-fade">
            Back to Home
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Error Modal -->
    <div v-if="paymentError"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div class="absolute inset-0 bg-gradient-to-br from-red-100 via-transparent to-[#CBCBFD]/10 rounded-3xl"></div>
        <div class="relative z-10">
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="absolute inset-0 rounded-full animate-pulse bg-red-100"></div>
              <div
                class="relative w-20 h-20 rounded-full flex items-center justify-center transform scale-0 icon-scale bg-gradient-to-br from-red-400 to-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white transform rotate-0 icon-rotate"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-3 h-3 rounded-full particle-1 bg-red-300"></div>
              <div class="absolute -bottom-2 -left-2 w-2 h-2 rounded-full particle-2 bg-red-400"></div>
              <div class="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full particle-3 bg-red-200"></div>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-center mb-3 text-gray-800 opacity-0 title-fade">Oops!</h3>
          <p class="text-center mb-8 text-gray-600 leading-relaxed opacity-0 message-fade">{{ paymentError }}</p>
          <button @click="paymentError = null"
            class="w-full py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/20 opacity-0 button-fade">
            Try Again
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Modal Mobile -->
    <div v-if="showPaymentModal && isMobile"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end z-50 transition-all duration-300 font-sora"
      @click.self="closePaymentModal">
      <div :class="['w-full bg-white rounded-t-3xl relative', isClosing ? 'animate-slide-down' : 'animate-slide-up']">
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold">Select a Payment Method</h2>
            <button @click="closePaymentModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="mb-6">
            <button @click="toggleVirtualAccount"
              class="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <h3 class="text-md font-semibold">Virtual Account</h3>
              <svg
                :class="['w-5 h-5 transition-transform duration-300 ease-in-out', virtualAccountOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="virtualAccountOpen" class="mt-3 grid grid-cols-2 gap-2 overflow-hidden">
                <div v-for="method in paymentGroups.virtualAccount" :key="method.paymentMethod"
                  class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 ml-4"
                  @click="selectPaymentMethod(method)">
                  <img :src="method.paymentImage" :alt="method.paymentName"
                    class="w-8 h-8 rounded-full mr-3 object-contain">
                  <span>{{ method.paymentName }}</span>
                </div>
              </div>
            </transition>
          </div>

          <div class="mb-6">
            <button @click="toggleDigitalPayment"
              class="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <h3 class="text-md font-semibold">Digital Payment Method</h3>
              <svg
                :class="['w-5 h-5 transition-transform duration-300 ease-in-out', digitalPaymentOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="digitalPaymentOpen" class="mt-3 grid grid-cols-2 gap-3 overflow-hidden">
                <div v-for="method in paymentGroups.digitalPayment" :key="method.paymentMethod"
                  class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  @click="selectPaymentMethod(method)">
                  <img :src="method.paymentImage" :alt="method.paymentName"
                    class="w-8 h-8 rounded-full mr-3 object-contain">
                  <span>{{ method.paymentName }}</span>
                </div>
              </div>
            </transition>
          </div>

          <div>
            <button @click="toggleInstantPayment"
              class="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <h3 class="text-md font-semibold">Instant Payment</h3>
              <svg
                :class="['w-5 h-5 transition-transform duration-300 ease-in-out', instantPaymentOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="instantPaymentOpen" class="mt-3 overflow-hidden">
                <div v-for="method in paymentGroups.instantPayment" :key="method.paymentMethod"
                  class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 ml-4"
                  @click="selectPaymentMethod(method)">
                  <img :src="method.paymentImage" :alt="method.paymentName"
                    class="w-8 h-8 rounded-full mr-3 object-contain">
                  <span>{{ method.paymentName }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal Desktop -->
    <div v-if="showPaymentModal && !isMobile"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 font-sora"
      @click.self="closePaymentModal">
      <div
        :class="['bg-white rounded-3xl relative w-full max-w-md mx-4', isClosing ? 'animate-fade-out' : 'animate-fade-in']">
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold">Select a Payment Method</h2>
            <button @click="closePaymentModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="mb-6">
            <button @click="toggleVirtualAccount"
              class="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <h3 class="text-md font-semibold">Virtual Account</h3>
              <svg
                :class="['w-5 h-5 transition-transform duration-300 ease-in-out', virtualAccountOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="virtualAccountOpen" class="mt-3 grid grid-cols-2 gap-2 overflow-hidden">
                <div v-for="method in paymentGroups.virtualAccount" :key="method.paymentMethod"
                  class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 ml-4"
                  @click="selectPaymentMethod(method)">
                  <img :src="method.paymentImage" :alt="method.paymentName"
                    class="w-8 h-8 rounded-full mr-3 object-contain">
                  <span>{{ method.paymentName }}</span>
                </div>
              </div>
            </transition>
          </div>

          <div class="mb-6">
            <button @click="toggleDigitalPayment"
              class="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <h3 class="text-md font-semibold">Digital Payment Method</h3>
              <svg
                :class="['w-5 h-5 transition-transform duration-300 ease-in-out', digitalPaymentOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="digitalPaymentOpen" class="mt-3 grid grid-cols-2 gap-3 overflow-hidden">
                <div v-for="method in paymentGroups.digitalPayment" :key="method.paymentMethod"
                  class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  @click="selectPaymentMethod(method)">
                  <img :src="method.paymentImage" :alt="method.paymentName"
                    class="w-8 h-8 rounded-full mr-3 object-contain">
                  <span>{{ method.paymentName }}</span>
                </div>
              </div>
            </transition>
          </div>

          <div>
            <button @click="toggleInstantPayment"
              class="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <h3 class="text-md font-semibold">Instant Payment</h3>
              <svg
                :class="['w-5 h-5 transition-transform duration-300 ease-in-out', instantPaymentOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="instantPaymentOpen" class="w-full mt-3 overflow-hidden">
                <div v-for="method in paymentGroups.instantPayment" :key="method.paymentMethod"
                  class="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  @click="selectPaymentMethod(method)">
                  <img :src="method.paymentImage" :alt="method.paymentName"
                    class="w-8 h-8 rounded-full mr-3 object-contain">
                  <span>{{ method.paymentName }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

.animate-slide-down {
  animation: slide-down 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-out {
  animation: fade-out 0.5s ease-out forwards;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-in-out;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 300px;
}

.modal-overlay {
  animation: overlayFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content {
  animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon-scale {
  animation: iconScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
}

.icon-rotate {
  animation: iconRotate 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
}

.title-fade {
  animation: fadeInUp 0.6s ease-out 0.6s forwards;
}

.message-fade {
  animation: fadeInUp 0.6s ease-out 0.8s forwards;
}

.button-fade {
  animation: fadeInUp 0.6s ease-out 1s forwards;
}

.particle-1 {
  animation: floatParticle1 2s ease-in-out infinite 0.5s;
}

.particle-2 {
  animation: floatParticle2 2.5s ease-in-out infinite 0.8s;
}

.particle-3 {
  animation: floatParticle3 3s ease-in-out infinite 1.1s;
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes iconScale {
  from {
    transform: scale(0) rotate(-180deg);
  }

  to {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes iconRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatParticle1 {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-10px) rotate(180deg);
  }
}

@keyframes floatParticle2 {

  0%,
  100% {
    transform: translateX(0) rotate(0deg);
  }

  50% {
    transform: translateX(8px) rotate(-180deg);
  }
}

@keyframes floatParticle3 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  33% {
    transform: translate(5px, -5px) rotate(120deg);
  }

  66% {
    transform: translate(-3px, -8px) rotate(240deg);
  }
}

@supports (backdrop-filter: blur(12px)) {
  .modal-overlay {
    backdrop-filter: blur(12px);
  }

  .modal-content {
    backdrop-filter: blur(16px);
  }
}
</style>