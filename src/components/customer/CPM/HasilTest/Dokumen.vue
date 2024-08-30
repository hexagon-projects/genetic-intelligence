<template>
    <div class="mb-[36px] self-stretch h-[124px] flex-col justify-start items-center gap-4 flex">
        <div class="px-4 py-1 bg-[#d6d6fe] rounded-[99px] justify-center items-center gap-2.5 inline-flex">
            <div class="text-[#3030f8] text-base font-medium font-roboto leading-normal">Hasil Tes</div>
        </div>
        <div class="self-stretch text-center text-[#3030f8] text-3xl font-semibold font-sora leading-9">
            {{ props.cpmInfo.type }}
        </div>
        <div class="justify-center items-center gap-4 inline-flex">
            <div class="text-center text-[#0b0b79] text-sm font-normal font-roboto leading-tight">Verified by :</div>
            <img class="w-[50px] h-6" src="@/assets/img/cpm/jatidiri-verified.png" />
        </div>
    </div>

    <!-- accordion -->
    <div class="mt-8 lg:mt-0 mb-6 w-full flex flex-col gap-6">
        <div class="transition-all self-stretch h-auto px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b border-[#667084] flex-col justify-start items-start gap-2.5 flex">
            <div @click="showGambaranUmum = !showGambaranUmum"  class="cursor-pointer self-stretch justify-between items-center inline-flex">
                <div class="flex-col justify-start items-start gap-4 inline-flex">
                    <div class="self-stretch text-[#031b4e] text-xl font-medium font-roboto leading-7">Gambaran Umum</div>
                </div>
                <div class="p-2.5 bg-[#f0f7fd] rounded-3xl justify-start items-center gap-2.5 flex">
                    <div class="w-8 h-8 relative rounded-3xl">
                        <img :class="{'rotate-180': showGambaranUmum}" class="transition-all" src="@/assets/img/cpm/panah-bawah.svg">
                    </div>
                </div>
            </div>

            <p v-if="showGambaranUmum" class="text-[#667085] font-roboto leading-relaxed">
                {{ props.cpmInfo.penjelasan }}
            </p>
        </div>

        <div class="transition-all self-stretch h-auto px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b border-[#667084] flex-col justify-start items-start gap-2.5 flex">
            <div @click="showSaran = !showSaran" class="cursor-pointer self-stretch justify-between items-center inline-flex">
                <div class="flex-col justify-start items-start gap-4 inline-flex">
                    <div class="self-stretch text-[#031b4e] text-xl font-medium font-roboto leading-7">Saran</div>
                </div>
                <div class="p-2.5 bg-[#f0f7fd] rounded-3xl justify-start items-center gap-2.5 flex">
                    <div class="w-8 h-8 relative rounded-3xl">
                        <img :class="{'rotate-180': showSaran}" class="transition-all" src="@/assets/img/cpm/panah-bawah.svg">
                    </div>
                </div>
            </div>
            <p v-if="showSaran" class="text-[#667085] font-roboto leading-relaxed">
                {{ props.cpmInfo.saran }}
            </p>
        </div>

        <div class="self-stretch h-auto px-9 py-6 bg-white rounded-3xl border-l border-r border-t border-b border-[#f04437] flex-col justify-start items-start gap-2.5 flex">
            <div class="w-full grow shrink basis-0 flex-col justify-start items-start gap-3.5 flex">
                <div class="self-stretch justify-center items-center gap-4 inline-flex">
                    <div class="grow shrink basis-0 text-[#031b4e] text-xl font-medium font-roboto leading-7">
                        Pentingnya Pemahaman dan Empati:
                    </div>
                </div>
                <div class="self-stretch text-[#667084] text-base font-normal font-roboto leading-relaxed tracking-wide">
                    {{ props.cpmInfo.pemahaman_empati }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    cpmInfo: Object,
})

const showSaran = ref(false)
const showGambaranUmum = ref(false)
</script>