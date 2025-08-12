<template>
  <div class="py-8 px-4">
    <div class="w-full mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-semibold text-gray-900 mb-2">
          Metode Pembayaran
        </h1>
        <p class="text-gray-600">Pilih cara pembayaran yang Anda inginkan</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Payment Methods -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h2
              class="text-lg font-medium text-gray-900 mb-4 flex items-center"
            >
              <span
                class="w-6 h-6 bg-gray-100 rounded mr-3 flex items-center justify-center text-sm"
                >🏦</span
              >
              Bank Transfer
            </h2>

            <div class="space-y-3">
              <!-- Skeleton loader -->
              <div v-if="loadingMethod">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="animate-pulse bg-gray-100 h-20 rounded-md"
                ></div>
              </div>

              <!-- Payment method list -->
              <div v-else>
                <div
                  v-for="bank in paymentMethod"
                  :key="bank.id"
                  @click="selectPaymentMethod(bank)"
                  :class="[
                    'border rounded-lg p-4 cursor-pointer transition-colors',
                    selectedMethod === bank.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300',
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center space-x-2">
                        <div
                          :class="[
                            'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                            selectedMethod === bank.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300',
                          ]"
                        >
                          <div
                            v-if="selectedMethod === bank.id"
                            class="w-2 h-2 bg-white rounded-full"
                          ></div>
                        </div>
                        <div
                          class="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center text-sm font-medium text-gray-700"
                        >
                          {{ bank.initial_method }}
                        </div>
                      </div>
                      <div>
                        <h3 class="font-medium text-gray-900">
                          {{ bank.paymant_method }}
                        </h3>
                        <p class="text-sm text-gray-500">{{ bank.status }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-gray-600">Fee: Rp{{ bank.fee }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-6">
          <div
            class="bg-white rounded-lg border border-gray-200 p-6 sticky top-4"
          >
            <h2 class="text-lg font-medium text-gray-900 mb-4">
              Ringkasan Pesanan
            </h2>

            <!-- Skeleton for payment data -->
            <div v-if="loadingPayment">
              <div class="animate-pulse space-y-4">
                <div class="bg-gray-100 h-5 rounded w-2/3"></div>
                <div class="bg-gray-100 h-5 rounded w-1/2"></div>
                <div class="bg-gray-100 h-5 rounded w-full"></div>
              </div>
            </div>

            <!-- Payment summary -->
            <div v-else>
              <div class="border-b border-gray-200 pb-4 mb-4">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center"
                  >
                    <span class="text-gray-600 text-sm">📦</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-900">
                      {{ paymant?.name }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ paymant?.type_paymant }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="text-gray-900"
                    >Rp. {{ paymant?.amount || 0 }}</span
                  >
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Biaya Admin</span>
                  <span class="text-gray-900"
                    >Rp. {{ processingFee || 0 }}</span
                  >
                </div>
                <hr class="border-gray-200" />
                <div class="flex justify-between font-medium">
                  <span class="text-gray-900">Total</span>
                  <span class="text-gray-900">Rp. {{ totalAmount }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <button
                  @click="processPayment"
                  :disabled="!selectedMethod"
                  :class="[
                    'w-full py-3 px-4 rounded-md font-medium transition-colors',
                    selectedMethod
                      ? 'bg-biru hover:bg-biru/80 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                  ]"
                >
                  <span v-if="!selectedMethod">Pilih Metode Pembayaran</span>
                  <span v-else>Bayar Rp. {{ totalAmount }}</span>
                </button>
              </div>

              <div
                class="mt-6 p-3 bg-green-50 border border-green-200 rounded-md"
              >
                <div class="flex items-center space-x-2">
                  <span class="text-green-600 text-sm">🔒</span>
                  <div>
                    <p class="text-sm font-medium text-green-800">
                      Pembayaran Aman
                    </p>
                    <p class="text-xs text-green-700">
                      Informasi Anda dilindungi dengan enkripsi SSL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import initAPI from "@/api/api";
import { useRoute } from "vue-router";
import Cookies from "js-cookie";

const route = useRoute();
const paymantType = route.query.paymant_type;

const paymentMethod = ref([]);
const selectedMethod = ref(null);
const initial_method = ref(null);
const processingFee = ref(0);
const paymant = ref({});

// Loader flags
const loadingMethod = ref(true);
const loadingPayment = ref(true);

const totalAmount = computed(() => {
  const amount = parseFloat(paymant.value?.amount || 0);
  const fee = parseFloat(processingFee.value || 0);
  return amount + fee;
});

const selectPaymentMethod = (bank) => {
  selectedMethod.value = bank.id;
  initial_method.value = bank.initial_method;
  processingFee.value = bank.fee;
};

const getPaymantMethods = async () => {
  loadingMethod.value = true;
  try {
    const response = await initAPI("get", "payment/methodes", null, null);
    paymentMethod.value = response.data.data;
  } catch (error) {
    console.error("Error loading methods:", error);
  } finally {
    loadingMethod.value = false;
  }
};

const getPaymant = async () => {
  loadingPayment.value = true;
  try {
    const response = await initAPI(
      "get",
      `payment/type/${paymantType}`,
      null,
      null
    );
    paymant.value = response.data.data;
  } catch (error) {
    console.error("Error loading payment:", error);
  } finally {
    loadingPayment.value = false;
  }
};

const dataPaymant = ref();
const processPayment = async () => {
  const token = Cookies.get("token");
  const payload = {
    name: paymant.value?.name,
    paymant_type: paymant.value?.id,
    amount: paymant.value?.amount,
    fee: processingFee.value,
    method_id: selectedMethod.value,
    initial_method: initial_method.value,
    total: totalAmount.value
  };

  try {
    const response = await initAPI("post", "payment/process", payload, token);
    console.log(response);

    if (response.data && response.data.data && response.data.data.paymentUrl) {
      // Arahkan ke halaman pembayaran Duitku
      window.location.href = response.data.data.paymentUrl;
    } else {
      alert("Gagal memproses pembayaran.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat proses pembayaran.");
  }
};


onMounted(() => {
  getPaymantMethods();
  getPaymant();
});
</script>
