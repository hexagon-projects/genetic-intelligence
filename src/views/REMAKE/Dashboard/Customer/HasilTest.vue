<template>
<Layout>
    <div class="min-h-screen">
        <!-- Progres Tes -->
        <section class="md:bg-[#F0F7FD] py-[67px]">
            <ResultTest :userData="userDatas"/>
        </section>
    </div>
</Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import ResultTest from '@/components/REMAKE/Dashboard/Section/ResultTest.vue';
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import initAPI from '../../../../api/api';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"
import cekDataProfile from '@/components/cekProfile';

const userDatas = ref(null)
const loading = ref(true);
const store = useStore()
const router = useRouter()
const token = Cookies.get('token')

const getUserData = async() => {
  try {
    const formData = new FormData()
    formData.append('refresh_user', 'true')
    const userData = await initAPI('post', 'login', formData, token)
    userDatas.value = userData.data
    store.commit('user', userData.data.customer)
    localStorage.setItem('userData', JSON.stringify(userData.data.customer))

  } catch (error) {
    // console.log(`error ie`, error)
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi error saat mengambil data user.',
        showConfirmButton: false,
        timer: 2000
    });
  } finally {
    loading.value = false
  }
}


onBeforeMount(async() => {
  await getUserData()
})

</script>