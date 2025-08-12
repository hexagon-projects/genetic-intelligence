<template>
    <div id="img-login" class="w-full flex flex-row items-center justify-center min-h-screen px-4">
        <div class="flex justify-center pt-22">
            <div class="w-[640px] bg-white mx-4 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
                <div class="flex flex-col justify-center items-center mb-6">
                    <h2 class="text-black text-lg lg:text-2xl font-myFont font-bold mb-2 mt-5">Reset Password</h2>
                    <a class="font-myFont text-gray-500 text-xs lg:text-sm mb-4">
                        Silahkan sesuaikan password anda sekarang.
                    </a>

                    <div class="mt-4 w-full lg:w-1/2 mb-4">
                        <input v-model="password1" @input="validation" type="password" name="password1"
                        class="placeholder:text-base font-myFont rounded-md border w-full py-2 px-3" placeholder="Masukan Password Baru" autocomplete="off"
                        :class="{'border-danger outline-none': passwordValidation !== null, 'border-gray-300 mb-2': passwordValidation == null}">
                        <p v-if="passwordValidation !== null" class="mb-2 mt-1 font-myFont text-red-500 text-xs italic">{{ passwordValidation }}.</p>
                        <input v-model="password2" @input="validation" type="password" name="password2"
                        class="placeholder:text-base font-myFont rounded-md border w-full py-2 px-3" placeholder="Konfirmasi Password Baru" autocomplete="off"
                        :class="{'border-danger outline-none': passwordValidation !== null, 'border-gray-300': passwordValidation == null}">
                        <p v-if="passwordValidation !== null" class="mt-1 font-myFont text-red-500 text-xs italic">{{ passwordValidation }}.</p>
                    </div>
                    
                    <button :disabled="buttonDisabled" @click="kirimPassword"
                        :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}" 
                        class="w-full lg:w-1/2 mb-4 font-myFont bg-biru text-white py-2 px-4 rounded-lg hover:opacity-75 hover:shadow-lg">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ref, computed, onBeforeMount } from 'vue';
import DOMPurify from 'dompurify'
import initAPI from '../../../api/api'
import { useRouter } from 'vue-router';

const router = useRouter()
const originalCodeRef = ref(router.currentRoute.value.query.code)


onBeforeMount(() => {
    if(originalCodeRef.value == '' || !localStorage.getItem('resetEmailReq')){
        router.push('/login')
    }
})

const password1 = ref('')
const password2 = ref('')
const passwordValidation = ref(null)

const validation = () => {
    if(password2.value !== password1.value || password1.value !== password2.value) {
        passwordValidation.value = 'Password tidak sesuai'
    } else if(password1.value.length < 8 || password2.value.length < 8){
        passwordValidation.value = 'Password harus berisi 8 karakter'
    } else {
        passwordValidation.value = null
    }
}

const buttonDisabled = computed(() => {
    if(!password1.value || !password2.value 
    || password1.value.trim() == '' || password2.value.trim() == ''
    || passwordValidation.value !== null)
    return true
    else return false
})

const kirimPassword = async() => {
    if(password1.value.trim() == '' || password2.value.trim() == ''
    || DOMPurify.sanitize(password1.value) == '' || DOMPurify.sanitize(password2.value) == ''
    || password1.value.length < 8 || password2.value.length < 8
    ){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tidak ada data yang bisa dikirim.',
            showConfirmButton: false,
            timer: 2300
        });
    } else {
        try {
            const data = {
                code: DOMPurify.sanitize(router.currentRoute.value.query.code),
                email: localStorage.getItem('resetEmailReq'),
                password: DOMPurify.sanitize(password2.value)
            }
            // console.log(data)
            const response = await initAPI('post', 'v2/reset-password', JSON.stringify(data), null)
            originalCodeRef.value = ''
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Password anda berhasil diubah.',
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('resetEmailReq')
                    if(localStorage.getItem('refreshActionPage')) localStorage.removeItem('refreshActionPage')
                    if(localStorage.getItem('refreshActionEmail')) localStorage.removeItem('refreshActionEmail')
                    router.push('/login')
                }
            })
        } catch (error) {
            // console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat merubah password.',
                showConfirmButton: false,
                timer: 2300
            });
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