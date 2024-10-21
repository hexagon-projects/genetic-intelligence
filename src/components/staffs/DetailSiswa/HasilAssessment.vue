<template>
    <div v-if="props.siswaDatas.customer_assessment !== null" class="w-full px-4 pt-5 pb-3 flex flex-col gap-[16px]">
        <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
            Diagnostic Assessment
        </div>

        <div v-for="(item, index) in dataAssessment" :key="index" class="flex flex-col gap-3">
            <div class="flex justify-between items-center">
                <span class="text-[#0c141c] text-base font-medium font-['Roboto'] leading-normal">
                    {{ item.type }}
                </span>

                <span class="text-[#0c141c] text-sm font-normal font-['Roboto'] leading-tight">
                    {{ item.percentage }}%
                </span>
            </div>

            <div class="w-full bg-[#CFDBE8] rounded h-2">
                <div 
                class="bg-[#3030F8] h-2 rounded transition-all duration-700"
                :style="{ width: item.percentage + '%' }"
                ></div>
            </div>

            <span class="text-[#4c7099] text-sm font-normal font-['Roboto'] leading-tight">
                {{ item.desc }}
            </span>
        </div>
    </div>

    <NotFound v-else/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NotFound from './NotFound.vue';

const dataAssessment = ref([
    {type: 'Visual', percentage: 0, desc: 'Gaya belajar yang mengandalkan pengelihatan sebagai penerima informasi. '},
    {type: 'Kinestetik', percentage: 0, desc: 'Gaya belajar yang mengandalkan gerakan, sentuhan atau rasa untuk menerima informasi. '},
    {type: 'Auditori', percentage: 0, desc: 'Gaya Belajar yang mengandalkan pendengaran sebagai penerima informasi dan pengetahuan. '},
])

const props = defineProps(['siswaDatas'])

onMounted(() => {
  setTimeout(() => {
    if(props.siswaDatas.customer_assessment !== null){
        const parsedPercentage = JSON.parse(props.siswaDatas.customer_assessment.total_answer)
        dataAssessment.value[0].percentage = parsedPercentage[0].percentage
        dataAssessment.value[1].percentage = parsedPercentage[1].percentage
        dataAssessment.value[2].percentage = parsedPercentage[2].percentage
    }
  }, 150);
});
</script>