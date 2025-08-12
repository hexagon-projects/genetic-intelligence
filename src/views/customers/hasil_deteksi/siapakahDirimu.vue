<template>
    <div class="w-full lg:w-2/5">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhUser :size="28"/>
                </span>
                <div class="flex flex-col">
                    <h1 class="font-myFont text-dark text-base font-semibold">Siapakah dirimu?</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        {{ userResultDetect.gim.type }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="w-full lg:w-2/5">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhBrain :size="28"/>
                </span>
                <div class="flex flex-col">
                    <h1 class="font-myFont text-dark text-base font-semibold">Sistem Operasi Kecerdasan Dominan:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        {{ userResultDetect.gim.dominance_op_system }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full lg:w-2/5">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhKey :size="28"/>
                </span>
                <div class="flex flex-col">
                    <h1 class="font-myFont text-dark text-base font-semibold">Kata Kunci:</h1>
                    <p class="font-myFont text-gray-600 text-xs">
                        {{ userResultDetect.gim.keyword }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PhUser, PhBrain, PhKey } from "@phosphor-icons/vue";

export default {
    components: {PhUser, PhBrain, PhKey},
    setup(){
        const userResultDetect = JSON.parse(localStorage.getItem('userResult'))

        return {
            userResultDetect
        }
    }
}
</script>