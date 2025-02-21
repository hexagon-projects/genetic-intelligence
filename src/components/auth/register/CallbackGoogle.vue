<template>
  <div class="preloader-overlay">
    <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Cookies from 'js-cookie';
import initAPI from '../../../api/api';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore(); // Pastikan store diakses dengan benar

// Inisialisasi ref untuk menyimpan data user
const userData = ref({
  id: null,
  email: '',
  role: '',
  token: ''
});

const handleCallback = async () => {
  try {
    const response = await initAPI('post', 'auth/google/login', userData.value, null);

    if (!response.data || !response.data.user) {
      throw new Error('User data not found in response');
    }

    const role = response.data.user.role;
    let type = response.data.customer || response.data.consultant || response.data;

    // Simpan data user
    localStorage.setItem('userData', JSON.stringify(type));
    Cookies.set('token', response.data.token, { expires: 1 });

    // Simpan ke Vuex store
    store.commit('user', type);
    store.commit('userRole', role);
    store.commit('userEmail', response.data.user.email);

    // Redirect berdasarkan role
    switch (role) {
      case 'customer':
        router.push({ name: 'views.dashboard' });
        break;
      case 'consultant':
        router.push({ name: 'consultant.views.dashboard' });
        break;
      case 'admin':
        router.push({ name: 'admin.views.dashboard' });
        break;
      case 'staff':
        router.push({ name: 'staff.views.dashboard' });
        break;
      default:
        console.error("Role tidak dikenal:", role);
        router.push({ name: 'views.login' });
        break;
    }
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
    router.push({ name: 'views.login' });
  }
};

// Jalankan fungsi saat komponen dimuat
onMounted(() => {
  // Ambil data dari query parameter
  userData.value = {
    id: route.query.id || null,
    email: route.query.email || '',
    role: route.query.role || '',
    token: route.query.token || ''
  };

  // Pastikan token ada sebelum memanggil API
  if (!userData.value.token) {
    console.error("Token tidak ditemukan!");
    router.push({ name: 'views.login' });
    return;
  }

  handleCallback();
});
</script>

<style scoped>
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, height 0.5s ease;
}
.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>