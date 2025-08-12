<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-else>
        <div class="-mt-3 lg:-mt-3 bg-white rounded-lg shadow-sm p-4">
            <div class="flex flex-col lg:flex-row items-center">
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/search.png" class="w-1/2 animate-[wiggle_4s_ease-in-out_infinite] mb-2 self-center" alt="No Data Found">
                    </div>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col">
                        <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Tunggu ya...</h1>
                        <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Test kamu sedang dalam proses!</h1>
                        <p class="font-myFont text-start text-dark text-sm mb-4">Test kamu saat ini sedang di-proses oleh Konsultan, kami akan hubungi ketika selesai.</p>
                        <button @click="refreshData(userData.id)" class="lg:mb-4 my-4 px-2 py-2 w-full lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                            Refresh
                        </button>
                        <!-- <RouterLink :to="{name: 'views.dashboard'}" class="lg:mb-4 my-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                            Refresh
                        </RouterLink> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import initAPI from '../../../api/api';
import { computed, ref } from 'vue';
import Cookies from 'js-cookie'

export default {
    name: 'DalamProsesDeteksi',
    setup(){
        const loading = ref(false)
        const router = useRouter()
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)

        const refreshData = async(userId) => {
            loading.value = !loading.value
            const token = Cookies.get('token')
            if(token){
                try {
                    // console.log(`id refresh`, userId)
                    const refreshedCustomer = await initAPI('get', 'customers?id='+userId, null, token)
                    // console.log(refreshedCustomer.data.data[0])
                    store.commit('user', refreshedCustomer.data.data[0])
                    localStorage.setItem('userData', JSON.stringify(refreshedCustomer.data.data[0]))
        
                    const userResult = await initAPI('get', 'customers/gim-result/'+userId, null, token)
                    localStorage.setItem('userResult', JSON.stringify(userResult.data))
                    router.go()
                } catch(error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
            loading.value = !loading.value
        }

        return{
            loading,
            userData,
            refreshData
        }
    }
}
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
</style>