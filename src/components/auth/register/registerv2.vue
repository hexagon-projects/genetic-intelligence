<template>
<section id="img-login" class="bg-biru min-h-screen xl:h-full">
    <div class="container mx-auto">
        <div class="flex justify-center pt-32 pb-36">
            <div class="bg-white mx-4 w-full lg:w-9/12 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
                <div class="flex flex-col justify-center items-center mb-6">
                    <h2 class="text-black text-2xl font-myFont font-bold mb-2">Daftar</h2>
                    <span class="font-myFont text-gray-500 text-sm">
                        Sudah Punya Akun? 
                        <router-link :to="{name: 'views.login'}" class="font-myFont text-biru text-sm hover:text-blue-600">
                            Klik untuk Masuk
                        </router-link>
                    </span>
                </div>

                <div class="mb-5">
                    <div
                    class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
                    >
                        <ol class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                        <li class="flex items-center gap-2 bg-white p-2">
                            <span :class="{
                                'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 0,
                                'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 0
                                }">
                                1
                            </span>
                            <span class="hidden sm:block"> Tipe Akun </span>
                        </li>

                        <li class="flex items-center gap-2 bg-white p-2">
                            <span :class="{
                                'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 1,
                                'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 1
                                }">
                                2
                            </span>
                            <span class="hidden sm:block"> Detail Akun </span>
                        </li>

                        <li class="flex items-center gap-2 bg-white p-2">
                            <span
                                :class="{
                                'h-6 w-6 rounded-full text-center text-white text-[10px]/6 font-bold bg-biru': currForm === 2,
                                'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold': currForm !== 2
                                }">
                                3
                            </span>
                            <span class="hidden sm:block"> Selesai </span>
                        </li>
                        </ol>
                    </div>
                </div>

                <div v-if="currForm === 0">
                    <div class="cards flex justify-center gap-8 mt-10 mb-4 md:flex-row flex-col">
                        <div @click="pilihTipe(1)" class="cursor-pointer card w-full border hover:border-biru lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                            :class="{'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': tipeValue == 1}"
                            >
                            <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                                Pelajar / Mahasiswa
                            </h2>
                            <img src="../../../assets/img/PelajarGroup.png" class="w-[221px] md:w-[213px] lg:w-[191px] mx-auto mb-4" alt="Pelajar" rel="preload">
                        </div>

                        <div @click="pilihTipe(0)" class="cursor-pointer card w-full border hover:border-biru lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                            :class="{'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': tipeValue == 0}"
                            >
                            <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                                Non Pelajar
                            </h2>
                            <img src="../../../assets/img/NonpelajarGroup.png" class="mx-auto max-w-[222px] lg:w-full mb-4" alt="Non Pelajar" rel="preload">
                        </div>
                    </div>
                </div>

                <div v-if="currForm === 1">
                    <div v-if="loadingSubmit" class="py-24 flex justify-center w-full">
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-if="!loadingSubmit">
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="nama_depan" class="block text-sm font-myFont font-medium text-gray-600">Nama Depan:</label>
                                <input v-model="namaDepan" type="text" id="nama_depan" name="nama_depan" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Depan" />
                                <!-- <a v-if="nameValidation && nameVal.length < 1" class="text-xs text-red-500">Nama depan tidak boleh kosong.</a> -->
                            </div>
                            <div class="w-full mb-4">
                                <label for="nama_belakang" class="block text-sm font-myFont font-medium text-gray-600">Nama Belakang:</label>
                                <input v-model="namaBelakang" type="text" id="nama_belakang" name="nama_belakang" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Belakang" />
                            </div>
                        </div>
                        
                        <div class="flex justify-center gap-2">
                            <div class="w-full mb-4">
                                <label for="email" class="block text-sm font-myFont font-medium text-gray-600">Email:</label>
                                <input v-model="emailVal" @input="validation" type="email" id="email" name="email" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Email" autocomplete="off"/>
                                <a v-if="validasiEmail && validasiEmail !== ''" class="text-xs text-red-500">{{ validasiEmail }}</a>
                            </div>
    
                            <div class="w-full mb-4">
                                <label for="no_whatsapp" class="block text-sm font-myFont font-medium text-gray-600">No Whatsapp:</label>
                                <input v-model="noWhatsapp" @keyup="validation" type="text" id="no_whatsapp" name="no_whatsapp" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="0812345" />
                                <a v-if="validasiWA && validasiWA !== ''" class="text-xs text-red-500">{{ validasiWA }}</a>
                            </div>
                        </div>
    
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="password" class="block text-sm font-myFont font-medium text-gray-600">Password:</label>
                                <div class="relative">
                                    <input v-model="passwordVal" @keyup="validation" type="password" id="password" name="password" class="js-password1 text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password" />
                                    <a v-if="!isPassword1Shown" @click="togglePassword('firstForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEye :size="18"/></a>
                                    <a v-if="isPassword1Shown" @click="togglePassword('firstForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEyeSlash :size="18"/></a>
                                    <a v-if="validasiPassword && validasiPassword !== ''" class="text-xs text-red-500">{{ validasiPassword }}</a>
                                </div>
                            </div>
    
                            <div class="w-full mb-4">
                                <label for="confirmPassword" class="block text-sm font-myFont font-medium text-gray-600">Konfirmasi Password:</label>
                                <div class="relative">
                                    <input v-model="confirmPasswordVal" @keyup="validation" type="password" id="confirmPassword" name="password" class="js-password2 text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password" />
                                    <a v-if="!isPassword2Shown" @click="togglePassword('secondForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEye :size="18"/></a>
                                    <a v-if="isPassword2Shown" @click="togglePassword('secondForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEyeSlash :size="18"/></a>
                                    <a v-if="validasiPassword && validasiPassword !== ''" class="text-xs text-red-500">{{ validasiPassword }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="currForm === 2">
                    <div class="bg-white flex flex-col p-6 mx-4 md:mx-auto">
                        <a class="animate-bounce mb-4 mx-auto bg-success px-6 py-6 rounded-full"><PhCheck size="38" fill="white"/></a>
                        <div class="text-center">
                            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Registrasi Berhasil!</h3>
                            <p class="text-gray-600 my-2">Terimakasih telah melakukan pendaftaran, kamu bisa login sekarang.</p>

                            <div class="pb-4 pt-6 text-center">
                                <button @click="toLogin" class="rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                                Login 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="currForm < 2" class="flex justify-between items-center mt-4">
                    <button v-if="currForm >= 1" @click="toggleTabs(-1)" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                        Sebelumnya
                    </button>
                    <button v-if="tipeValue !== null && !loadingSubmit && currForm < 2" @click="handleButtonClick()" :disabled="isNextButtonDisabled" :class="{'ml-auto': currForm === 0, 'bg-gray-600 opacity-80 cursor-not-allowed': isNextButtonDisabled}" class="bg-biru font-myFont text-white p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                        {{ currForm === 1 ? 'Daftar' : 'Selanjutnya' }}
                    </button>
                    <button v-if="tipeValue !== null && loadingSubmit" class="mb-4 font-myFont font-medium bg-biru text-white py-2 px-4 rounded-md hover:bg-blue-600 inline-flex justify-center items-center">
                        <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                        </svg>
                        Loading..
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PhCheck, PhEye, PhEyeSlash } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import initAPI from '../../../api/api'

const router = useRouter()

const isPassword1Shown = ref(false)
const isPassword2Shown = ref(false)

const loadingSubmit = ref(false)
const currForm = ref(0)
const tipeValue = ref(null)

const formFillData = JSON.parse(localStorage.getItem('formValue'))
const namaDepan = ref(formFillData?.first_name ? formFillData.first_name : '')
const namaBelakang = ref(formFillData?.last_name ? formFillData.last_name : '')
const emailVal = ref(formFillData?.email ? formFillData.email : '')
const noWhatsapp = ref(formFillData?.number ? formFillData.number : '')
const passwordVal = ref(formFillData?.password ? formFillData.password : '')
const confirmPasswordVal = ref(formFillData?.password ? formFillData.password : '')

const validasiWA = ref('')
const validasiEmail = ref('')
const validasiPassword = ref('')

const Register = async() => {
    loadingSubmit.value = !loadingSubmit.value

    const data = JSON.stringify({
        "is_student": tipeValue.value,
        "first_name": DOMPurify.sanitize(namaDepan.value),
        "last_name": DOMPurify.sanitize(namaBelakang.value),
        "email": DOMPurify.sanitize(emailVal.value),
        "number": DOMPurify.sanitize(noWhatsapp.value),
        "password": DOMPurify.sanitize(passwordVal.value),
    })

    // console.log(data)
    try {
        const parsedData = JSON.parse(data)
        if(
            parsedData.first_name.trim() !== '' &&
            parsedData.last_name.trim() !== '' &&
            !parsedData.email.includes(' ') &&
            !parsedData.number.includes(' ') &&
            !parsedData.password.includes(' ')
        ){
            const response = await initAPI('post', 'v2/register', data, null)
            currForm.value = 2
        } else {
            // console.log(`aya nu kosong yeuh`)
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: 'Data tidak boleh kosong atau mengandung spasi',
                showConfirmButton: false,
                timer: 2700
            });
        }
    } catch (error) {
        // console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Registrasi Gagal',
            text: 'Terjadi kesalahan sistem',
            showConfirmButton: false,
            timer: 2000
        });
    }
    loadingSubmit.value = !loadingSubmit.value
}

const pilihTipe = async(params) => {

    // const token = Cookies.get('token')
    tipeValue.value = params
    // let endpoint = params == 1 ? 'register-student' : 'register-non-student'
    // const response = await initAPI('get', `register/payment?type=${endpoint}`, null, token)
    // // console.log(response.data.price.replace('.', ''))
    // biayaPendaftaran.value = response.data.price.replace('.', '')
}

const toggleTabs = (increment) => {
    const currTab = currForm.value + increment;
    // console.log('eh', currTab)

    if (currTab >= 0 && currTab <= 2) {
        currForm.value = currTab;
    }
};

const handleButtonClick = () => {
    if(currForm.value === 1){
        Register()
    } else {
        toggleTabs(1)
    }
};

const isNextButtonDisabled = computed(() => {
    switch (currForm.value) {
        case 0:
        return false
        case 1:
        return !namaDepan.value 
            || !namaBelakang.value 
            || !emailVal.value 
            || validasiEmail.value !== '' 
            || !passwordVal.value 
            || validasiPassword.value !== '' 
            || !noWhatsapp.value 
            || isNaN(noWhatsapp.value)
        default:
        return true;
    }
});

const validation = () => {
    if(isNaN(noWhatsapp.value)){
        // console.log(`kudu number ajig`)
        validasiWA.value = 'No Whatsapp hanya bisa di isi oleh angka'
    } else if(emailVal.value && !emailVal.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        validasiEmail.value = 'Email tidak valid'
    } else if(passwordVal.value && passwordVal.value.length < 8) {
        validasiPassword.value = 'Password harus 8 karakter'
    } else if(passwordVal.value !== confirmPasswordVal.value) {
        validasiPassword.value = 'Password tidak sesuai'
    } else {
        validasiWA.value = ''
        validasiEmail.value = ''
        validasiPassword.value = ''
    }
}

const toLogin = () => {
    router.push('/login')
}

const togglePassword = (params) => {
    const password1 = document.querySelector('.js-password1')
    const password2 = document.querySelector('.js-password2')

    if(params == 'firstForm'){
        if (password1.type === 'password') {
            password1.type = 'text'
            isPassword1Shown.value = true
        } else {
            password1.type = 'password'
            isPassword1Shown.value = false
        }
    } else {
        if (password2.type === 'password') {
            password2.type = 'text'
            isPassword2Shown.value = true
        } else {
            password2.type = 'password'
            isPassword2Shown.value = false
        }
    }
}
</script>

<style scoped>
#img-login {
    min-height:100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url("../../../assets/img/bg-login2-compress.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>