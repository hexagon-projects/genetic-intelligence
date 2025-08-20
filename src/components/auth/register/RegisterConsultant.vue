<template>
<section id="img-login" class="bg-biru min-h-screen xl:h-full">
    <div class="container mx-auto">
        <div class="flex justify-center pt-32 pb-36">
            <div class="bg-white mx-4 w-full lg:w-9/12 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
                <div class="flex flex-col justify-center items-center mb-6">
                    <h2 class="text-black text-2xl font-myFont font-bold mb-2">Daftar Konsultan</h2>
                    <span class="font-myFont text-gray-500 text-sm">
                        Sudah Punya Akun? 
                        <router-link :to="{name: 'views.login'}" class="font-myFont text-biru text-sm hover:text-blue-600">
                            Klik untuk Masuk
                        </router-link>
                    </span>
                </div>

                <!-- Progress steps (unchanged) -->
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

                <!-- Step 1: Consultant Type Selection -->
                <div v-if="currForm === 0">
                    <div class="cards flex justify-center gap-8 mt-10 mb-4 md:flex-row flex-col">
                        <div @click="pilihTipe('psikolog')" class="cursor-pointer card w-full border hover:border-biru lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                            :class="{'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': consultantType === 'psikolog'}"
                            >
                            <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                                Psikolog
                            </h2>
                            <img src="../../../assets/img/PelajarGroup.png" class="w-[221px] md:w-[213px] lg:w-[191px] mx-auto mb-4" alt="Pelajar" rel="preload">
                        </div>

                        <div @click="pilihTipe('konselor')" class="cursor-pointer card w-full border hover:border-biru lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                            :class="{'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': consultantType === 'konselor'}"
                            >
                            <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                                Konselor
                            </h2>
                            <img src="../../../assets/img/NonpelajarGroup.png" class="mx-auto max-w-[222px] lg:w-full mb-4" alt="Non Pelajar" rel="preload">
                        </div>
                    </div>
                </div>

                <!-- Step 2: Form Input -->
                <div v-if="currForm === 1">
                    <div v-if="loadingSubmit" class="py-24 flex justify-center w-full">
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-if="!loadingSubmit">
                        <div class="w-full mb-4">
                            <label for="name" class="block text-sm font-myFont font-medium text-gray-600">Nama Lengkap:</label>
                            <input v-model="name" type="text" id="name" name="name" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Nama Lengkap" />
                        </div>
                        
                        <div class="flex justify-center gap-2">
                            <div class="w-full mb-4">
                                <label for="gender" class="block text-sm font-myFont font-medium text-gray-600">Jenis Kelamin:</label>
                                <select v-model="gender" id="gender" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru">
                                    <option value="0">Laki-laki</option>
                                    <option value="1">Perempuan</option>
                                </select>
                            </div>
                            
                            <div class="w-full mb-4">
                                <label for="birth_place" class="block text-sm font-myFont font-medium text-gray-600">Tempat Lahir:</label>
                                <input v-model="birthPlace" type="text" id="birth_place" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Tempat Lahir" />
                            </div>
                        </div>
                        
                        <div class="w-full mb-4">
                            <label for="birth_date" class="block text-sm font-myFont font-medium text-gray-600">Tanggal Lahir:</label>
                            <input v-model="birthDate" type="date" id="birth_date" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                        </div>
                        
                        <div class="w-full mb-4">
                            <label for="address" class="block text-sm font-myFont font-medium text-gray-600">Alamat:</label>
                            <textarea v-model="address" id="address" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" rows="3"></textarea>
                        </div>
                        
                        <div class="flex justify-center gap-2">
                            <div class="w-full mb-4">
                                <label for="email" class="block text-sm font-myFont font-medium text-gray-600">Email:</label>
                                <input v-model="email" @input="validation" type="email" id="email" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Email" autocomplete="off"/>
                                <a v-if="emailError" class="text-xs text-red-500">{{ emailError }}</a>
                            </div>
    
                            <div class="w-full mb-4">
                                <label for="number" class="block text-sm font-myFont font-medium text-gray-600">No Whatsapp:</label>
                                <input v-model="number" @keyup="validation" type="text" id="number" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="0812345" />
                                <a v-if="numberError" class="text-xs text-red-500">{{ numberError }}</a>
                            </div>
                        </div>
                        
                        <div class="w-full mb-4">
                            <label for="description" class="block text-sm font-myFont font-medium text-gray-600">Deskripsi Profil:</label>
                            <textarea v-model="description" id="description" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" rows="3"></textarea>
                        </div>
    
                        <div class="flex justify-center items-center gap-2">
                            <div class="w-full mb-4">
                                <label for="password" class="block text-sm font-myFont font-medium text-gray-600">Password:</label>
                                <div class="relative">
                                    <input v-model="password" @keyup="validation" type="password" id="password" class="js-password1 text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Password" />
                                    <a v-if="!isPassword1Shown" @click="togglePassword('firstForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEye :size="18"/></a>
                                    <a v-if="isPassword1Shown" @click="togglePassword('firstForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEyeSlash :size="18"/></a>
                                    <a v-if="passwordError" class="text-xs text-red-500">{{ passwordError }}</a>
                                </div>
                            </div>
    
                            <div class="w-full mb-4">
                                <label for="confirmPassword" class="block text-sm font-myFont font-medium text-gray-600">Konfirmasi Password:</label>
                                <div class="relative">
                                    <input v-model="confirmPassword" @keyup="validation" type="password" id="confirmPassword" class="js-password2 text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" placeholder="Konfirmasi Password" />
                                    <a v-if="!isPassword2Shown" @click="togglePassword('secondForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEye :size="18"/></a>
                                    <a v-if="isPassword2Shown" @click="togglePassword('secondForm')" class="cursor-pointer absolute top-3 md:top-[14px] lg:top-4 right-2 text-dark"><PhEyeSlash :size="18"/></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="w-full mb-4">
                            <label for="cv" class="block text-sm font-myFont font-medium text-gray-600">Upload CV (PDF/DOC/DOCX, max 2MB):</label>
                            <input type="file" id="cv" ref="cvInput" @change="handleCvUpload" accept=".pdf,.doc,.docx" class="text-xs md:text-sm lg:text-base mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" />
                            <a v-if="cvError" class="text-xs text-red-500">{{ cvError }}</a>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Success Message -->
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

                <!-- Navigation Buttons -->
                <div v-if="currForm < 2" class="flex justify-between items-center mt-4">
                    <button v-if="currForm >= 1" @click="toggleTabs(-1)" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                        Sebelumnya
                    </button>
                    <button v-if="consultantType !== null && !loadingSubmit && currForm < 2" @click="handleButtonClick()" :disabled="isNextButtonDisabled" :class="{'ml-auto': currForm === 0, 'bg-gray-600 opacity-80 cursor-not-allowed': isNextButtonDisabled}" class="bg-biru font-myFont text-white p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                        {{ currForm === 1 ? 'Daftar' : 'Selanjutnya' }}
                    </button>
                    <button v-if="consultantType !== null && loadingSubmit" class="mb-4 font-myFont font-medium bg-biru text-white py-2 px-4 rounded-md hover:bg-blue-600 inline-flex justify-center items-center">
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
import { ref, computed, watch } from 'vue'
import { PhCheck, PhEye, PhEyeSlash } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import initAPI from '../../../api/api'

const router = useRouter()

// Form state
const isPassword1Shown = ref(false)
const isPassword2Shown = ref(false)
const loadingSubmit = ref(false)
const currForm = ref(0)
const consultantType = ref(null) // 'psikolog' or 'konselor'

// Form data
const name = ref('')
const gender = ref(0)
const birthPlace = ref('')
const birthDate = ref('')
const address = ref('')
const number = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const description = ref('')
const cvFile = ref(null)

// Error messages
const emailError = ref('')
const numberError = ref('')
const passwordError = ref('')
const cvError = ref('')

const pilihTipe = (type) => {
    consultantType.value = type
}

const toggleTabs = (increment) => {
    const currTab = currForm.value + increment;
    if (currTab >= 0 && currTab <= 2) {
        currForm.value = currTab;
    }
};

const handleButtonClick = () => {
    if(currForm.value === 1){
        registerConsultant()
    } else {
        toggleTabs(1)
    }
};

const isNextButtonDisabled = computed(() => {
    switch (currForm.value) {
        case 0:
            return consultantType.value === null
        case 1:
            return !name.value || 
                   !birthPlace.value || 
                   !birthDate.value || 
                   !address.value || 
                   !number.value || 
                   !email.value || 
                   emailError.value !== '' || 
                   !password.value || 
                   passwordError.value !== '' || 
                   !description.value || 
                   !cvFile.value
        default:
            return true
    }
});

const validation = () => {
    if(email.value && !email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        emailError.value = 'Email tidak valid'
    } else {
        emailError.value = ''
    }

    if(number.value && isNaN(number.value)) {
        numberError.value = 'No Whatsapp hanya bisa di isi oleh angka'
    } else {
        numberError.value = ''
    }

    if(password.value && password.value.length < 8) {
        passwordError.value = 'Password harus 8 karakter'
    } else if(password.value !== confirmPassword.value) {
        passwordError.value = 'Password tidak sesuai'
    } else {
        passwordError.value = ''
    }
}

const handleCvUpload = (event) => {
    console.log('Event >>>>>>>', event)
    const file = event.target.files[0]
    console.log('File >>>>>>>', file)
    if (file) {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        const maxSize = 2 * 1024 * 1024 // 2MB
        
        if (!validTypes.includes(file.type)) {
            cvError.value = 'Format file harus PDF, DOC, atau DOCX'
            return
        }
        
        if (file.size > maxSize) {
            cvError.value = 'Ukuran file maksimal 2MB'
            return
        }
        
        cvFile.value = file
        cvError.value = ''
    }
}


const registerConsultant = async () => {
    if (isNextButtonDisabled.value) return
    
    loadingSubmit.value = true
    
    try {
        const formData = new FormData()
        formData.append('email', DOMPurify.sanitize(email.value))
        formData.append('password', DOMPurify.sanitize(password.value))
        formData.append('password_confirmation', DOMPurify.sanitize(confirmPassword.value))
        formData.append('name', DOMPurify.sanitize(name.value))
        formData.append('gender', gender.value)
        formData.append('birth_place', DOMPurify.sanitize(birthPlace.value))
        formData.append('birth_date', birthDate.value)
        formData.append('address', DOMPurify.sanitize(address.value))
        formData.append('number', DOMPurify.sanitize(number.value))
        formData.append('description', DOMPurify.sanitize(description.value))
        formData.append('type', consultantType.value)

        if (cvFile.value) {
            formData.append('cv', cvFile.value, cvFile.value.name)
        }

        const response = await initAPI('post', 'v2/register-consultant', formData, null)

        if (response.data.success) {
            currForm.value = 2
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: response.data.error || 'Terjadi kesalahan saat registrasi',
                showConfirmButton: false,
                timer: 2700
            })
        }
    } catch (error) {
        let errorMessage = 'Terjadi kesalahan sistem'
        if (error.response && error.response.data) {
            if (error.response.data.errors) {
                errorMessage = Object.values(error.response.data.errors).flat().join(', ')
            } else if (error.response.data.error) {
                errorMessage = error.response.data.error
            }
        } else if (error.message) {
            errorMessage = error.message
        }
        
        Swal.fire({
            icon: 'error',
            title: 'Registrasi Gagal',
            text: errorMessage,
            showConfirmButton: false,
            timer: 2700
        })
    } finally {
        loadingSubmit.value = false
    }
}

const toLogin = () => {
    router.push('/login')
}

const togglePassword = (params) => {
    const password1 = document.querySelector('.js-password1')
    const password2 = document.querySelector('.js-password2')

    if(params === 'firstForm'){
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