<template>
    <div v-if="userData" class="lg:w-1/4">
        <div class="bg-white rounded-2xl shadow-sm p-4 h-full">
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
                    <div class="flex flex-row justify-between items-center border-b mb-2">
                        <h2 class="mb-4 md:mb-4 font-myFont font-medium text-center lg:text-start text-dark text-xl">Data Diri</h2>
                        <RouterLink :to="{name: 'user.views.profile'}" class="bg-biru p-2 lg:p-3 rounded-full mb-4 md:mb-4 font-myFont font-medium text-center lg:text-start text-light text-xs md:text-lg lg:text-xl">
                            <PhPencilSimple/>
                        </RouterLink>
                        <!-- <RouterLink :to="{name: 'user.views.profile'}">
                            <PhPencilSimple/>
                        </RouterLink> -->
                    </div>
                    <div class="flex flex-row justify-around lg:flex-col">

                        <!-- <hr class="my-2"> -->
                        <div v-if="!userData.image || userData.image == null" class="self-center">
                            <img class="mx-auto w-24 h-24 lg:w-28 lg:h-28 rounded-full hover:border-biru border-2 border-white mb-2" src="../../../assets/img/profile-mock.png" alt="User Profile">
                            <h2 class="font-myFont text-center font-semibold text-dark text-opa my-2">{{ userData.name }}</h2>
                        </div>
                        
                        <div v-else-if="userData.image !== null" class="self-center">
                            <img class="w-28 h-28 rounded-full hover:border-biru border-2 border-white mb-2" 
                            :src="'http://gim.app.api.hexagon.co.id/api/open/customers/'+userData.image" alt="User Profile">
                            <h2 class="font-myFont text-center font-bold text-dark my-2">{{ userData.name }}</h2>
                        </div>
    
                        <div class="flex flex-col items-center gap-2">
                            <div class="flex flex-col gap-1 items-start">
                                <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                    <PhMapPin/>
                                    {{ userData.birth_place }}
                                </a>
                                <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                    <PhCalendar/>
                                    {{ userData.birth_date }}
                                </a>
                                <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                    <PhDna/>
                                    {{ userData.blood_group }}
                                </a>
                                <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                    <PhHandsPraying/>
                                    {{ userData.religion }}
                                </a>
                                <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                    <PhGenderMale v-if="userData.gender == 'Laki-laki'"/>
                                    <PhGenderFemale v-else-if="userData.gender == 'Perempuan'"/>
                                    {{ userData.gender }}
                                </a>
                                <a class="font-myFont flex items-center gap-4 lg:text-sm text-dark">
                                    <PhUsers v-if="userData.status == 'Menikah'"/>
                                    <PhUser v-else-if="userData.status == 'Lajang'"/>
                                    {{ userData.status }}
                                </a>
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
    PhMapPin, PhDna, PhHandsPraying, PhCalendar,
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
        PhPencilSimple
    },
    setup(){
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)

        const userRole = JSON.parse(localStorage.getItem('userRole'))

        return {
            userData,
            userRole
        }
    }
}
</script>