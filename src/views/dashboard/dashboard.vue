<template>
    <!-- <navbar/> -->
    <div v-if="userData && userResultDetect">
        <section v-if="userResultDetect.is_resulted == true" class="bg-gray-100 pb-16">
            <div class="flex flex-col lg:flex-row justify-center mx-4 pt-8 gap-4">
                <ProfileCard />
        
                <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="lg:w-2/3">
                    <div class="flex flex-col gap-4 h-full">
                        <div class="bg-white rounded-lg shadow-xl p-4 h-full overflow-hidden">
                            <div class="flex flex-col justify-center">
                                <h2 class="font-myFont text-xl text-center text-black font-semibold">Ayo lihat tipe kecerdasan kamu disini</h2>
                                <p class="font-myFont text-center text-gray-500 text-sm mb-2">Berikut adalah tipe kecerdasanmu</p>
                                <h2 class="font-myFont text-2xl text-center text-black font-bold italic my-4">{{ userResultDetect.gim.name }}</h2>
    
                                <hr class="w-full mb-6 my-4 border-t border-gray-300">
                                
                                <div class="flex flex-col md:flex-row lg:flex-row justify-center items-center my-8 gap-2">
                                    <div class="flex flex-col text-gray-700 bg-white border-2 hover:border-secondary bg-clip-border rounded-xl w-72 lg:w-96 h-48 overflow-hidden">
                                        <div class="p-4">
                                            <img class="w-16 mb-2" src="../../assets/img/sdi-crop.png" alt="Siapa Dirimu?">
                                            <h5 class="block mb-2 font-myFont text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                            Siapa Dirimu?
                                            </h5>
                                            <p class="block font-myFont text-base antialiased font-light leading-relaxed text-inherit">
                                            {{ userResultDetect.gim.type }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex flex-col text-gray-700 bg-white border-2 hover:border-secondary bg-clip-border rounded-xl w-72 lg:w-96 h-48 overflow-hidden">
                                        <div class="p-4">
                                            <img class="w-1/3 md:w-5/12 lg:w-20 mb-2" src="../../assets/img/sod-crop.png" alt="Sistem Operasi Dominan">
                                            <h5 class="block mb-2 font-myFont text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                            Sistem Otak Dominan
                                            </h5>
                                            <p class="block font-myFont text-base antialiased font-light leading-relaxed text-inherit">
                                            {{ userResultDetect.gim.dominance_op_system }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex flex-col text-gray-700 bg-white border-2 hover:border-secondary bg-clip-border rounded-xl w-72 lg:w-96 h-48 overflow-hidden">
                                        <div class="p-4">
                                            <img class="w-[45.5px] lg:w-[42px] mb-2" src="../../assets/img/kata-kunci-crop.png" alt="Kata Kunci">
                                            <h5 class="block mb-2 font-myFont text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                            Kata Kunci
                                            </h5>
                                            <p class="block font-myFont text-sm antialiased font-light leading-relaxed text-inherit">
                                            {{ userResultDetect.gim.keyword }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p class="mt-4 font-myFont text-center text-gray-500 text-sm">Kamu bisa melihat detail hasilmu disini</p>
                                <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="mt-4 px-2 py-2 w-1/2 lg:w-1/4 self-center rounded-lg bg-secondary font-myFont font-medium text-center text-white hover:opacity-75 hover:shadow-lg">Lihat Detail</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <chart v-if="userData.is_detected == 'Selesai Terdeteksi'"/>
    
            <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="flex flex-col justify-center gap-8 mx-4">
                <div class="w-full">
                    <div class="bg-white rounded-lg shadow-xl p-4 h-full">
                        <h2 class="font-myFont font-semibold text-xl text-center text-black">Sisi Positif Tentang Dirimu</h2>
                        <p class="font-myFont text-center text-gray-500 text-sm mb-4">Rangkuman Sisi Positifmu</p>
                        
                        <div class="mt-8">
                            <div class="w-full pt-12">
                                <div class="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg">
                                    <img src="../../assets/img/plus-crop.png" alt="Positif Icon">
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
                        <!-- <div class="w-full"> -->
                            <!-- <p class="text-md text-indigo-500 font-bold text-center">Konsultan</p> -->
                            <!-- <p class="text-xs text-gray-500 text-center">Konsultan</p> -->
                        <!-- </div> -->
                    </div>
                </div>
                <div class="w-full">
                    <div class="bg-white rounded-lg shadow-xl p-4 h-full">
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
                </div>
            </div>
        </section>

        <section v-else-if="(userResultDetect.is_detected == true && userResultDetect.is_resulted == false) || userResultDetect.is_detected == false" class="bg-gray-100 pb-16">
            <div class="flex flex-col lg:flex-row justify-center mx-4 pt-8 gap-4">
                <ProfileCard />
                <div v-if="userData.is_detected == 'Belum'" class="lg:w-2/3">
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <div class="flex flex-col justify-center">
                            <h2 class="font-myFont text-center text-black font-semibold">Ayo kenali dirimu sekarang juga!</h2>
                            <p class="font-myFont text-center text-gray-500 text-sm mb-4">Hmmm kamu nampaknya belum melakukan Deteksi GIM...</p>
                            <RouterLink :to="{name: 'user.views.deteksi'}" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                Deteksi Sekarang
                            </RouterLink>
                            <img src="../../../assets/img/no-data-found.png" class="w-96 self-center" alt="No Data Found">
                        </div>
                    </div>
                </div>

                <div v-else-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="lg:w-2/3">
                    <div class="bg-white rounded-lg shadow-lg p-4">
                        <div class="flex flex-col justify-center">
                            <h2 class="font-myFont text-center text-black font-semibold">Deteksi GIM kamu sedang di proses</h2>
                            <p class="font-myFont text-center text-gray-500 text-sm mb-4">Tunggu yaa.. Deteksi GIM kamu sedang di proses</p>
                            <RouterLink :to="{name: 'user.views.deteksi'}" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                Deteksi Sekarang
                            </RouterLink>
                            <img src="../../assets/img/wait-deteksi-crop.png" class="w-96 self-center mt-10" alt="No Data Found">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
import chart from '../../components/dashboard/chart/chart.vue'
import ProfileCard from '../../components/dashboard/profile/profile.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import initAPI from '../../api/api'
// import { useRouter } from 'vue-router'

export default {
    name: 'DashboardView',
    components: {
        chart,
        ProfileCard
    },
    setup(){
        const notDetected = ref(true)

        const store = useStore()
        // const router = useRouter()
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

            // console.log({
            //     id: customerId,
            //     token
            // }) 

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
            notDetected, 
            userData,
            userRole,
            userResultDetect
        }
    }
}
</script>