<template>
    <div v-if="newRole == 'consultant'">
        <DashboardConsultant/>
    </div>

    <div v-else-if="newRole == 'customer'">
        <div v-if="loading" class="preloader-overlay">
            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
        </div>
        <div v-else>
            <div v-if="userData && userResultDetect">
                <section v-if="userResultDetect.is_resulted == true" class="bg-gray-100 pb-16">
                    <div class="mx-4 pt-4">
                        <ol class="flex text-gray-500 font-semibold">
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

                    <div class="flex flex-col lg:flex-row justify-center mx-4 gap-4 h-auto">
                        <div v-if="isAssessment" class="lg:w-[65%] w-full">
                            <div class="bg-white h-auto flex flex-col rounded-lg shadow-sm p-4 lg:mb-4">
                                <div class="flex justify-between items-center mb-3">
                                    <h1 class="text-dark text-base font-semibold cursor-default">Resume Assessment</h1>
                                    <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="font-medium text-biru text-base">Lihat Detail</RouterLink>
                                </div>

                                <div class="h-auto lg:h-[312px] flex flex-col md:flex-row lg:flex-row">
                                    <div class="w-full md:w-1/2 lg:w-1/2 bg-biru rounded-lg p-4">
                                        <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                                            Tipe Pembelajaran Kamu
                                        </h1>
                                        <div class="mx-auto flex-col my-4 w-[188px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                                            <span class="text-7xl text-center text-light font-myFont">
                                                {{ valueTotal }}
                                            </span>
                                            <p class="text-xs text-center text-light font-myFont">
                                                dari 100%
                                            </p>
                                        </div>
                                        <h1 class="font-myFont font-medium text-center text-light text-lg">
                                            {{ gayaBelajar }}
                                        </h1>
                                    </div>
            
                                    <div id="chartBelajar" class="w-full md:w-1/2 lg:w-1/2 p-4">
                                        <Pie v-if="data && data !== null" :data="data" :options="options" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div v-if="isTestedIQ" class="lg:w-[35%] w-full">
                            <div class="bg-white h-auto flex flex-col rounded-lg shadow-sm p-4 mb-3 lg:mb-0">
                                <div class="flex justify-between items-center mb-3">
                                    <h1 class="text-dark text-base font-semibold cursor-default">Resume Test IQ</h1>
                                    <RouterLink :to="{name: 'user.views.hasil_iq'}" class="font-medium text-biru text-base">Lihat Detail</RouterLink>
                                </div>

                                <div class="order-2 md:order-1 lg:order-1 w-full bg-biru rounded-lg p-4 mr-0">
                                    <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                                        Berikut Score IQ Kamu
                                    </h1>
                                    <div class="mx-auto flex-col my-6 w-[178px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                                        <span :class="{'-ml-[22px]': scoreIQ.length == 3}" class="text-7xl my-1 text-center text-light font-myFont">
                                            {{ scoreIQ }}
                                        </span>
                                    </div>
                                    <h1 class="font-myFont font-medium text-center text-light text-lg">
                                        {{ aliasIQ }} - {{ categoryIQ }}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- GIM Result -->
                    <div class="mx-4 lg:mb-4 flex justify-between items-center">
                        <h1 class="text-dark text-base font-semibold cursor-default">Resume Genetic Intelligence Mapping</h1>
                        <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="font-medium text-biru text-base">Lihat Detail</RouterLink>
                    </div>
        
                    <div class="flex flex-row justify-center mx-4 gap-4 h-auto mb-4">
                        <div class="hidden lg:block w-4/12">
                            <pekerjaan/>
                        </div>
                        <div class="hidden lg:block w-8/12">
                            <kelebihanVue/>
                        </div>
                    </div>
                    
                    <div class="flex flex-row justify-center mx-4 gap-4 h-auto">
                        <div class="hidden lg:block w-4/12">
                            <pendidikan/>
                        </div>
        
                        <div class="hidden lg:block w-8/12">
                            <kekuranganVue/>
                        </div>
                    </div>
        
        
                    <div class="flex flex-col gap-4 mx-4">
                        <SlideKelebihanKekurangan/>
                        <SlidePenddikanPekerjaan/>
                    </div>
                    <!-- End GIM Result -->

                    <!-- Test IQ -->
                    <!-- <div v-if="isTestedIQ">
                        <div class="mx-4 my-4 lg:my-4 flex justify-between items-center">
                            <h1 class="text-dark text-base font-semibold cursor-default">Resume Test IQ</h1>
                            <RouterLink :to="{name: 'user.views.hasil_iq'}" class="font-medium text-biru text-base font-myFont">Lihat Detail</RouterLink>
                        </div>
    
                        <div class="flex flex-row justify-center mx-4 gap-4 h-auto">
                            <div class="w-full flex flex-col justify-center gap-4">
                                <div class="w-full flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                                    <div class="lg:w-3/5 w-full">
                                        <div class="bg-white h-auto lg:h-[340px] flex flex-col md:flex-row lg:flex-row rounded-lg shadow-sm p-4">
                                            <div class="order-2 md:order-1 lg:order-1 w-full md:w-1/2 lg:w-1/2 bg-biru rounded-lg p-4 mr-0 lg:mr-[9px]">
                                                <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                                                    Berikut Score IQ Kamu
                                                </h1>
                                                <div class="mx-auto flex-col my-6 w-[178px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                                                    <span :class="{'-ml-[22px]': scoreIQ.length == 3}" class="text-7xl my-1 text-center text-light font-myFont">
                                                        {{ scoreIQ }}
                                                    </span>
                                                </div>
                                                <h1 class="font-myFont font-medium text-center text-light text-lg">
                                                    {{ aliasIQ }} - {{ categoryIQ }}
                                                </h1>
                                            </div>
                    
                                            <div class="order-1 md:order-2 lg:order-2 mb-2 lg:mb-0 w-full md:w-1/2 lg:w-1/2 flex flex-col gap-2 items-center bg-white">
                                                <img src="../../assets/img/hasil-iq.png" class="mx-auto w-1/3 mb-2 lg:mb-4">
                                                <p class="font-myFont text-sm text-center text-neutral-500 mb-2">
                                                    Kamu telah selesai melakukan Test IQ dan mendapatkan hasil IQ sebesar <span class="font-myfont font-medium text-dark">{{ scoreIQ }}</span>.
                                                </p>
                                                <p class="font-myFont text-sm text-center text-neutral-500">
                                                    Yang dimana score IQ tersebut tergolong tipe <span class="font-myfont font-medium text-dark">{{ aliasIQ }}</span> dengan category 
                                                    <span class="font-myfont font-medium text-dark">{{ categoryIQ }}</span>
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                    
                                    <div class="lg:w-2/5 w-full">
                                        <div class="bg-white h-auto lg:h-[340px] flex flex-col rounded-lg shadow-sm p-4">
                                            <div class="flex items-center pb-3">
                                                <div class="rounded-lg bg-[#f3f3ff] mx-2 flex justify-between items-center">
                                                        <span class="mx-3 text-biru gap-1 flex items-center font-semibold font-myFont py-3">
                                                            <PhBrain :size="24"/>
                                                        </span>
                                                    </div>
                                                <h1 class="font-myFont font-medium text-dark text-center text-lg">
                                                    IQ Berdasarkan Tipe Dan Kategori
                                                </h1>
                                            </div>
                    
                                            <hr>
                    
                                            <div class="flex flex-col gap-2 mt-3">
                                                <span class="text-[#484C98] flex justify-between items-center p-3 bg-[#F1F4FF] rounded-lg hover:border hover:border-[#839cf8] hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                                    <PhLightning :size="16"/>
                                                    <p class="uppercase font-poppins font-semibold text-xs">Superior - Baik Sekali</p>
                                                </span>
                                                <span class="text-[#70C7B0] flex justify-between items-center p-3 bg-[#F1FDF9] rounded-lg hover:border hover:border-success hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                                    <PhStar :size="16"/>
                                                    <p class="uppercase font-poppins font-semibold text-xs">Bright Normal - Baik</p>
                                                </span>
                                                <span class="text-[#70C7B0] flex justify-between items-center p-3 bg-[#f6f7fc] rounded-lg hover:border hover:border-[#b4c0fc] hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                                    <PhCheck :size="16"/>
                                                    <p class="uppercase font-poppins font-semibold text-xs">Average - Cukup</p>
                                                </span>
                                                <span class="text-[#E8CB81] flex justify-between items-center p-3 bg-[#FFFCF1] rounded-lg hover:border hover:border-warning hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                                    <PhFlagPennant :size="16"/>
                                                    <p class="uppercase font-poppins font-semibold text-xs">Dull Normal - Kurang</p>
                                                </span>
                                                <span class="text-[#D68D93] flex justify-between items-center p-3 bg-[#FEF7F5] rounded-lg hover:border hover:border-danger hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                                    <PhGhost :size="16"/>
                                                    <p class="uppercase font-poppins font-semibold text-xs">Borderline - Kurang Sekali</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- End Test IQ -->

                    <!-- Test Assessment -->
                    <!-- <div v-if="isAssessment">
                        <div class="mx-4 my-4 lg:my-4 flex justify-between items-center">
                            <h1 class="text-dark text-base font-semibold cursor-default">Resume Test Assessment</h1>
                            <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="font-medium text-biru text-base font-myFont">Lihat Detail</RouterLink>
                        </div>
    
                        <div class="flex flex-row justify-center mx-4 gap-4 h-auto">
                            <div class="flex flex-col justify-center gap-4">
                                <div class="flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                                    <div class="lg:w-3/5 w-full">
                                        <div class="bg-white h-auto lg:h-[340px] flex flex-col md:flex-row lg:flex-row rounded-lg shadow-sm p-4 mb-4">
                                            <div class="w-full md:w-1/2 lg:w-1/2 bg-biru rounded-lg p-4">
                                                <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                                                    Tipe Pembelajaran Kamu
                                                </h1>
                                                <div class="mx-auto flex-col my-4 w-[188px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                                                    <span class="text-7xl text-center text-light font-myFont">
                                                        {{ valueTotal }}
                                                    </span>
                                                    <p class="text-xs text-center text-light font-myFont">
                                                        dari 100%
                                                    </p>
                                                </div>
                                                <h1 class="font-myFont font-medium text-center text-light text-lg">
                                                    {{ gayaBelajar }}
                                                </h1>
                                            </div>
                    
                                            <div id="chartBelajar" class="w-full md:w-1/2 lg:w-1/2 bg-white p-4">
                                                <Pie v-if="data && data !== null" :data="data" :options="options" />
                                            </div>
                                            
                                        </div>
                                    </div>
                    
                                    <div class="lg:w-2/5 w-full">
                                        <div class="bg-white h-auto lg:h-[340px] flex flex-col rounded-lg shadow-sm p-4 mb-4">
                                            <div class="flex items-center p-4">
                                                <div class="rounded-lg bg-[#f3f3ff] mx-2 flex justify-between items-center">
                                                        <span class="mx-3 text-biru gap-1 flex items-center font-semibold font-myFont py-3">
                                                            <PhTextAa :size="24"/>
                                                        </span>
                                                    </div>
                                                <h1 class="font-myFont font-medium text-dark text-center text-lg">
                                                    Rangkuman Tipe Gaya Belajar Kamu
                                                </h1>
                                            </div>
                    
                                            <hr>
                    
                                            <h1 class="font-myFont font-semibold text-dark text-center text-lg mt-2 mb-[10px]">
                                                {{ gayaBelajar }}
                                            </h1>
                    
                                            <p v-html="formattedText" class="mx-7 font-myFont text-sm text-neutral-500">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </section>
        
                <section v-else-if="(userResultDetect.is_detected == true && userResultDetect.is_resulted == false) || userResultDetect.is_detected == false" class="bg-gray-100 pb-16">
                    <div class="mx-4 pt-4">
                        <ol class="flex text-gray-500 font-semibold">
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

    <div v-else-if="newRole == 'admin'">
        <DashboardAdmin/>
    </div>

    <div v-else-if="newRole == 'staff'">
        <DashboardStaff/>
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
import { PhArrowRight, PhBrain, PhLightning, PhStar, PhCheck, PhFlagPennant, PhGhost, PhTextAa } from '@phosphor-icons/vue';
import DashboardConsultant from '../consultant/dashboard/dashboard.vue'
import DashboardAdmin from '../admin/dashboard/dashboard.vue'
import DashboardStaff from '../staffs/dashboard/dashboard.vue'
import { RouterLink, useRouter } from 'vue-router';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'


export default {
    name: 'NewDashboard',
    components: {
        DashboardConsultant,
        DashboardAdmin,
        DashboardStaff,
        profile, 
        HeadingDashboard,
        HeadingBelumDeteksi,
        SlideKelebihanKekurangan, 
        SlidePenddikanPekerjaan,
        kelebihanVue,
        kekuranganVue,
        pekerjaan,
        pendidikan,
        PhArrowRight,
        PhBrain,
        PhLightning,
        PhStar,
        PhCheck,
        PhFlagPennant,
        PhGhost,
        PhTextAa,
        Pie
    },
    setup(){
        const router = useRouter()
        const loading = ref(false);
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userRole = computed(() => store.getters.getUserRole)
        const userResultDetect = computed(() => store.getters.getUserResultDetect);
        const newRole = ref('')

        const isTestedIQ = ref(false)
        const scoreIQ = ref(null)
        const aliasIQ = ref(null)
        const categoryIQ = ref(null)

        const isAssessment = ref(false)
        const persentaseJawaban = []
        const gayaBelajar = ref('')
        const nextParagraf = ref('')
        const formattedText = ref('')
        const data = ref(null)
        const options = {
            responsive: true,
            maintainAspectRatio: false
        }
        const valueTotal = ref(null)
        
        console.log(`user yeuh`,userData.value)

        loading.value = !loading.value
        onMounted(async() => {
            const token = Cookies.get('token')
            console.log(`cookie token`, token)
            // const const token = Cookies.get('token')
            if(token){
                const decodedToken = jwtDecode(token)
                console.log(`decode dashboard`, decodedToken)
                newRole.value = decodedToken.role
            } else {
                localStorage.clear()
                router.push('/login')
            }

            if(!userData.value){
                const localStorageUserData = localStorage.getItem('userData')
                const parsedUserData = JSON.parse(localStorageUserData)
                store.commit('user', parsedUserData)
            }
            
            if(newRole.value == 'customer'){
                const token = Cookies.get('token')
                const customerId = userData.value.id
    
                //get gim result
                const response = await initAPI('get', 'customers/gim-result/'+customerId, null, token)
                if(response.data.is_detected == true){
                    // console.log('aya ajig')
                    store.commit('userResultDetect', response.data)
                    localStorage.setItem('userResult', JSON.stringify(response.data))
                    // console.log(userResultDetect.value)
                } else {
                    store.commit('userResultDetect', response.data)
                }

                //get iq result
                const userId = JSON.parse(localStorage.getItem('userData')).id
                const responseIq = await initAPI('get', `customers?id=${userId}`, null, token)
                // console.log(responseIq.data.data[0])

                isTestedIQ.value = responseIq.data.data[0].customer_iq !== null ? true : false

                if(responseIq.data.data[0].customer_iq !== null){
                    scoreIQ.value = responseIq.data.data[0].customer_iq.customer_iq.toString()
                    aliasIQ.value = responseIq.data.data[0].customer_iq.iq.aliases
                    categoryIQ.value = responseIq.data.data[0].customer_iq.iq.category
                }    

                //get assessment result
                const responseAssessment = await initAPI('get', `customers/assessments?customer_id=${userId}`, null, token)
                if(responseAssessment.data.data.length > 0){
                    isAssessment.value = true
                    gayaBelajar.value = responseAssessment.data.data[0].assessment.name
                    responseAssessment.data.data[0].total_answer.forEach(element => {
                       persentaseJawaban.push(element.percentage) 
                    });

                    valueTotal.value = responseAssessment.data.data[0].result_percentage
                    const formatText = responseAssessment.data.data[0].assessment.description.map(sentence => sentence.replace(/\./g, '. <br> <br>')).join(' ');
                    formattedText.value = formatText

                    data.value = {
                        labels: ['Auditori', 'Kinestetik', 'Visual'],
                        datasets: [
                        {
                            backgroundColor: ['#0b40f4', '#00ab55', '#e7515a'],
                            data: persentaseJawaban,
                        },
                        ],
                    };
                }
            }

            loading.value = !loading.value
        })

        return {
            loading, 
            userData,
            userRole,
            newRole,
            userResultDetect,
            isTestedIQ,
            scoreIQ,
            aliasIQ,
            categoryIQ,
            isAssessment,
            formattedText,
            data,
            options,
            gayaBelajar,
            valueTotal,
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