<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <header class="h-[68px] hidden lg:flex lg:gap-4 bg-white sticky top-0 z-50 px-4 py-4">
        <nav class="w-full mx-[50px] flex justify-between items-center gap-4">
            <img class="w-[121.28px] h-12" src="@/assets/img/logo-new.png" alt="Logo">

            <NavCustomer/>

            <div @mouseenter="openSubmenu()" @mouseleave="scheduleCloseSubmenu()" class="cursor-pointer relative h-9 justify-end items-center gap-2 inline-flex">
                <img v-if="userDatas && userDatas.customer.image == null" class="w-9 h-9 rounded-full" src="@/assets/img/profile-mock.png" />
                <img v-if="userDatas && userDatas.customer.image !== null" class="w-9 h-9 rounded-full" :src="baseUrl+'open/customers/'+userDatas.customer.image" />
                <img class="w-3 h-3" src="@/assets/icons/chevron-down.svg"/>

                <ul v-show="activeMenu" class="w-32 p-2 transition-all duration-500 absolute top-12 -left-[44px] mt-2 bg-white text-black shadow-lg rounded-xl">
                    <li @click="goTo('user.views.profile')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                        <div class="pl-3 flex items-center gap-3">
                            <span class="font-roboto">Edit Profile</span>
                        </div>
                    </li>
                    <li @click="Logout" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                        <div class="pl-3 flex items-center gap-3">
                            <span class="font-roboto">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <section id="bottom-navigation" class="block lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white shadow">
        <div id="tabs" class="flex justify-between">
            <RouterLink :to="{name: 'views.dashboard'}" 
                class="w-full flex flex-col justify-center text-center pt-2 pb-1"
                :class="{'font-bold' : $route.name === 'views.dashboard'}"
                >
                <div class="self-center">
                    <PhHouse :size="28" />
                </div>
                <span class="tab tab-home block text-xs">Beranda</span>
            </RouterLink>

            <customerBottom/>
            <!-- <a v-if="userRole !== 'customer' && userRole !== 'consultant'" @click="Logout" class="cursor-pointer w-full flex flex-col justify-center text-center pt-2 pb-1">
                <div class="self-center">
                    <PhSignOut :size="28" />
                </div>
                <span class="tab tab-home block text-xs">Logout</span>
            </a> -->
        </div>
</section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { PhHouse } from "@phosphor-icons/vue";
import NavCustomer from './Customer/NavCustomer.vue'
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import customerBottom from '../../navbar/customer/customerBottom.vue';

const router = useRouter()
const store = useStore()
const loading = ref(false)
const baseUrl = import.meta.env.VITE_API_BASE_URL
const userDatas = ref(null)

const goTo = (route) => {
    router.push({name: route})
}

const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const userData = await initAPI('post', 'login', formData, token)
        userDatas.value = userData.data
        // console.log(`navbar`, userData.data)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mengambil data user.',
            showConfirmButton: false,
            timer: 2000
        });
    } 
}


const activeMenu = ref(null)
let closeMenuTimeout = null;

function openSubmenu() {
  if (closeMenuTimeout) {
    clearTimeout(closeMenuTimeout);
  }
  activeMenu.value = true;
}

function scheduleCloseSubmenu() {
  closeMenuTimeout = setTimeout(() => {
    activeMenu.value = null;
  }, 170); // Delay untuk menghindari hilangnya submenu saat pindah ke submenu
}


const Logout = async() => {
    loading.value = !loading.value
    try {
        const token = Cookies.get('token')
        // const token = JSON.parse(localStorage.getItem('token'))
        if(token){
            const response = await initAPI('post', 'logout', null ,token)
            localStorage.clear()
            Cookies.remove('token')
            // localStorage.removeItem('userData')
            // localStorage.removeItem('userRole')
            store.commit('user', null);
            store.commit('userRole', null);
        } else {
            localStorage.clear()
            Cookies.remove('token')
            // localStorage.removeItem('userData')
            // localStorage.removeItem('userRole')
            store.commit('user', null);
            store.commit('userRole', null);
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error saat mencoba logout.',
            showConfirmButton: false,
            timer: 2000
        });
    }
    router.push('/login')
    loading.value = !loading.value
}
onMounted(async() => {
    await getUserData()
})
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
</style>