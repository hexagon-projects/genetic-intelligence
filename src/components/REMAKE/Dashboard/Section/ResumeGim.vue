<template>
    <div class="mx-[60px] flex flex-col lg:flex-row items-center justify-center gap-[36px] lg:gap-[118px]">
      <img class="w-[400px] h-[340px]" src="@/assets/icons/icon-resume-gim.svg">

      <div class="flex flex-col gap-[16px] h-[300px]">
        <div class="bg-[#D6D6FE] rounded-3xl flex justify-center items-center w-[98px] h-[32px]">
          <span class="font-roboto font-medium text-[#3030F8]">Hasil GIM</span>
        </div>

        <h1 class="text-black text-3xl font-sora font-semibold">
          {{ props.propsGIM.gim.type }}
        </h1>

        <h3 class="text-black text-lg font-roboto font-medium">
          {{ props.propsGIM.gim.name }}
        </h3>

        <div class="flex flex-col gap-[24px]">
          <span class="text-[#667085] text-base font-roboto font-normal">
            {{ props.propsGIM.gim.description }}
          </span>

          <button @click="goTo('user.views.hasil_deteksi')" class="hover:drop-shadow-xl hover:translate-x-1 transition-all w-[215px] h-11 pl-6 pr-2 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
              <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Baca Selengkapnya</div>
              <div class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                  <div class="w-3 h-3 relative">
                    <img src="@/assets/icons/arrow-go-biru.svg" alt="go">
                  </div>
              </div>
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(['propsGIM'])

const router = useRouter()
const goTo = (route) => {
  router.push({name: route})
}
</script>