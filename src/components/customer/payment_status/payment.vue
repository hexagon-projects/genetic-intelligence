<template>
<div v-if="isSuccess" class="block">
    <div id="img-login" class="flex flex-col lg:flex-row items-center justify-center lg:gap-4 h-screen">
        <div class="bg-white flex flex-col shadow-lg rounded-lg p-6 md:mx-auto">
            <a class="animate-bounce mb-4 mx-auto bg-success px-6 py-6 rounded-full"><PhCheck size="38" fill="white"/></a>
            <div class="text-center">
                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Pembayaran Berhasil!</h3>
                <p class="text-gray-600 my-2">Terimakasih telah melakukan pembayaran, kamu bisa login sekarang.</p>
                <!-- <p> A!  </p> -->
                <div class="pb-4 pt-6 text-center">
                    <RouterLink :to="{name: 'views.login'}" class="rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                    Login 
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>

<div v-else class="block">
    <div id="img-login" class="flex flex-col lg:flex-row items-center justify-center lg:gap-4 h-screen">
        <div class="bg-white flex flex-col shadow-lg rounded-lg p-6 md:mx-auto">
            <a class="animate-wiggle mb-4 mx-auto bg-danger px-6 py-6 rounded-full"><PhX size="38" fill="white"/></a>


        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Pembayaran Gagal</h3>
            <p class="text-gray-600 my-2">Sayang sekali pembayaran kamu gagal, cek ulang yuk.</p>
            <!-- <p> A!  </p> -->
            <div class="pb-4 pt-6 text-center">
                <button class="rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                   Cek Ulang
                </button>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { PhX, PhCheck } from '@phosphor-icons/vue'

export default {
    name: 'PaymentStatus',
    components: {PhX, PhCheck},
    setup(){
        const isSuccess = ref(false)

        return {isSuccess}
    }
}
</script>

<style scoped>
#img-login {
  min-height:100%;
      background:linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(38, 173, 197, 0.3)), url("../../../assets/img/bg-login.jpg");
      background-size:cover;
}
</style>