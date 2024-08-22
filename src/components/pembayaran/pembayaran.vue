<template>
    <section class="bg-gray-100 py-[6vh]">
        <modalInfo v-if="showModal" @understand="toggleModal"/>

        <div class="flex flex-col items-center lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="bg-white mx-4 w-full lg:w-9/12 lg:mx-auto px-10 py-4 shadow-sm rounded-lg">
                <div class="lg:hidden flex flex-col items-center gap-2">
                    <div class="w-full">
                        <label for="code_voucher" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Kode Voucher:</label>
                        <input v-model="code_voucher" type="text" name="code_voucher" class="mt-1 p-2 border placeholder:text-sm rounded-md w-full bg-white focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kode"/>
                    </div>
                    <div class="flex items-center gap-1">
                        <PhInfo :size="28"/>
                        <p class="font-myFont text-neutral-500 text-xs">Jika punya, Gunakan kode voucher saat mendaftar untuk meraih keuntungan tambahan.</p>
                    </div>
                </div>

                <hr class="my-4 lg:hidden">

                <div class="lg:hidden flex flex-col justify-center items-center gap-2">
                    <div class="w-full">
                        <label for="metode_pembayaran" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                        <input v-model="paymentType" type="text" name="metode_pembayaran" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Pilih Metode Pembayaran" readonly />
                    </div>
                    <div class="w-full">
                        <label for="total_fee" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                        <input v-model="totalFee" type="text" name="total_fee" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Rp.0" readonly />
                    </div>
                    <div class="w-full mb-2">
                        <label for="payment_code" class="block text-xs md:text-sm font-myFont font-medium text-gray-600">Biaya Admin:</label>
                        <input v-model="feePaymentMethod" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Rp.0" readonly />
                    </div>
                </div>

                <h1 class="hidden lg:block font-myFont text-dark text-lg mb-10">
                    Lakukan pembayaran sekarang
                </h1>
                
                <div class="hidden lg:flex items-center gap-4">
                    <div class="w-1/4 mb-4">
                        <label for="code_voucher" class="block text-sm font-myFont font-medium text-gray-600">Kode Voucher:</label>
                        <input v-model="code_voucher" type="text" name="code_voucher" class="mt-1 p-2 border placeholder:text-sm rounded-md w-full bg-white focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kode"/>
                    </div>
                    <div class="flex items-center mt-2 gap-1">
                        <PhInfo :size="20"/>
                        <p class="font-myFont text-neutral-500 text-sm">Jika punya, Gunakan kode voucher saat mendaftar untuk meraih keuntungan tambahan.</p>
                    </div>
                </div>

                <hr class="hidden lg:block mt-1 mb-4">

                <div class="hidden lg:flex justify-center items-center gap-2 mt-2">
                    <div class="w-1/3 mb-4">
                        <label for="metode_pembayaran" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                        <input v-model="paymentType" type="text" name="metode_pembayaran" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                    </div>
                    <div class="w-1/3 mb-4">
                        <label for="total_fee" class="block text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                        <input v-model="totalFee" type="text" name="total_fee" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                    </div>
                    <div class="w-1/3 mb-4">
                        <label for="payment_code" class="block text-sm font-myFont font-medium text-gray-600">Biaya Admin:</label>
                        <input v-model="feePaymentMethod" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                    </div>
                </div>
                <!-- end form pembayaran -->

                <div v-if="loadingFetch" class="flex justify-center h-52 pt-14 w-full">
                    <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                </div>

                <div v-if="!loadingFetch && paymentMethod" class="-ml-2 flex flex-col gap-2 max-h-36 lg:max-h-48 mb-2">
                    <div class="py-2 px-2 grid grid-cols-4 gap-2 overflow-y-scroll w-full">
                        <a @click="pilihPayment(payment.paymentMethod, payment.paymentName, payment.totalFee)" v-for="(payment, index) in paymentMethod" :key="index" class="cursor-pointer hover:animate-wiggle bg-white border rounded-lg shadow-sm px-2 py-2">
                            <img :src="payment.paymentImage" :alt="payment.paymentName">
                        </a>
                    </div>
                </div>

                <div class="flex justify-end pt-2">
                    <button @click="submitPayment" class="bg-biru text-white font-myFont px-4 py-2 rounded-lg">
                        Bayar
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import initAPI from '../../api/api'
import { useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import modalInfo from './modalInfo.vue'
import DOMPurify from 'dompurify'

export default {
    name: 'HalamanPembayaran',
    components: { modalInfo },
    setup(){
        const showModal = ref(true)

        const route = useRoute()
        const loadingFetch = ref(false)
        const tipeParam = ref('')

        const code_voucher = ref('')
        const paymentType = ref('')
        const paymentCode = ref('')
        const totalFee = ref('')
        const feePaymentMethod = ref('')

        const paymentMethod = ref([])

        const getHarga = async() => {
            if(!totalFee.value){
                try {
                    const endpoint = tipeParam.value == 'test-iq' 
                    ? 'test/payment?type=iq' 
                    : tipeParam.value == 'test-gim' 
                    ? 'test/payment?type=gim' : 'test/payment?type=assessment'
                    
                    const response = await initAPI('get', endpoint, null, null)
                    console.log(response.data)
                    totalFee.value = response.data.price
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data harga pembayaran.',
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            }
        }

        const pilihPayment = (code, payment, fee) => {
            console.log(`${payment} - ${fee}`)
            paymentType.value = payment
            paymentCode.value = code
            feePaymentMethod.value = fee
            getHarga()
        }

        const submitPayment = async() => {
            const token = Cookies.get('token')

            const data = {
                voucher_code: DOMPurify.sanitize(code_voucher.value),
                // school_code: DOMPurify.sanitize(code_voucher.value),
                customer_id: JSON.parse(localStorage.getItem('userData')).id,
                payment_method_code: paymentCode.value,
                fee: feePaymentMethod.value
                // fee: parseInt(totalFee.value.replace(/\./g, ''), 10)
                // fee: totalFee.value
            }

            const endpoint = tipeParam.value == 'test-iq' 
            ? 'v2/payment/test/iq' 
            : tipeParam.value == 'test-gim' 
            ? 'v2/payment/test/gim' : 'v2/payment/test/assessment'

            console.log(`bayar ke: `, endpoint)
            console.log(`data dikirim:`, data)

            try {
                loadingFetch.value = true
                const response = await initAPI('post', endpoint, JSON.stringify(data), token)
                console.log(response.data)
                
                const url = response.data.data.paymentUrl
                let fixedUrl = ''
                let refValue = ''

                localStorage.setItem('merchantId', JSON.stringify(response.data.payment_data.merchant_order_id))

                if(url.includes('ref=')){
                    fixedUrl = 'https://sandbox.duitku.com/TopUp/v2/TopUpVAPage.aspx?ref='
                    refValue = url.split('ref=')[1]
                }else if(url.includes('reference=')){
                    console.log('reference', url)
                    fixedUrl = 'https://sandbox.duitku.com/topup/v2/TopUpCreditCardPayment.aspx?reference='
                    refValue = url.split('reference=')[1]
                }

                window.location.href = fixedUrl+refValue
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Terjadi kesalahan saat melakukan pembayaran.',
                    showConfirmButton: false,
                    timer: 2500
                });
            } finally {
                loadingFetch.value = false
            }

        }

        onMounted(async() => {
            loadingFetch.value = !loadingFetch.value
            try {
                const response = await initAPI('get', 'payment/methods', null, null)
                paymentMethod.value = response.data.paymentFee

            } catch(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Terjadi kesalahan saat mengambil data metode pembayaran.',
                    showConfirmButton: false,
                    timer: 2500
                });
            }

            // console.log(route.params.tipePembayaran)
            tipeParam.value = route.params.tipePembayaran
            loadingFetch.value = !loadingFetch.value
        })

        const toggleModal = () => {
            showModal.value = !showModal.value
        }


        return {
            showModal,
            toggleModal,
            loadingFetch,
            code_voucher,
            paymentType,
            paymentCode,
            totalFee,
            feePaymentMethod,
            paymentMethod,
            pilihPayment,
            submitPayment
        }
    }
}
</script>