<template>
    <div v-if="props.siswaDatas.customers_results !== null" class="w-full px-4 pt-5 pb-3 flex flex-col gap-[16px]">
        <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
            Hasil Tes GIM
        </div>

        <div class="flex flex-col gap-[16px]">
            <div class="flex flex-col">
                <h1 class="text-[#111416] text-base font-medium font-sora leading-normal">
                    Kecerdasan Dominan
                </h1>
                <span class="text-[#607789] text-sm font-normal font-['Roboto'] leading-tight">
                    {{ props.siswaDatas.customers_results.gim.name }}
                </span>
            </div>

            <div class="flex flex-col">
                <h1 class="text-[#111416] text-base font-medium font-sora leading-normal">
                    Tipe Kecerdasan
                </h1>
                <span class="text-[#607789] text-sm font-normal font-['Roboto'] leading-tight">
                    {{ props.siswaDatas.customers_results.gim.type }}
                </span>
            </div>

            <div class="flex flex-col">
                <h1 class="text-[#111416] text-base font-medium font-sora leading-normal">
                    Kata Kunci
                </h1>
                <span class="text-[#607789] text-sm font-normal font-['Roboto'] leading-tight">
                    {{ props.siswaDatas.customers_results.gim.keyword }}
                </span>
            </div>

            <div class="mt-[9px] mb-4 flex flex-col gap-[12px]">
                <h1 class="text-[#111416] text-lg font-bold font-['Roboto']">
                    Result Analysis
                </h1>
                <span class="text-[#111416] text-sm font-normal font-['Roboto'] leading-normal">
                    {{ props.siswaDatas.customers_results.gim.description }}
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