<template>
    <div id="img-login" class="w-full flex flex-row items-center justify-center min-h-screen px-4">
        <div class="flex justify-center pt-22">
            <div class="w-[640px] bg-white mx-4 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
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
                        <otpForm/>
                    </div>
                    
                    <button v-if="!isEmailSent" @click="kirimEmail" :disabled="buttonDisabled"
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}" 
                    class="w-full lg:w-1/2 mb-4 font-myFont bg-biru text-white py-2 px-4 rounded-lg hover:opacity-75 hover:shadow-lg">Kirim Email</button>

                    <RouterLink :to="{name: 'views.login'}" class="font-myFont text-biru underline text-sm">Kembali ke halaman login</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import otpForm from './otp.vue'
import DOMPurify from 'dompurify'

export default {
    name: 'ForgotPage',
    components: { otpForm },
    setup(){
        
        const isEmailSent = ref(false)
        const email = ref('')
        const validasiEmail = ref(null)

        const buttonDisabled = computed(() => {
            if(!email.value || validasiEmail.value !== null)
            return true
            else return false
        })

        const validation = () => {
            if(email.value && !email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                validasiEmail.value = 'Email tidak valid'
            } else {
                validasiEmail.value = null
            }
        }

        const kirimEmail = () => {
            console.log('oke dikirim', DOMPurify.sanitize(email.value))
            isEmailSent.value = !isEmailSent.value
        }

        return {
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
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url("../../../assets/img/bg-login2.jpg");
    /* background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login2.jpg"); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>