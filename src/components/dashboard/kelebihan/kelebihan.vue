<template>
    <div class="mt-2 mb-2">
        <div class="w-full flex flex-col">
            <h1 class="font-myFont text-dark text-lg font-semibold mb-2">Hal yang perlu kamu optimalkan</h1>
            <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
            <p class="text-sm text-gray-600 lg:mx-4 text-start">
                {{ userResultDetect.gim.gim_details.excess }}
            </p>
            <!-- <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div> -->
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'DashboardKelebihan',
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        return {
            userResultDetect
        }
    }
}
</script>