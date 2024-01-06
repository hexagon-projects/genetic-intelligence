<template>
    <div v-if="userData" class="lg:w-1/3">
        <div class="bg-white rounded-lg shadow-xl p-4 h-full">
            <div class="flex flex-col justify-center items-center">
                <h2 class="mb-2 font-myFont text-xl text-center text-black font-semibold">Profile Kamu</h2>
                
                <div v-if="!userData.image || userData.image == null" class="self-center mb-2">
                    <img class="mx-auto w-28 h-28 rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" src="../../../assets/img/boy-mock.png" alt="User Profile">
                    <!-- <img class="w-36 rounded-lg shadow-lg mb-2" src="../../assets/img/profile-mock.png" alt=""> -->
                    <h2 class="font-myFont text-center font-semibold text-black">{{ userData.name }}</h2>
                </div>
                
                <div v-else-if="userData.image !== null" class="self-center mb-2">
                    <img class="w-28 h-28 rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" 
                    :src="'http://gim.app.api.hexagon.co.id/api/open/customers/'+userData.image" alt="User Profile">
                    <!-- <img class="w-36 rounded-lg shadow-lg mb-2" src="../../assets/img/profile-mock.png" alt=""> -->
                    <h2 class="font-myFont text-center font-semibold text-black">{{ userData.name }}</h2>
                </div>

                <button class="p-1 rounded-xl bg-gray-300 text-black text-xs mb-2">
                    {{ userRole }}
                </button>
                
                <hr class="w-full my-6 border-t border-gray-300">
                
                <div class="self-center w-full">
                    <h2 class="mb-2 md:mb-4 font-myFont font-semibold text-center lg:text-start text-black text-xl">Data Diri</h2>
                    <table class="w-full mb-2">
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
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'ProfileCard',
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