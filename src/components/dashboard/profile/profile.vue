<template>
    <div v-if="userData" class="lg:w-1/4">
        <div class="flex bg-gradient-primary rounded-lg rounded-bl-none rounded-br-none justify-between items-center py-1">
            <h2 class="my-2 md:my-2 font-myFont font-bold text-center lg:text-start mx-4 text-white text-base">
                Data Diri
            </h2>
            <!-- <RouterLink :to="{name: 'user.views.profile'}" class="bg-light p-2 lg:p-3 rounded-full my-2 md:my-2 mx-4 font-myFont font-medium text-center lg:text-start text-dark text-xs md:text-lg lg:text-xl">
                <PhPencilSimple/>
            </RouterLink> -->
        </div>
        <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex flex-col justify-center items-center">
                <!-- <h2 class="mb-2 font-myFont text-xl text-center text-black font-semibold">Profile Kamu</h2>
                
                <div v-if="!userData.image || userData.image == null" class="self-center mb-2">
                    <img class="mx-auto w-28 h-28 rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" src="../../../assets/img/boy-mock.png" alt="User Profile">
                    <h2 class="font-myFont text-center font-semibold text-black">{{ userData.name }}</h2>
                </div>
                
                <div v-else-if="userData.image !== null" class="self-center mb-2">
                    <img class="w-28 h-28 rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" 
                    :src="'http://gim.app.api.hexagon.co.id/api/open/customers/'+userData.image" alt="User Profile">
                    <h2 class="font-myFont text-center font-semibold text-black">{{ userData.name }}</h2>
                </div>

                <button class="p-1 rounded-xl bg-gray-300 text-black text-xs mb-2">
                    {{ userRole }}
                </button> -->
                
                <!-- <hr class="w-full my-6 border-t border-gray-300"> -->
                <div class="self-center w-full">
                    <div class="flex flex-col justify-around lg:flex-col">

                        <!-- <hr class="my-2"> -->
                        <div v-if="!userData.image || userData.image == null" class="self-center">
                            <img class="round mx-auto w-24 h-24 lg:w-28 lg:h-28 rounded-full hover:border-biru border-1 border-white" src="../../../assets/img/profile-mock.png" alt="User Profile">
                            <RouterLink :to="{name: 'user.views.profile'}" class="mt-2 lg:-mt-18 flex justify-center items-center gap-1 mb-2 md:my-2 mx-4 font-myFont font-sm text-center lg:text-start text-biru text-[11px] md:text-lg lg:text-sm">
                                <PhPencilSimple/>
                                Ubah Profil
                            </RouterLink>
                            <h2 class="-mt-2 font-myFont text-center font-semibold text-dark mb-1">{{ userData.name }}</h2>
                        </div>
                        
                        <div v-else-if="userData.image !== null" class="self-center">
                            <img class="round mx-auto w-24 h-24 lg:w-28 lg:h-28 rounded-full hover:border-biru border-1 border-white" 
                            :src="baseUrl+'open/customers/'+userData.image" alt="User Profile">
                            <RouterLink :to="{name: 'user.views.profile'}" class="mt-2 lg:-mt-18 flex justify-center items-center gap-1 mb-2 md:my-2 mx-4 font-myFont font-sm text-center lg:text-start text-biru text-[11px] md:text-lg lg:text-sm">
                                <PhPencilSimple/>
                                Ubah Profil
                            </RouterLink>
                            <h2 class="-mt-2 font-myFont text-center font-semibold text-dark mb-1">{{ userData.name }}</h2>
                        </div>
    
                        <div class="flex flex-col items-center gap-2">
                            <div class="flex flex-col gap-2 items-start pb-5">
                                <div class="font-myFont px-4 py-2 w-full bg-biru bg-opacity-10 rounded-xl border flex justify-between items-center gap-28">
                                    <div class="bg-white p-1 rounded-full">
                                        <PhMapPin/>
                                    </div>
                                    <a class="lg:text-sm text-dark">
                                        {{ userData.birth_place ? userData.birth_place : '-' }}
                                    </a>
                                </div>
                                <div class="font-myFont px-4 py-2 mx-0 w-full bg-biru bg-opacity-10 rounded-xl border flex justify-between items-center gap-28">
                                    <div class="bg-white p-1 rounded-full">
                                        <PhCalendar/>
                                    </div>
                                    <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                        {{ userData.birth_date ? userData.birth_date : '-' }}
                                    </a>
                                </div>
                                <div class="font-myFont px-4 py-2 mx-0 w-full bg-biru bg-opacity-10 rounded-xl border flex justify-between items-center gap-28">
                                    <div class="bg-white p-1 rounded-full">
                                        <PhDna/>
                                    </div>
                                    <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                        {{ userData.blood_group ? userData.blood_group : '-' }}
                                    </a>
                                </div>
                                <!-- <div class="font-myFont px-4 py-2 mx-0 w-full bg-biru bg-opacity-10 rounded-xl border flex justify-between items-center gap-28">
                                    <PhHandsPraying/>
                                    <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                        {{ userData.religion }}
                                    </a>
                                </div> -->
                                <div class="font-myFont px-4 py-2 mx-0 w-full bg-biru bg-opacity-10 rounded-xl border flex justify-between items-center gap-28">
                                    <div class="bg-white p-1 rounded-full">
                                        <PhPerson v-if="userData.gender == null"/>
                                        <PhGenderMale v-if="userData.gender == 'Laki-laki'"/>
                                        <PhGenderFemale v-else-if="userData.gender == 'Perempuan'"/>
                                    </div>
                                    <a class="pb-font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                        {{ userData.gender ? userData.gender : '-' }}
                                    </a>
                                </div>
                                <!-- <div class="font-myFont px-4 py-2 mx-0 w-full bg-biru bg-opacity-10 rounded-xl border flex justify-between items-center gap-28">
                                    <PhUsers v-if="userData.status == 'Menikah'"/>
                                    <PhUser v-else-if="userData.status == 'Lajang'"/>
                                    <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                        {{ userData.status }}
                                    </a>
                                </div> -->
                            </div>
                        </div>
                    </div>

                    <!-- <table class="w-full mb-2">
                        <tbody class="md:mx-12">
                            <tr class="flex justify-between">
                                <td class="font-myFont font-semibold text-black">Nama:</td>
                                <td class="font-myFont">{{ userData.name }}</td>
                            </tr>
                            <tr class="flex justify-between">
                                <td class="font-myFont font-semibold text-black">Tempat Lahir:</td>
                                <td class="font-myFont">{{ userData.birth_place }}, {{ userData.birth_date }}</td>
                            </tr>
                            <tr class="flex justify-between">
                                <td class="font-myFont font-semibold text-black">Gol. Darah:</td>
                                <td class="font-myFont">{{ userData.blood_group }}</td>
                            </tr>
                            <tr class="flex justify-between">
                                <td class="font-myFont font-semibold text-black">Agama:</td>
                                <td class="font-myFont">{{ userData.religion }}</td>
                            </tr>
                            <tr class="flex justify-between">
                                <td class="font-myFont font-semibold text-black">Jenis Kelamin:</td>
                                <td class="font-myFont">{{ userData.gender }}</td>
                            </tr>
                            <tr class="flex justify-between">
                                <td class="font-myFont font-semibold text-black">Status Nikah:</td>
                                <td class="font-myFont">{{ userData.status }}</td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { 
    PhMapPin, PhDna, PhHandsPraying, PhCalendar, PhPerson,
    PhGenderMale, PhGenderFemale, PhUsers, PhUser, PhPencilSimple 
} from '@phosphor-icons/vue'

export default {
    name: 'ProfileCard',
    components: {
        PhMapPin,
        PhCalendar, 
        PhDna, 
        PhHandsPraying, 
        PhGenderMale, 
        PhGenderFemale,
        PhUser,
        PhUsers,
        PhPencilSimple,
        PhPerson
    },
    setup(){
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)

        const userRole = JSON.parse(localStorage.getItem('userRole'))

        const baseUrl = import.meta.env.VITE_API_BASE_URL

        return {
            userData,
            userRole,
            baseUrl
        }
    }
}
</script>

<style scoped>
.round {
    border: 2px solid transparent;
    background: linear-gradient(#151515, #151515) padding-box,
    linear-gradient(to top, rgba(11,64,244,1), rgba(2,178,255,1)) border-box;
    border-radius: 50%;
}
</style>