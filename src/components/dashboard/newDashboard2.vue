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
                <section class="bg-gray-100 pb-16">
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
                        <HeadingDashboard v-if="userResultDetect.is_resulted == true"/>
                        <!-- <profile/> -->
                        <HeadingBelumDeteksi v-if="(userResultDetect.is_detected == true && userResultDetect.is_resulted == false) || userResultDetect.is_detected == false"/>
                        <profile/>
                    </div>

                    <div class="mb-4 bg-white flex flex-col justify-center rounded-lg shadow-sm mx-4 p-4">
                        <h1 class="text-dark text-lg font-semibold cursor-default mb-4">Progress Tes Kamu</h1>
                        <progressTes :userResultDetect="userResultDetect" :isAssessment="isAssessment" :isTestedIQ="isTestedIQ" />
                    </div>

                    <div class="flex flex-col lg:flex-row justify-center mx-4 gap-4 h-auto">
                        <resumeAssessmen v-if="isAssessment" :isAssessment="isAssessment" :isTestedIQ="isTestedIQ" :dataAssessment="propsAssessment"/>

                        <resumeIq v-if="isTestedIQ" :propsIQ="propsIq" />
                    </div>

                    <!-- GIM Result -->
                    <div v-if="userResultDetect.is_resulted == true">
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
                    </div>
                    <!-- End GIM Result -->
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
import HeadingDashboard from '../customer/dashboard/heading/headingDashboard.vue'
import HeadingBelumDeteksi from '../customer/dashboard/heading/headingBelumDeteksi.vue'
import SlideKelebihanKekurangan from './slide/KelebihanKekurangan.vue'
import SlidePenddikanPekerjaan from './slide/PendidikanPekerjaan.vue'
import kelebihanVue from './kelebihan/kelebihan.vue';
import kekuranganVue from './kekurangan/kekurangan.vue'
import pekerjaan from './pekerjaan/pekerjaan.vue';
import pendidikan from './pendidikan/pendidikan.vue'
import progressTes from '../customer/dashboard/progress_tes/progressTes.vue';
import resumeAssessmen from '../customer/dashboard/resume/assessment/resumeAssessmen.vue';
import resumeIq from '../customer/dashboard/resume/iq/resumeIq.vue';
import { useStore } from 'vuex'
import initAPI from '../../api/api'
import { ref, computed, onMounted } from 'vue'
import DashboardConsultant from '../consultant/dashboard/dashboard.vue'
import DashboardAdmin from '../admin/dashboard/dashboard.vue'
import DashboardStaff from '../staffs/dashboard/dashboard.vue'
import { RouterLink, useRouter } from 'vue-router';
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
        progressTes,
        resumeAssessmen,
        resumeIq,
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
        const propsIq = ref('')

        const isAssessment = ref(false)
        const propsAssessment = ref('')
        
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
                    propsIq.value = responseIq.data.data
                }    

                //get assessment result
                const responseAssessment = await initAPI('get', `customers/assessments?customer_id=${userId}`, null, token)
                if(responseAssessment.data.data.length > 0){
                    isAssessment.value = true
                    propsAssessment.value = responseAssessment.data.data
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
            propsIq,
            isAssessment,
            propsAssessment,
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