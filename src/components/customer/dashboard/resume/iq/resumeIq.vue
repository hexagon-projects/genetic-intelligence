<template>
    <div class="lg:w-[35%] w-full">
        <div class="bg-white h-auto flex flex-col rounded-lg shadow-sm p-4 mb-3 lg:mb-0">
            <div class="flex justify-between items-center mb-3">
                <h1 class="text-dark text-lg font-semibold cursor-default">Resume Test IQ</h1>
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
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'ResumeIQ',
    props: ['propsIQ'],
    setup(props){
        const scoreIQ = ref(null)
        const aliasIQ = ref(null)
        const categoryIQ = ref(null)

        scoreIQ.value = props.propsIQ[0].customer_iq.customer_iq.toString()
        aliasIQ.value = props.propsIQ[0].customer_iq.iq.aliases
        categoryIQ.value = props.propsIQ[0].customer_iq.iq.category

        return {
            scoreIQ,
            aliasIQ,
            categoryIQ
        }
    }
}
</script>