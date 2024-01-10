<template>
    <div v-if="userData && userResultDetect">
        <section v-if="userResultDetect.is_resulted == true" class="bg-gray-100 pb-16">
            <div class="mx-4 pt-4">
                <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                    <li class="before:px-1.5">
                        <a class="text-dark text-base cursor-default">
                            Beranda
                        </a>
                    </li>
                    <!-- <li class="before:content-['/'] before:px-1.5"><a href="javascript:;" class="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</a></li> -->
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
                <!-- <div class="w-[33%] flex flex-col gap-4">
                </div> -->

                <div class="hidden lg:block w-1/4">
                    <kelebihanVue/>
                </div>
                <div class="hidden lg:block w-1/4">
                    <kekuranganVue/>
                </div>
                <!-- <div class="w-[67%] flex flex-col gap-4">
                </div> -->

            </div>

            <div class="flex flex-col gap-4 mx-4">
                <SlideKelebihanKekurangan/>
                <SlidePenddikanPekerjaan/>
                <!-- <SlidePenddikanPekerjaan/>
                <SlidePenddikanPekerjaan/> -->
                <!-- <SlideKelebihanKekurangan/> -->
                <!-- <SlideKelebihanKekurangan/> -->
                <!-- <div class="-mt-[12px] lg:-mt-[62px]">
                </div> -->
            </div>
            
            <!-- <div class="flex justify-center mx-4 mb-4 gap-4">
                <div class="hidden lg:block w-1/2">
                    <pekerjaan/>
                </div>
                <div class="hidden lg:block w-1/2">
                    <pendidikan/>
                </div>
            </div> -->
        </section>

        <section v-else-if="(userResultDetect.is_detected == true && userResultDetect.is_resulted == false) || userResultDetect.is_detected == false" class="bg-gray-100 pb-16">
            <div class="mx-4 pt-4">
                <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                    <li class="before:px-1.5">
                        <a class="text-dark text-xl cursor-default">
                            Beranda
                        </a>
                    </li>
                    <!-- <li class="before:content-['/'] before:px-1.5"><a href="javascript:;" class="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</a></li> -->
                </ol>
            </div>
            <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 gap-4">
                <HeadingBelumDeteksi/>
                <profile/>
            </div>
        </section>
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


export default {
    name: 'NewDashboard',
    components: {
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
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userRole = computed(() => store.getters.getUserRole)
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

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
                // console.log(userResultDetect.value)
            } else {
                store.commit('userResultDetect', response.data)
            }
        })

        return { 
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
</style>