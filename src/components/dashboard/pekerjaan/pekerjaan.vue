<template>
    <div class="hidden lg:block">
        <div v-if="userResultDetect" class="bg-white rounded-lg shadow-sm p-4 h-full">
            <img class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/pekerjaan.png" alt="">
            <!-- <p class="font-myFont font-semibold text-start mx-12 lg:mx-4 text-gray-500 text-sm mb-2">List pendidikan :</p> -->
            <div class="mt-2 mb-2">
                <div class="w-full flex flex-col">
                    <h1 class="font-myFont text-dark text-lg mx-4 font-semibold mb-1">Pekerjaan yang optimal untukmu</h1>
                    <div class="mx-12 lg:mx-4 flex flex-wrap justify-start gap-2">
                        <span
                        v-for="(item, index) in listPekerjaan"
                        :key="index"
                        class="px-4 py-2 text-xs text-biru border rounded-full border-biru font-myFont"
                        >
                        {{ item }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="block lg:hidden">
        <div class="mt-2 mb-2">
            <div class="w-full flex flex-col">
                <h1 class="font-myFont text-dark text-lg font-semibold mb-2">Pekerjaan yang optimal untukmu</h1>
                <div class="lg:mx-4 flex flex-wrap justify-start gap-2">
                    <span
                    v-for="(item, index) in listPekerjaan"
                    :key="index"
                    class="px-4 py-2 text-xs text-biru border rounded-full border-biru font-myFont"
                    >
                    {{ item }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue'

export default {
    name: 'Pekerjaan',
    setup(){
        const store = useStore()
        const listPekerjaan = ref([])
        const userResultDetect = computed(() => store.getters.getUserResultDetect);
        // const listPekerjaan = ['IT', 'Programmer', 'Kimia', 'Hukum', 'Kedokteran', 'Peternakan']
        listPekerjaan.value = userResultDetect.value.gim.gim_details.jobs.data
        return{
            userResultDetect,
            listPekerjaan,
        }
    }
}
</script>