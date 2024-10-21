<template>
    <div v-if="props.siswaDatas.customers_cpm !== null" class="w-full px-4 pt-5 pb-3 flex flex-col gap-[16px]">
        <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
            Hasil Tes CPM
        </div>

        <div class="flex flex-col gap-[16px]">
            <div class="flex flex-col">
                <h1 class="text-[#111416] text-base font-semibold font-sora leading-normal">
                    Jumlah soal yang dijawab benar
                </h1>
                <span class="text-[#111416] text-base font-normal font-roboto leading-normal">
                    {{ props.siswaDatas.customers_cpm.cpm_score }}
                </span>
            </div>

            <div class="flex flex-col">
                <h1 class="text-[#111416] text-base font-semibold font-sora leading-normal">
                    Grade
                </h1>
                <span class="text-[#111416] text-base font-normal font-roboto leading-normal">
                    {{ props.siswaDatas.customers_cpm.cpm.name }}
                </span>
            </div>

            <div class="mt-[9px] mb-4 flex flex-col gap-[12px]">
                <h1 class="text-[#111416] text-lg font-bold font-['Roboto']">
                    Interpretation
                </h1>
                <span class="text-[#111416] text-base font-normal font-['Roboto'] leading-normal">
                    {{ props.siswaDatas.customers_cpm.cpm.desc }}
                </span>
            </div>
        </div>
    </div>

    <NotFound v-else/>
</template>

<script setup>
import NotFound from './NotFound.vue';
const props = defineProps(['siswaDatas'])
</script>