<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div class="fixed z-[50] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="p-4 relative w-full top-[160px] mx-auto shadow-xl rounded-xl bg-white">
            <div class="flex justify-end mb-6">
                <button @click="closeModal" class="text-lg">
                    <PhX/>
                </button>
            </div>

            <div class="mx-2 flex flex-col gap-6">
                <div v-for="(menu, index) in filteredSidebarItems" :key="index">
                    <RouterLink v-if="menu.route !== null" :to="{name: menu.route}"
                        class="flex items-center gap-3 font-roboto text-[#667085]"
                    >
                        <img :src="menu.img" alt="icon">
                        {{ menu.name }}
                    </RouterLink>

                    <button v-else @click="Logout"
                    class="flex items-center gap-3 font-roboto text-[#667085]">
                        <img :src="menu.img" alt="icon">
                        {{ menu.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PhX } from '@phosphor-icons/vue';
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
const loading = ref(false)

const props = defineProps(['menus', 'userDatas'])
const emit = defineEmits(['closeModal'])

const filteredSidebarItems = computed(() => {
    const institutionType = props.userDatas.customer.institutions?.type;
    
    return props.menus.filter(item => {
        if (['SMP', 'SMK', 'SMA'].includes(institutionType)) {
            return item.name !== 'Test CPM';
        } else if (['TK', 'SD'].includes(institutionType)) {
            return item.name !== 'Test IQ';
        }
        return true;
    });
});

const closeModal = () => {
    emit('closeModal')
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
</script>