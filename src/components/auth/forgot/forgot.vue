<template>
    <section class="bg-secondary min-h-screen">
        <div class="container mx-auto">
            <div class="flex justify-center pt-32 pb-36">
                <div class="bg-white mx-4 w-6/6 lg:w-2/4 lg:mx-auto px-10 py-4 drop-shadow-2xl rounded-lg">
                    <div class="flex flex-col justify-center items-center mb-6">
                        <h2 class="text-black text-2xl font-myFont font-bold mb-2">Lupa Password</h2>
                        <a class="font-myFont text-gray-500 text-sm mb-4">
                            Kami akan mengirim email apabila email yang anda cantumkan sudah terdaftar
                        </a>

                        <div class="mt-4 w-1/2 mb-4">
                            <input v-model="email" type="email" name="email" class="font-myFont rounded-md border border-gray-300 w-full py-2 px-3" placeholder="Masukan Email Anda">
                        </div>
                        
                        <button @click="kirimEmail" class="w-full lg:w-1/2 mb-4 font-myFont bg-blue-500 text-white py-2 px-4 rounded hover:opacity-75 hover:shadow-lg">Kirim Email</button>

                        <RouterLink :to="{name: 'views.login'}" class="font-myFont text-gray-500 text-sm hover:text-secondary">Kembali ke halaman login</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'ForgotPage',
    setup(){
        const email = ref('')

        const kirimEmail = () => {
            console.log('oke dikirim', email.value)
        }

        return {
            email,
            kirimEmail
        }
    }
}
</script>