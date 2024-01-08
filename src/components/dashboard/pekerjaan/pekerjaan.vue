<template>
    <div class="bg-gradient-primary rounded-lg rounded-bl-none rounded-br-none">
        <h2 class="font-myFont font-semibold text-md text-center mx-12 lg:mx-4 text-white py-3">
            Pekerjaan yang optimal untukmu
        </h2>
    </div>
    <div v-if="userResultDetect" class="bg-white rounded-bl-lg rounded-br-lg shadow-sm p-4 h-auto">
        <!-- <p class="font-myFont font-semibold text-start mx-12 lg:mx-4 text-gray-500 text-sm mb-2">List pekerjaan :</p> -->
        <div class="mt-2 mb-2">
            <div class="w-full">
                <div class="mx-12 lg:mx-4 flex flex-wrap justify-start gap-2">
                    <span
                    v-for="(item, index) in listPekerjaan"
                    :key="index"
                    class="px-4 py-2 text-xs text-primary border rounded-full border-primary font-myFont"
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