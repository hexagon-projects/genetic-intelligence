<template>
    <section id="img-login" class="bg-biru min-h-screen">
        <div class="container mx-auto">
            <div class="flex justify-center pt-32 pb-36">
                <div class="bg-white mx-4 w-full lg:w-2/4 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
                    <div class="flex flex-col justify-center items-center mb-6">
                        <h2 class="text-black text-2xl font-myFont font-bold mb-2">Daftar</h2>
                        <a class="font-myFont text-gray-500 text-sm">
                            Sudah Punya Akun? 
                            <router-link :to="{name: 'views.login'}" class="font-myFont text-gray-500 text-sm hover:text-biru">
                                Klik untuk Masuk
                            </router-link>
                        </a>
                    </div>

                    <div class="mb-5">
                        <div
                        class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
                        >
                            <ol class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                            <li class="flex items-center gap-2 bg-white p-2">
                                <span :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 1,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 1
                                    }">
                                    1
                                </span>
                                <span class="hidden sm:block"> Detail Akun </span>
                            </li>

                            <li class="flex items-center gap-2 bg-white p-2">
                                <span
                                    :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 2,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 2
                                    }">
                                    2
                                </span>
                                <span class="hidden sm:block"> Detail Personal </span>
                            </li>

                            <li class="flex items-center gap-2 bg-white p-2">
                                <span :class="{
                                    'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 3,
                                    'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 3
                                    }">
                                    3
                                </span>
                                <span class="hidden sm:block"> Pembayaran </span>
                            </li>
                            </ol>
                        </div>
                    </div>
 

                    <div v-if="currForm === 1">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="nama_depan" class="block text-sm font-myFont font-medium text-gray-600">Nama Depan:</label>
                                <input v-model="namaDepan" type="text" id="nama_depan" name="nama_depan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Depan" />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="nama_belakang" class="block text-sm font-myFont font-medium text-gray-600">Nama Belakang:</label>
                                <input v-model="namaBelakang" type="text" id="nama_belakang" name="nama_belakang" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Belakang" />
                            </div>
                        </div>
                        
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="email" class="block text-sm font-myFont font-medium text-gray-600">Email:</label>
                                <input v-model="emailVal" type="email" id="email" name="email" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Email" />
                            </div>
    
                            <div class="w-full mb-4">
                                <label for="password" class="block text-sm font-myFont font-medium text-gray-600">Password:</label>
                                <input v-model="passwordVal" type="password" id="password" name="password" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password" />
                            </div>
                        </div>

                        <div class="w-full mb-4">
                            <label for="no_whatsapp" class="block text-sm font-myFont font-medium text-gray-600">No Whatsapp:</label>
                            <input v-model="noWhatsapp" @keyup="validation" type="text" id="no_whatsapp" name="no_whatsapp" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="08xxxxx" />
                            <a v-if="validasiWA && validasiWA !== ''" class="text-xs text-red-500">{{ validasiWA }}</a>
                        </div>

                    </div>

                    <div v-else-if="currForm === 2" class="mx-2">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="gol_darah" class="block text-sm font-myFont font-medium text-gray-600">Golongan Darah:</label>
                                <select v-model="golDarah" name="gol_darah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Gol. Darah --</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </select>
                                <!-- <input v-model="golDarah" type="text" name="gol_darah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Golongan Darah" /> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="agama" class="block text-sm font-myFont font-medium text-gray-600">Agama:</label>
                                <select v-model="agama" name="agama" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Agama --</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Kristen">Kristen</option>
                                    <option value="Katholik">Katholik</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Buddha">Buddha</option>
                                    <option value="Lainya">Lainya</option>
                                </select>
                                <!-- <input v-model="agama" type="text" id="agama" name="agama" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Agama" /> -->
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="Tempat Lahir" class="block text-sm font-myFont font-medium text-gray-600">Tempat Lahir:</label>
                                <input v-model="tempatLahir" type="text" id="tempat_lahir" name="tempat_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Contoh: Bandung" />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="tgl_lahir" class="block text-sm font-myFont font-medium text-gray-600">Tanggal Lahir:</label>
                                <input v-model="tglLahir" type="date" id="tgl_lahir" name="tgl_lahir" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Tanggal Lahir" />
                            </div>
                        </div>
                        
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="jenis_kelamin" class="block text-sm font-myFont font-medium text-gray-600">Jenis Kelamin:</label>
                                <select v-model="jenisKelamin" name="jenis_kelamin" id="jenis_kelamin" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Opsi --</option>
                                    <option value="1">Laki - Laki</option>
                                    <option value="2">Perempuan</option>
                                </select>
                            </div>
                            <div class="w-full mb-4">
                                <label for="status_nikah" class="block text-sm font-myFont font-medium text-gray-600">Status Nikah:</label>
                                <select v-model="statusNikah" name="status_nikah" id="status_nikah" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" disabled selected>-- Pilih Opsi --</option>
                                    <option value="1">Menikah</option>
                                    <option value="0">Lajang</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="provinsi" class="block text-sm font-myFont font-medium text-gray-600">Provinsi:</label>
                                <select v-model="provinsi" @change="getKota" name="provinsi" id="provinsi" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>-- Pilih Provinsi --</option>
                                    <option v-for="(option, index) in provinceOptions" :key="index" :value="option.id">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <!-- <Select2 
                                @select="getKota"
                                v-model="provinsi" 
                                :options="provinceOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Provinsi'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!-- <input v-model="provinsi" type="text" id="provinsi" name="provinsi" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Provinsi" /> -->
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="kota" class="block text-sm font-myFont font-medium text-gray-600">Kota:</label>
                                <select v-model="kota" @change="getKecamatan" name="kota" id="kota" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>-- Pilih Kota --</option>
                                    <option v-for="(option, index) in cityOptions" :key="index" :value="option.id">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <!-- <Select2 
                                @select="getKecamatan"
                                v-model="kota" 
                                :options="cityOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Kota'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!--<input v-model="kota" type="text" id="kota" name="kota" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kota" />-->
                            </div>
                        </div>
                        
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="kecamatan" class="block text-sm font-myFont font-medium text-gray-600">Kecamatan:</label>
                                <select v-model="kecamatan" @change="getKelurahan" name="kecamatan" id="kecamatan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>-- Pilih Kecamatan --</option>
                                    <option v-for="(option, index) in districtsOptions" :key="index" :value="option.id">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <!-- <Select2 
                                @select="getKelurahan"
                                v-model="kecamatan" 
                                :options="districtsOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Kecamatan'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!-- <input v-model="kecamatan" type="text" id="kecamatan" name="kecamatan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kecamatan" /> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="kelurahan" class="block text-sm font-myFont font-medium text-gray-600">Kelurahan:</label>
                                <select v-model="kelurahan" @change="saveVillagesId" name="kelurahan" id="kelurahan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white">
                                    <option value="" selected>Pilih Kelurahan</option>
                                    <option v-for="(item, index) in villagesOptions" :value="item.id" :key="index">{{ item.text }}</option>
                                </select>
                                <!-- <Select2 
                                @select="saveVillagesId"
                                v-model="kelurahan" 
                                :options="villagesOptions"
                                :settings="{width: '100%', placeholder: 'Pilih Kelurahan'}"
                                class="mt-1 p-[5px] border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru bg-white"
                                /> -->
                                <!-- <input v-model="kelurahan" type="text" id="kelurahan" name="kelurahan" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Kelurahan" /> -->
                            </div>
                        </div>

                        <div class="w-full mb-4">
                            <label for="alamat" class="block text-sm font-myFont font-medium text-gray-600">Alamat Lengkap:</label>
                            <textarea v-model="alamatLengkap" type="text" id="alamat" name="alamat" class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Alamat Lengkap"></textarea>
                        </div>
                    </div>

                    <div v-else="currForm === 3">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-1/3 mb-4">
                                <label for="metode_pembayaran" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                <input v-model="paymentType" type="text" name="metode_pembayaran" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
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

                        <div class="-ml-2 flex flex-col gap-2 max-h-36">
                            <div class="py-2 px-2 grid grid-cols-4 gap-2 overflow-y-scroll w-full">
                                <a @click="pilihPayment(payment.paymentMethod, payment.paymentName, payment.totalFee)" v-for="(payment, index) in paymentMethod" :key="index" class="cursor-pointer hover:animate-wiggle bg-white border rounded-lg shadow-sm px-2 py-2">
                                    <img :src="payment.paymentImage" :alt="payment.paymentName">
                                </a>
                            </div>

                        </div>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <button v-if="currForm > 1" @click="toggleTabs(-1)" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                            Sebelumnya
                        </button>
                        <button @click="handleButtonClick()" :disabled="isNextButtonDisabled" :class="{'ml-auto': currForm === 1, 'bg-gray-600 opacity-80 cursor-not-allowed': isNextButtonDisabled}" class="bg-biru font-myFont text-white p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                            {{ currForm === 3 ? 'Bayar' : 'Selanjutnya' }}
                        </button>
                        <!-- <img class="w-40 absolute left-[194px] bottom-0 top-0" src="../../../public/img/cc-logo.png" alt=""> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../api/api'
import DOMPurify from 'dompurify'
import jQuery from "jquery";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default{
    name: 'RegisterPage',
    // components: {Select2},
    setup(){
        const $ = jQuery;
        window.$ = $;
        const provinceOptions = ref([])
        const cityOptions = ref([])
        const districtsOptions = ref([])
        const villagesOptions = ref([])

        const currForm = ref(1)
        const namaDepan = ref('')
        const namaBelakang = ref('')
        const emailVal = ref('')
        const passwordVal = ref('')
        const noWhatsapp = ref('')
        const golDarah = ref('')
        const agama = ref('')
        const tempatLahir = ref('')
        const tglLahir = ref('')
        const jenisKelamin = ref('')
        const statusNikah = ref('')
        const provinsi = ref('')
        const kota = ref('')
        const kecamatan = ref('')
        const kelurahan = ref('')
        const alamatLengkap = ref('')
        const paymentMethod = ref([])
        const paymentType = ref('')
        const paymentCode = ref('')
        const totalFee = ref('')
        const feePaymentMethod = ref('')
        const biayaPendaftaran = ref('')

        const validasiWA = ref('')

        onMounted(async() => {
            const response = await initAPI('get', 'payment/methods', null, null)
            paymentMethod.value = response.data.paymentFee

            const province = await initAPI('get', 'region/provinces', null, null)
            console.log(province.data)
            const formattedProvince = province.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            provinceOptions.value = formattedProvince

            const biayapendaftaran = await initAPI('get', 'register/payment', null, null)
            // console.log(`biaya`,biayaPendaftaran)
            biayaPendaftaran.value = biayapendaftaran.data.price
        })

        const getKota = async() => {
            console.log(`kota:`, provinsi.value)
            const kota = await initAPI('get', 'region/regencies?province_id='+provinsi.value, null, null)
            console.log(`kota`, kota)
            const formattedKota = kota.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            cityOptions.value = formattedKota
        }

        const getKecamatan = async() => {
            console.log(`kecataman:`, kota.value)
            const kecamatan = await initAPI('get', 'region/districts?regency_id='+kota.value, null, null)
            console.log(`kecamatan`, kecamatan)
            const formattedKecamatan = kecamatan.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            districtsOptions.value = formattedKecamatan
        }

        const getKelurahan = async() => {
            console.log(`kelurahan yeuh:`, kecamatan.value)
            const kelurahan = await initAPI('get', 'region/villages?district_id='+kecamatan.value, null, null)
            console.log(`kelurahan`, kelurahan)
            const formattedKelurahan = kelurahan.data.map(item => ({
                id: item.id,
                text: item.name
            }));
            villagesOptions.value = formattedKelurahan
        }

        const saveVillagesId = () => {
            console.log(`ie yeuh villagena`, kelurahan.value)
        }

        const pilihPayment = (code, payment, fee) => {
            console.log(`${payment} - ${fee}`)
            paymentType.value = payment
            paymentCode.value = code
            feePaymentMethod.value = fee
            totalFee.value = 'Rp.'+biayaPendaftaran.value
            // alert('wkwkwk ajg')
        }

        const toggleTabs = (increment) => {
            const currTab = currForm.value + increment;

            if (currTab >= 1 && currTab <= 3) {
                currForm.value = currTab;
            }
        };

        const handleButtonClick = () => {
            if (currForm.value === 3) {
            // hitApiBayar();
                Register()
            } else {
                toggleTabs(1);
            }

        };

        const isNextButtonDisabled = computed(() => {
            switch (currForm.value) {
                case 1:
                return !namaDepan.value || !namaBelakang.value || !emailVal.value || !passwordVal.value || !noWhatsapp.value || isNaN(noWhatsapp.value);
                case 2:
                return !golDarah.value || !agama.value || !tempatLahir.value || !tglLahir.value || !jenisKelamin.value || !statusNikah.value || !provinsi.value || !kota.value || !kecamatan.value || !kelurahan.value || !alamatLengkap.value;
                case 3:
                return !paymentType.value || !totalFee.value
                default:
                return true;
            }
        });

        const validation = () => {
            if(isNaN(noWhatsapp.value)){
                console.log(`kudu number ajig`)
                validasiWA.value = 'No Whatsapp hanya bisa di isi oleh angka'
            } else {
                validasiWA.value = ''
            }
        }

        const Register = async() => {
            const data = JSON.stringify({
                "first_name": DOMPurify.sanitize(namaDepan.value),
                "last_name": DOMPurify.sanitize(namaBelakang.value),
                "email": DOMPurify.sanitize(emailVal.value),
                "password": DOMPurify.sanitize(passwordVal.value),
                "number": DOMPurify.sanitize(noWhatsapp.value),
                "religion": DOMPurify.sanitize(agama.value),
                "blood_group": DOMPurify.sanitize(golDarah.value),
                "birth_place": DOMPurify.sanitize(tempatLahir.value),
                "birth_date": DOMPurify.sanitize(tglLahir.value),
                "gender": jenisKelamin.value,
                "village_id": kelurahan.value,
                "address": alamatLengkap.value,
                "status": statusNikah.value,
                "payment_method_code": paymentCode.value,
                "fee": feePaymentMethod.value
            })
            console.log(data)

            try {
                const response = await initAPI('post','register', data, null)
                console.log(`register nih`,response.data)
                if (response.status === 200) {
                    localStorage.setItem('merchantId', JSON.stringify(response.data.payment_data.merchant_order_id))
                    console.log('Register berhasil:', response.data.data.paymentUrl)
                    const url = response.data.data.paymentUrl
                    let fixedUrl = ''
                    let refValue = ''
                    if(url.includes('ref=')){
                        fixedUrl = 'https://sandbox.duitku.com/TopUp/v2/TopUpVAPage.aspx?ref='
                        refValue = url.split('ref=')[1]
                    }else if(url.includes('reference=')){
                        console.log('reference', url)
                        fixedUrl = 'https://sandbox.duitku.com/topup/v2/TopUpCreditCardPayment.aspx?reference='
                        refValue = url.split('reference=')[1]
                    }
                    window.location.href = fixedUrl+refValue
                    console.log('ref',refValue)
                    console.log(`${fixedUrl}-${refValue}`)
                }
            } catch (error) {
                if (error.response) {
                    let message
                    if(error.response.data.email) message = 'Email tidak valid' 
                    if(error.response.data.password) message = 'Password harus 8 karakter atau lebih' 
                    if(error.response.data.email && error.response.data.password) message = 'Email tidak valid dan Password kurang dari 8 karakter'
                    Swal.fire({
                        icon: 'error',
                        title: 'Registrasi Gagal',
                        text: message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
        }

        return{
            feePaymentMethod,
            biayaPendaftaran,
            currForm,
            namaDepan,
            namaBelakang,
            emailVal,
            passwordVal,
            noWhatsapp,
            golDarah,
            agama,
            tempatLahir,
            tglLahir,
            jenisKelamin,
            statusNikah,
            provinsi,
            kota,
            kelurahan,
            kecamatan,
            alamatLengkap,
            handleButtonClick,
            toggleTabs,
            isNextButtonDisabled,
            paymentMethod,
            paymentType,
            paymentCode,
            totalFee,
            pilihPayment,
            provinceOptions,
            cityOptions,
            districtsOptions,
            villagesOptions,
            getKota,
            getKecamatan,
            getKelurahan,
            saveVillagesId,
            validation,
            validasiWA
        }
    }
}
</script>

<style scoped>
#img-login {
  min-height:100%;
      background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login.jpg");
      background-size:cover;
}

.custom-height {
    height: 100px; /* Sesuaikan dengan tinggi yang diinginkan */
  }
</style>