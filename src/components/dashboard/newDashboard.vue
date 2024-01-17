<template>
    <div v-if="userRole == 'consultant'">
        <DashboardConsultant/>
    </div>

    <div v-else-if="userRole == 'customer'">
        <div v-if="loading" class="preloader-overlay">
            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
        </div>
        <div v-else>
            <div v-if="userData && userResultDetect">
                <section v-if="userResultDetect.is_resulted == true" class="bg-gray-100 pb-16">
                    <div class="mx-4 pt-4">
                        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                            <li class="before:px-1.5">
                                <a class="text-dark text-base cursor-default">
                                    Beranda
                                </a>
                            </li>
                        </ol>
                    </div>
                    <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 gap-4">
                        <HeadingDashboard/>
                        <profile/>
                    </div>
        
                    <div class="flex justify-center mx-4 gap-4">
                        <div class="hidden lg:block w-1/4">
                            <pekerjaan/>
                        </div>
                        <div class="hidden lg:block w-1/4">
                            <pendidikan/>
                        </div>
        
                        <div class="hidden lg:block w-1/4">
                            <kelebihanVue/>
                        </div>
        
                        <div class="hidden lg:block w-1/4">
                            <kekuranganVue/>
                        </div>
        
                    </div>
        
                    <div class="flex flex-col gap-4 mx-4">
                        <SlideKelebihanKekurangan/>
                        <SlidePenddikanPekerjaan/>
                    </div>
                </section>
        
                <section v-else-if="(userResultDetect.is_detected == true && userResultDetect.is_resulted == false) || userResultDetect.is_detected == false" class="bg-gray-100 pb-16">
                    <div class="mx-4 pt-4">
                        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                            <li class="before:px-1.5">
                                <a class="text-dark text-xl cursor-default">
                                    Beranda
                                </a>
                            </li>
                        </ol>
                    </div>
                    <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 gap-4">
                        <HeadingBelumDeteksi/>
                        <profile/>
                    </div>
                </section>
            </div>
        </div>
    </div>

    <div v-else-if="userRole == 'admin'">
        <DashboardAdmin/>
    </div>
</template>

<script>
import profile from './profile/profile.vue';
import HeadingDashboard from './heading/headingDashboard.vue'
import HeadingBelumDeteksi from './heading/headingBelumDeteksi.vue'
import SlideKelebihanKekurangan from './slide/KelebihanKekurangan.vue'
import SlidePenddikanPekerjaan from './slide/PendidikanPekerjaan.vue'
import kelebihanVue from './kelebihan/kelebihan.vue';
import kekuranganVue from './kekurangan/kekurangan.vue'
import pekerjaan from './pekerjaan/pekerjaan.vue';
import pendidikan from './pendidikan/pendidikan.vue'
import { useStore } from 'vuex'
import initAPI from '../../api/api'
import { ref, computed, onMounted } from 'vue'
import { PhArrowRight } from '@phosphor-icons/vue';
import DashboardConsultant from '../consultant/dashboard/dashboard.vue'
import DashboardAdmin from '../admin/dashboard/dashboard.vue'


export default {
    name: 'NewDashboard',
    components: {
        DashboardConsultant,
        DashboardAdmin,
        profile, 
        HeadingDashboard,
        HeadingBelumDeteksi,
        SlideKelebihanKekurangan, 
        SlidePenddikanPekerjaan,
        kelebihanVue,
        kekuranganVue,
        pekerjaan,
        pendidikan,
        PhArrowRight
    },
    setup(){
        // document.addEventListener('contextmenu', event=> event.preventDefault()); 
        //     document.onkeydown = function(e) { 
        //     if(event.keyCode == 123) { 
        //     return false; 
        //     } 
        //     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){ 
        //     return false; 
        //     } 
        //     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){ 
        //     return false; 
        //     } 
        //     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){ 
        //     return false; 
        //     } 
        // } 

        const loading = ref(false);
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userRole = computed(() => store.getters.getUserRole)
        const userResultDetect = computed(() => store.getters.getUserResultDetect);
        
        console.log(`user yeuh`,userData.value)

        loading.value = !loading.value
        onMounted(async() => {

            if (!userData.value && !userRole.value) {
                const localStorageUserData = localStorage.getItem('userData')
                const localStorageUserRole = localStorage.getItem('userRole')
                if (localStorageUserData && localStorageUserRole) {
                    const parsedUserData = JSON.parse(localStorageUserData)
                    const parsedUserRole = JSON.parse(localStorageUserRole)
                    store.commit('user', parsedUserData)
                    store.commit('userRole', parsedUserRole)
                }
            }

            const token = JSON.parse(localStorage.getItem('token'))
            const customerId = userData.value.id

            const response = await initAPI('get', 'customers/gim-result/'+customerId, null, token)
            if(response.data.is_detected == true){
                // console.log('aya ajig')
                store.commit('userResultDetect', response.data)
                localStorage.setItem('userResult', JSON.stringify(response.data))
                // console.log(userResultDetect.value)
            } else {
                store.commit('userResultDetect', response.data)
            }
            loading.value = !loading.value
        })

        return {
            loading, 
            userData,
            userRole,
            userResultDetect,
        }
    }
}
</script>

<style scoped>
.gradasi {
    background: rgb(107,222,180);
background: linear-gradient(90deg, rgba(107,222,180,1) 19%, rgba(78,221,209,1) 66%, rgba(31,171,238,1) 97%);  
}

.morphism {
    background-color: rgb(255 255 255 / 50%);
  /* backdrop-filter: blur(90px) */
}

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