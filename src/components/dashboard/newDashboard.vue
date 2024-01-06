<template>
    <div v-if="userData && userResultDetect">
        <section v-if="userResultDetect.is_resulted == true" class="bg-gray-100 pb-16">
            <div class="mx-4 pt-4">
                <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                    <li class="before:px-1.5"><a class="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Beranda</a></li>
                    <!-- <li class="before:content-['/'] before:px-1.5"><a href="javascript:;" class="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</a></li> -->
                </ol>
            </div>
            <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 gap-4">
                <div class="lg:w-3/4">
                    <div class="gradasi shadow-xl flex flex-col md:flex-row lg:flex-row lg:justify-between items-center rounded-2xl gap-4 px-12 py-12">
                        <div class="w-full flex flex-col gap-2">
                            <img src="../../assets/img/blogging-bro-crop.png" class="-mt-4 mx-auto lg:items-start w-9/12" alt="">
                            <div class="hidden lg:block">
                                <h1 class="font-poppins font-normal text-start text-clip text-lg lg:text-3xl text-white">Selamat Datang</h1>
                                <h1 class="font-poppins font-normal text-start text-clip text-lg lg:text-3xl text-white">Kembali,</h1>
                                <h1 class="font-poppins font-normal text-start text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                            </div>
                            <div class="block lg:hidden">
                                <h1 class="font-poppins font-normal text-center text-clip text-lg lg:text-3xl text-white">Selamat Datang Kembali!</h1>
                                <h1 class="font-poppins font-normal text-center text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                            </div>
                        </div>
                        <div class="w-full z-5 flex flex-col bg-light rounded-2xl p-4 lg:-mr-6 gap-8">
                            <div class="w-full">
                                <h1 class="mb-2 font-poppins font-semibold text-xl lg:text-2xl text-dark">Siapa Dirimu?</h1>
                                <p class="font-poppins font-light text-sm lg:text-md text-dark">{{ userResultDetect.gim.type }}</p>
                            </div>
                            <div class="w-full">
                                <h1 class="mb-2 font-poppins font-semibold text-xl lg:text-2xl text-dark">Sistem Otak Dominan</h1>
                                <p class="font-poppins font-light text-sm lg:text-md text-dark">{{ userResultDetect.gim.dominance_op_system }}</p>
                            </div>
                        </div>
                        <hr class="">
                        <div class="w-full flex flex-col gap-4 lg:border-l lg:pl-6 ml-4">
                            <div class="w-full">
                                <h1 class="mb-2 font-myFont font-semibold text-xl lg:text-2xl text-white">Kata Kunci</h1>
                                <p class="mb-2 font-myFont font-light text-wrap text-sm lg:text-md text-light">{{ userResultDetect.gim.keyword }}</p>
                                <button class="flex items-center gap-2 bg-white px-4 py-2 rounded-lg font-myFont text-dark hover:text-light hover:bg-[#1fabee]">
                                    Lihat Detail
                                    <PhArrowRight/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <profile/>
            </div>

            <div class="flex justify-center mx-4 mb-4 gap-4">
                <div class="w-full">
                    <swiper 
                        :navigation="true"
                        :spaceBetween="30"
                        :pagination="{
                        clickable: true,
                        }"
                        :modules="modules"
                        class="mySwiper"
                    >
                        <swiper-slide>
                            <div class="bg-white rounded-2xl shadow-xl p-4 h-full">
                                <div class="w-full mb-4">
                                    <div class="flex justify-center gap-2 bg-warning mt-2 mb-4 mx-auto">
                                        <img src="../../assets/img/plus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                                        <img src="../../assets/img/plus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                                        <img src="../../assets/img/plus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                                    </div>
                                </div>
                                <h2 class="font-myFont font-semibold text-xl text-start mx-12 text-dark">Sisi Positif Tentang Dirimu</h2>
                                <p class="font-myFont text-start mx-12 text-gray-500 text-sm mb-4">Rangkuman Sisi Positifmu</p>
                                
                                <div class="mt-2">
                                    <div class="lg:w-1/2">
                                        <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
                                        <p class="text-sm text-gray-600 mx-12 text-start">
                                            {{ userResultDetect.gim.gim_details.excess }}
                                        </p>
                                        <!-- <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div> -->
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="bg-white rounded-2xl shadow-xl p-4 h-full">
                                <h2 class="font-myFont font-semibold text-xl text-center text-black">Sisi Negatif Tentang Dirimu</h2>
                                <p class="font-myFont text-center text-gray-500 text-sm mb-4">Rangkuman Sisi Negatifmu</p>
                                
                                <div class="mt-8">
                                    <div class="w-full pt-12">
                                        <div class="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg">
                                            <img src="../../assets/img/minus-crop.png" alt="Negatif Icon">
                                        </div>
                                    </div>
                                    <div class="mx-auto lg:w-1/2 mb-10">
                                        <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div>
                                        <p class="text-sm text-gray-600 text-center px-5">
                                            {{ userResultDetect.gim.gim_details.excess }}
                                        </p>
                                        <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import profile from './profile/profile.vue';
import { useStore } from 'vuex'
import initAPI from '../../api/api'
import { ref, computed, onMounted } from 'vue'
import { PhArrowRight } from '@phosphor-icons/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

export default {
    name: 'NewDashboard',
    components: {profile, PhArrowRight, Swiper, SwiperSlide},
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
            modules: [Pagination, Navigation],
        }
    }
}
</script>

<style scoped>
.gradasi {
    background: rgb(107,222,180);
background: linear-gradient(90deg, rgba(107,222,180,1) 19%, rgba(78,221,209,1) 66%, rgba(31,171,238,1) 97%);  
}
</style>