<template>
    <div>
        <div class="cards flex justify-center gap-8 mt-10 mb-4 md:flex-row flex-col">
            <div @click="submitRole(1)"
                class="cursor-pointer card w-full border hover:border-biru lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                :class="{ 'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': tipeValue == 1 }">
                <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                    Pelajar / Mahasiswa
                </h2>
                <img src="../../../assets/img/PelajarGroup.png" class="w-[221px] md:w-[213px] lg:w-[191px] mx-auto mb-4"
                    alt="Pelajar" rel="preload">
            </div>

            <div @click="submitRole(0)"
                class="cursor-pointer card w-full border hover:border-biru lg:w-[32%] px-10 bg-white rounded-lg hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in"
                :class="{ 'scale-105 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] border-biru': tipeValue == 0 }">
                <h2 class="text-center text-dark font-myFont font-semibold text-lg tracking-wider mt-8 mb-3">
                    Non Pelajar
                </h2>
                <img src="../../../assets/img/NonpelajarGroup.png" class="mx-auto max-w-[222px] lg:w-full mb-4"
                    alt="Non Pelajar" rel="preload">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import initAPI from '../../../api/api'

const tempToken = ref('');

onMounted(() => {
    // Ambil temp_token dari query parameter
    this.tempToken = this.$route.query.temp_token;
    if (!this.tempToken) {
      // Jika tidak ada token, redirect ke halaman login atau error
      this.$router.push('/login');
    }
})

const submitRole = async (tipeValue) => {
  try {
    const response = await initAPI('post', 'auth/complete-registration', {
      temp_token: tempToken.value,
      role: tipeValue,
    });

    localStorage.setItem("token", response.data.token);

    // Redirect berdasarkan status
    if (response.status === 200) {
      router.push('/register');
    } else {
      router.push('/');
    }
  } catch (error) {
    console.error("Error saat memilih role:", error);
  }
};
</script>