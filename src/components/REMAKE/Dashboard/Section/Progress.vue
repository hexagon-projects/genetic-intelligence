<template>
    <div class="flex flex-col gap-[16px] items-center mb-[56px]">
      <div class="bg-[#D6D6FE] rounded-3xl flex justify-center items-center w-[122px] h-[32px]">
        <span class="font-roboto font-medium text-[#3030F8]">Lakukan Tes</span>
      </div>

      <h1 class="text-[#0B0B79] font-semibold text-3xl font-sora">Progres Tes</h1>

      <h3 class="mx-4 lg:mx-0 text-[#667085] text-center font-normal text-sm md:text-base font-sora">
        Berikut tahapan proses dalam menggunakan Jatidiri.app untuk memahami diri melalui berbagai tes:
      </h3>
    </div>

    <div class="mx-[30px] md:mx-[60px] grid grid-cols-1 md:grid-cols-2 gap-[32px]">
        <div class="relative py-[24px] px-[36px] bg-[#3030F8] rounded-3xl">
            <img class="z-0 absolute top-10 right-2 opacity-25" src="@/assets/icons/dna-overlay.svg" alt="dna">
            <div class="flex flex-col items-start gap-[16px]">
                <div class="flex items-center gap-[16px]">
                    <div class="bg-white inline-flex justify-center items-center text-[#3030F8] size-[36px] lg:size-[56px] rounded-[50%]">
                        <span class="font-roboto font-medium text-base lg:text-2xl">01</span>
                    </div>
                    <h1 class="text-white font-roboto text-base md:text-xl lg:text-2xl font-medium">Test GIM</h1>
                </div>

                <h1 class="z-20 font-roboto font-normal text-white text-base">
                    Tes kepribadian untuk menemukan karakter, kekuatan, kelemahan, minat, potensi, serta pilihan karir kamu.
                </h1>

                <h3 v-if="props.userData.customer.is_detected == 'Selesai Terdeteksi'" class="h-11 font-roboto font-medium text-white text-base">
                    Status : Selesai
                </h3>

                <h3 v-if="props.userData.customer.is_detected == 'Sudah Disubmit'" class="h-11 font-roboto font-medium text-white text-base">
                    Status : In Review
                </h3>

                <RouterLink :to="{name: 'user.views.deteksi'}" v-if="props.userData.customer.is_detected == 'Belum'" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
                    <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                    <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                        <div class="w-3 h-3 relative">
                            <img src="@/assets/icons/arrow-go.svg" alt="go">
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="relative py-[24px] px-[36px] bg-[#3030F8] rounded-3xl">
            <img class="z-0 absolute top-10 right-2 opacity-25" src="@/assets/icons/task-list-overlay.svg" alt="assesment">
            <div class="flex flex-col items-start gap-[16px]">
                <div class="flex items-center gap-[16px]">
                    <div class="bg-white inline-flex justify-center items-center text-[#3030F8] size-[36px] lg:size-[56px] rounded-[50%]">
                        <span class="font-roboto font-medium text-base lg:text-2xl">02</span>
                    </div>
                    <h1 class="text-white font-roboto text-base md:text-xl lg:text-2xl font-medium">
                        Test Assessment
                    </h1>
                </div>

                <h1 class="z-20 font-roboto font-normal text-white text-base">
                    Tes instrumen untuk mengetahui gaya belajar kamu agar guru dapat membuat metode pembelajaran yang sesuai dan efektif.
                </h1>

                <h3 v-if="props.userData.customer.customers_assessments !== null" class="h-11 font-roboto font-medium text-white text-base">
                    Status : Selesai
                </h3>

                <RouterLink :to="{name: 'user.views.assesment'}" v-if="props.userData.customer.customers_assessments == null" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
                    <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                    <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                        <div class="w-3 h-3 relative">
                            <img src="@/assets/icons/arrow-go.svg" alt="go">
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="relative py-[24px] px-[36px] bg-[#3030F8] rounded-3xl">
            <img class="z-0 absolute top-10 right-2 opacity-25" src="@/assets/icons/brain-overlay.svg" alt="iq">
            <div class="flex flex-col items-start gap-[16px]">
                <div class="flex items-center gap-[16px]">
                    <div class="bg-white inline-flex justify-center items-center text-[#3030F8] size-[36px] lg:size-[56px] rounded-[50%]">
                        <span class="font-roboto font-medium text-base lg:text-2xl">03</span>
                    </div>
                    <h1 class="text-white font-roboto text-base md:text-xl lg:text-2xl font-medium">Test IQ</h1>
                </div>

                <h1 class="z-20 font-roboto font-normal text-white text-base">
                    Tes instrumen untuk mengetahui skor IQ kamu dengan cepat dan akurat, memberikan gambaran jelas tentang kemampuan kognitifmu.
                </h1>

                <h3 v-if="props.userData.customer.customers_iq !== null" class="h-11 font-roboto font-medium text-white text-base">
                    Status : Selesai
                </h3>

                <RouterLink :to="{name: 'user.views.iq'}" v-if="props.userData.customer.customers_iq == null" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
                    <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                    <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                        <div class="w-3 h-3 relative">
                            <img src="@/assets/icons/arrow-go.svg" alt="go">
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div v-if="props.userData.customer.institutions && (props.userData.customer.institutions.type == 'SD' || props.userData.customer.institutions.type == 'TK')" class="relative py-[24px] px-[36px] bg-[#3030F8] rounded-3xl">
            <img class="z-0 absolute top-10 right-2 opacity-25" src="@/assets/icons/cpm-overlay.svg" alt="cpm">
            <div class="flex flex-col items-start gap-[16px]">
                <div class="flex items-center gap-[16px]">
                    <div class="bg-white inline-flex justify-center items-center text-[#3030F8] size-[36px] lg:size-[56px] rounded-[50%]">
                        <span class="font-roboto font-medium text-base lg:text-2xl">04</span>
                    </div>
                    <h1 class="text-white font-roboto text-base md:text-xl lg:text-2xl font-medium">Test CPM</h1>
                </div>

                <h1 class="z-20 font-roboto font-normal text-white text-base">
                    Tes CPM yang dirancang untuk mengukur kemampuan penalaran logis dan intelegensi non-verbal Kamu.
                </h1>

                <h3 v-if="props.userData.customer.customers_cpm !== null" class="h-11 font-roboto font-medium text-white text-base">
                    Status : Selesai
                </h3>

                <RouterLink :to="{name: 'user.views.cpm'}" v-if="props.userData.customer.customers_cpm == null" class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
                    <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                    <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                        <div class="w-3 h-3 relative">
                            <img src="@/assets/icons/arrow-go.svg" alt="go">
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>

    </div>


    <!-- <div class="bg-white h-auto mx-[60px] px-[24px] py-[32px] rounded-xl">
      <div class="mb-6 flex flex-col items-center">
        <img src="@/assets/img/Steper.svg">

        <div class="mx-10 min-h-[146px] max-h-[386px] lg:max-h-[216px] justify-start items-start gap-7 inline-flex">
          <div class="grow shrink basis-0 flex-col justify-between items-center gap-6 inline-flex">
              <div class="px-4 justify-center items-center inline-flex">
                  <div class="text-center text-black text-base lg:text-2xl font-medium font-['Roboto'] leading-loose">Test GIM</div>
              </div>
              <div class="self-stretch text-center text-[#667084] text-sm lg:text-base font-normal font-['Roboto'] leading-normal">Tes kepribadian untuk menemukan karakter, kekuatan, kelemahan, minat, potensi, serta pilihan karir kamu.</div>
              <div class="self-stretch text-center text-[#3030f8] text-sm lg:text-base font-normal font-['Roboto'] leading-normal">Status : Selesai</div>
          </div>
          <div class="grow shrink basis-0 flex-col justify-between items-center gap-6 inline-flex">
              <div class="px-4 justify-center items-center inline-flex">
                  <div class="text-center text-black text-base lg:text-2xl font-medium font-['Roboto'] leading-loose">Test Assesment</div>
              </div>
              <div class="self-stretch text-center text-[#667084] text-sm lgtext-base font-normal font-['Roboto'] leading-normal">Tes instrumen untuk mengetahui gaya belajar kamu agar guru dapat membuat metode pembelajaran yang sesuai dan efektif.</div>
              <div class="self-stretch text-center text-[#3030f8] text-sm lgtext-base font-normal font-['Roboto'] leading-normal">Status : Selesai</div>
          </div>
          <div class="grow shrink basis-0 flex-col justify-between items-center gap-6 inline-flex">
              <div class="px-4 justify-center items-center inline-flex">
                  <div class="text-center text-black text-base lg:text-2xl font-medium font-['Roboto'] leading-loose">Test IQ</div>
              </div>
              <div class="self-stretch text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tes instrumen untuk mengetahui skor IQ kamu dengan cepat dan akurat, memberikan gambaran jelas tentang kemampuan kognitifmu.</div>
              
              <div class="h-11 pl-6 pr-2 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                  <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Tes Sekarang</div>
                  <div class="p-2.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex">
                      <div class="w-3 h-3 relative">
                        <img src="@/assets/icons/arrow-go-biru.svg" alt="go">
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div> -->
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps(['userData'])
console.log(`props`, props.userData)
</script>