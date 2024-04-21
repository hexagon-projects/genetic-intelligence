<template>
    <div id="img-login" class="w-full flex flex-row items-center justify-center min-h-screen px-4">
        <div class="flex justify-center pt-22">
            <div class="w-full lg:w-[640px] bg-white mx-4 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
                <div class="flex flex-col justify-center items-center mb-6">
                    <h2 class="text-black text-lg lg:text-2xl font-myFont font-bold mb-2 mt-5">Lupa Password</h2>
                    <a class="font-myFont text-gray-500 text-xs lg:text-sm mb-4">
                        {{ !isEmailSent ? 'Kami akan mengirim email apabila email yang anda cantumkan sudah terdaftar' 
                        : 'Masukkan 4 digit kode verifikasi yang dikirimkan ke email Anda.'
                        }}
                    </a>

                    <div v-if="!isEmailSent" class="mt-4 w-full lg:w-1/2 mb-4">
                        <input v-model="email" @input="validation" type="email" name="email"
                        :class="{'border-danger outline-none': validasiEmail !== null, 'border-gray-300': validasiEmail == null}"
                        class="placeholder:text-base font-myFont rounded-md border w-full py-2 px-3" placeholder="Masukan Email Anda" autocomplete="off">
                        <p v-if="validasiEmail !== null" class="mt-1 font-myFont text-red-500 text-xs italic">{{ validasiEmail }}.</p>
                    </div>

                    <div v-if="isEmailSent" class="mb-4">
                        <otpForm :email="email"/>
                    </div>
                    
                    <button v-if="!isEmailSent && !loadingSent" @click="kirimEmail" :disabled="buttonDisabled"
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}" 
                    class="w-full lg:w-1/2 mb-4 font-myFont bg-biru text-white py-2 px-4 rounded-lg hover:opacity-75 hover:shadow-lg">Kirim Email</button>

                    <button v-if="!isEmailSent && loadingSent" disabled="" type="button" class="mb-4 font-myFont font-medium bg-biru text-white py-2 px-4 rounded-md hover:bg-blue-600 w-1/2 inline-flex justify-center items-center">
                        <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                        </svg>
                        Loading...
                    </button>
                    <RouterLink :to="{name: 'views.login'}" class="font-myFont text-biru underline text-sm">Kembali ke halaman login</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'
import otpForm from './otp.vue'
import DOMPurify from 'dompurify'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import initAPI from '../../../api/api';

export default {
    name: 'ForgotPage',
    components: { otpForm },
    setup(){
        
        const loadingSent = ref(false)
        const isEmailSent = ref(false)
        const email = ref(
            localStorage.getItem('refreshActionEmail') 
            ? localStorage.getItem('refreshActionEmail')
            : ''
        )
        
        const validasiEmail = ref(null)

        const buttonDisabled = computed(() => {
            if(!email.value || validasiEmail.value !== null)
            return true
            else return false
        })

        onBeforeUpdate(() => {
            if(email){
                localStorage.setItem('refreshActionEmail', email.value)
            }
        })

        onMounted(() => {
            if(localStorage.getItem('refreshActionPage') && localStorage.getItem('refreshActionPage') == 'true'){
                isEmailSent.value = true
            }
        })

        const validation = () => {
            if(email.value && !email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                validasiEmail.value = 'Email tidak valid'
            } else {
                validasiEmail.value = null
            }
        }

        const kirimEmail = async() => {
            console.log(`trim`, email.value.trim())
            if(!email.value || email.value.trim() == '' || validasiEmail.value !== null){
                Swal.fire({
                        icon: 'error',
                        title: 'Gagal Kirim Email',
                        text: 'Pastikan email di isi dan format email tidak salah.',
                        showConfirmButton: false,
                        timer: 2300
                    });
            } else {
                loadingSent.value = !loadingSent.value

                const data = {
                    email: DOMPurify.sanitize(email.value)
                }

                try {
                    await initAPI('post', 'v2/forgot-password', JSON.stringify(data), null)
                    Swal.fire({
                        icon: 'success',
                        title: 'Email dikirim',
                        text: 'Silahkan cek email anda.',
                        showConfirmButton: false,
                        timer: 2300
                    });
                    
                    isEmailSent.value = !isEmailSent.values
                    localStorage.setItem('refreshActionPage', 'true')
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Kirim Email',
                        text: 'Terjadi kesalahan pada sistem.',
                        showConfirmButton: false,
                        timer: 2300
                    });
                }
                loadingSent.value = !loadingSent.value
            }
        }

        return {
            loadingSent,
            isEmailSent,
            email,
            validasiEmail,
            buttonDisabled,
            validation,
            kirimEmail
        }
    }
}
</script>

<style scoped>
#img-login {
    min-height:100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url("../../../assets/img/bg-login2-compress.jpg");
    /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login2.jpg"); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>