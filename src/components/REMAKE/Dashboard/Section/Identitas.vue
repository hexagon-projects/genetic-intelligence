<template>
  <!-- Desktop -->
    <div class="hidden mx-9 lg:mx-[60px] lg:flex flex-col md:flex-row justify-center items-center lg:items-start lg:gap-[32px]">
      <!-- Card Selamat Datang -->
      <div class="hidden shadow-md w-[800px] h-[425px] relative bg-[#3030f8] rounded-3xl lg:flex flex-col justify-between">
          <!-- Logo JD -->
          <div class="absolute -right-5 bottom-2 opacity-50">
            <img class="w-[278px] h-[390px]" src="@/assets/img/logo-card-dashboard.svg">
          </div>
          <!-- End Logo JD -->
  
          <div class="mx-[24px] my-[32px] flex flex-col h-full">
            <div class="flex flex-col gap-[8px]">
              <span class="text-white font-sora font-medium leading-normal text-base">Selamat Datang!</span>
              <h1 class="text-3xl font-sora font-semibold leading-9 text-white">
                {{ props.userDatas.customer.name }}
              </h1>
            </div>
  
            <div class="relative self-end mt-auto bg-white w-[750px] rounded-b-3xl rounded-tr-3xl">
              <!-- temukan potensi -->
              <div class="absolute pt-[21px] -top-16 pb-[18px] rounded-t-3xl w-[578px] bg-white">
                <h1 class="mx-[33px] text-2xl font-bold">
                  Temukan Potensimu:
                </h1>
              </div>
  
              <div class="absolute rounded-bl-2xl -right-4 -top-[80px] p-4">
                <!-- Inverted Radius -->
                <div class="absolute bg-transparent pemisah bottom-0 -left-[2px]"></div>
                <!-- End Inverted Radius -->
  
                <button class="bg-white w-[154px] rounded-3xl p-2 flex justify-center items-center">
                  <a class="text-[#3030f8] text-base font-normal font-roboto flex items-center gap-[12px]">
                  Lihat Hasil
                    <div class="w-[32px] h-[32px] flex items-center justify-center bg-[#3030f8] rounded-[50%]">
                      <img src="@/assets/icons/arrow-go.svg" alt="go">
                    </div>
                  </a>
                </button>
              </div>
  
              <!-- type dan otak dominan -->
              <div class="w-[684px] h-[96px] mx-[33px] mb-[21px] flex items-center">
                <!-- Belum Test -->
                <div v-if="props.userDatas.customer.is_detected == 'Belum'" class="mt-5 bg-[#f0f7fd] border-l-2 border-[#3030f8] justify-start items-center inline-flex">
                  <div class="p-3 justify-start items-center gap-6 flex">
                      <div class="w-[651px] text-black text-base font-normal font-['Roboto'] leading-normal">Saatnya sekarang kamu untuk melakukan test GIM agar kamu mengetahui dan mengenal potensi terbaik yang ada pada diri kamu. Ayo lakukan test sekarang juga!</div>
                  </div>
                </div>

                <!-- Sudah Submit -->
                <div v-if="props.userDatas.customer.is_detected == 'Sudah Disubmit'" class="mt-5 bg-[#f0f7fd] border-l-2 border-[#3030f8] justify-start items-center inline-flex">
                  <div class="p-3 justify-start items-center gap-6 flex">
                      <div class="w-[651px] text-black text-base font-normal font-['Roboto'] leading-normal">
                        Kamu baru saja melakukan test Genetic Intelligence Mapping<br/>Test kamu saat ini sedang di-proses oleh Konsultan, kami akan hubungi ketika selesai.
                      </div>
                  </div>
                </div>

                <!-- Selesai Deteksi -->
                <div v-if="props.userDatas.customer.is_detected == 'Selesai Terdeteksi'" class="w-[296px] flex items-center border-r-2">
                  <div class="flex items-center gap-[24px] p-[24px]">
                    <img src="@/assets/icons/siapakah-dirimu.svg" alt="Icon">
                  <div class="flex flex-col">
                    <span class="text-base">Siapakah Dirimu?</span>
                    <span class="font-normal text-sm text-[#667085]">
                      {{ props.propsGIM.gim.type }}
                    </span>
                  </div>
                  </div>
                </div>
  
                <div v-if="props.userDatas.customer.is_detected == 'Selesai Terdeteksi'" class="w-[388px] h-[96px] flex items-center">
                  <div class="pl-11 flex items-center gap-[24px] p-[24px]">
                    <img src="@/assets/icons/sistem-kecerdasan.svg" alt="Icon">
                    <div class="flex flex-col">
                      <span class="text-base">Sistem Operasi Kecerdasan Dominan:</span>
                      <span class="font-normal text-sm text-[#667085]">
                        {{ props.propsGIM.gim.dominance_op_system }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!-- Card Identitas -->
      <div class="lg:w-96 h-[408px] flex-col justify-start items-start inline-flex">
        <div class="self-stretch px-9 py-4 bg-[#3030f8] rounded-tl-3xl rounded-tr-3xl justify-center items-center gap-2.5 inline-flex">
            <div class="grow shrink basis-0 text-white text-2xl font-medium font-['Roboto'] leading-loose">Identitas</div>
            <div class="w-6 h-6 relative">
              <img src="@/assets/icons/Edit.svg" alt="edit">
            </div>
        </div>
        <div class="self-stretch p-6 bg-white rounded-bl-3xl rounded-br-3xl shadow-md justify-start items-start gap-4 inline-flex">
            <div class="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                <div class="justify-center items-center gap-4 inline-flex">
                    <img class="w-14 h-14 rounded-full" src="https://via.placeholder.com/56x56" />
                    <div class="w-[217px] flex-col justify-start items-start gap-2 inline-flex">
                        <div class="self-stretch text-[#0b0b79] text-lg font-medium font-['Roboto'] leading-7">
                          {{ props.userDatas.customer.name }}
                        </div>
                        <div class="text-center text-[#667084] text-sm font-normal font-['Roboto'] leading-tight">
                          {{ props.userDatas.user.email }}
                        </div>
                    </div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Alamat</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">
                      {{ props.userDatas.customer.birth_place }}
                    </div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tanggal Lahir</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">
                      {{ props.userDatas.customer.birth_date }}
                    </div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Gender</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">
                      {{ props.userDatas.customer.gender }}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- Desktop -->

    <!-- Mobile -->
    <div class="mx-9 md:hiddden lg:hidden grid grid-cols-1 gap-[8px]">
      <div class="z-[2] relative overflow-clip mb-[32px] min-h-[526px] max-h-[725px] items-center flex flex-col justify-between bg-[#3030f8] rounded-3xl py-[25px] px-[17px]">
        <div class="z-[2] absolute -right-[122px] top-2 opacity-50">
          <img class="w-[478px] h-[390px]" src="@/assets/img/logo-card-dashboard.svg">
        </div>
        <div class="z-10 mb-4 w-full flex flex-col items-center gap-[8px]">
          <span class="text-white font-sora font-medium leading-normal text-sm">Selamat Datang!</span>
          <h1 class="text-2xl font-sora font-semibold leading-9 text-white">
            {{ props.userDatas.customer.name }}
          </h1>
        </div>

        <div class="z-10 self-end mx-auto mt-auto bg-white rounded-3xl p-[24px]">
          <div class="w-full flex flex-col gap-[4px]">
            <h1 class="text-center font-sora font-semibold text-lg text-black">Temukan Potensimu: </h1>

            <div v-if="props.userDatas.customer.is_detected !== 'Selesai Terdeteksi'" 
              class="w-full flex flex-col">
              <!-- Belum Test -->
              <div v-if="props.userDatas.customer.is_detected == 'Belum'" class="mt-5 bg-[#f0f7fd] border-l-2 border-[#3030f8] justify-start items-center inline-flex">
                <div class="p-3 justify-start items-center gap-6 flex">
                    <div class="text-black text-base font-normal font-['Roboto'] leading-normal">Saatnya sekarang kamu untuk melakukan test GIM agar kamu mengetahui dan mengenal potensi terbaik yang ada pada diri kamu. Ayo lakukan test sekarang juga!</div>
                </div>
              </div>
  
              <!-- Sudah Submit -->
              <div v-if="props.userDatas.customer.is_detected == 'Sudah Disubmit'" class="mt-5 bg-[#f0f7fd] border-l-2 border-[#3030f8] justify-start items-center inline-flex">
                <div class="p-3 justify-start items-center gap-6 flex">
                    <div class="text-black text-base font-normal font-['Roboto'] leading-normal">
                      Kamu baru saja melakukan test Genetic Intelligence Mapping.<br/>Test kamu saat ini sedang di-proses oleh Konsultan, kami akan hubungi ketika selesai.
                    </div>
                </div>
              </div>
            </div>
            
            <div v-if="props.userDatas.customer.is_detected == 'Selesai Terdeteksi'" 
              class="w-full flex flex-col divide-y-2">
              <div class="px-[18px] py-[24px] flex items-center gap-[24px]">
                <img src="@/assets/icons/siapakah-dirimu.svg" alt="Icon">

                <div class="w-full flex flex-col gap-[12px]">
                  <span class="text-[#031B4E] text-sm font-medium font-roboto">
                    Siapakah Dirimu?
                  </span>
                  <span class="text-[#667085] text-sm font-normal font-roboto">
                    {{ props.propsGIM.gim.type }}
                  </span>
                </div>
              </div>

              <div class="px-[18px] py-[24px] flex items-center gap-[24px]">
                <img src="@/assets/icons/sistem-kecerdasan.svg" alt="Icon">

                <div class="w-full flex flex-col gap-[12px]">
                  <span class="text-[#031B4E] text-sm font-medium font-roboto">
                    Sistem Operasi Kecerdasan Dominan:
                  </span>
                  <span class="text-[#667085] text-sm font-normal font-roboto">
                    {{ props.propsGIM.gim.dominance_op_system }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="z-10 mx-auto mt-[22px] ">
          <button class="w-[152px] h-11 pl-[13px] py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
            <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Lihat Hasil</div>
            <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                <div class="w-3 h-3 relative">
                  <img src="@/assets/icons/arrow-go.svg" alt="go">
                </div>
            </div>
          </button>
        </div>
      </div>

      <div class="h-[408px] md:h-full flex-col justify-start items-start inline-flex">
        <div class="self-stretch px-9 py-4 bg-[#3030f8] rounded-tl-3xl rounded-tr-3xl justify-center items-center gap-2.5 inline-flex">
            <div class="grow shrink basis-0 text-white text-2xl font-medium font-['Roboto'] leading-loose">Identitas</div>
            <div class="w-6 h-6 relative">
              <img src="@/assets/icons/Edit.svg" alt="edit">
            </div>
        </div>
        <div class="self-stretch p-6 bg-white rounded-bl-3xl rounded-br-3xl shadow-md justify-start items-start gap-4 inline-flex">
            <div class="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                <div class="justify-center items-center gap-4 inline-flex">
                    <img class="w-14 h-14 rounded-full" src="https://via.placeholder.com/56x56" />
                    <div class="w-[217px] flex-col justify-start items-start gap-2 inline-flex">
                        <div class="self-stretch text-[#0b0b79] text-lg font-medium font-['Roboto'] leading-7">
                          {{ props.userDatas.customer.name }}
                        </div>
                        <div class="text-center text-[#667084] text-sm font-normal font-['Roboto'] leading-tight">
                          {{ props.userDatas.user.email }}
                        </div>
                    </div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Alamat</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">
                      {{ props.userDatas.customer.birth_place }}
                    </div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Tanggal Lahir</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">
                      {{ props.userDatas.customer.birth_date }}
                    </div>
                </div>
                <div class="self-stretch h-16 px-4 py-1 rounded-2xl border border-[#667084] flex-col justify-center items-start gap-1 flex">
                    <div class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">Gender</div>
                    <div class="text-center text-[#0b0b79] text-lg font-normal font-['Roboto'] leading-7">
                      {{ props.userDatas.customer.gender }}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- Mobile -->
</template>

<script setup>
const props = defineProps(['userDatas', 'propsGIM'])
console.log(`props`, props.userDatas)
</script>

<style scoped>
.pemisah {
  width: 19px;
  height: 20px;
  border-bottom-left-radius: 1rem;
  box-shadow: -5px 8px 0px 0px #FFFFFF; 
}
</style>