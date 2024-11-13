<template>
  <div class="w-full h-auto flex justify-center pb-[110px]">
      <div class="mx-[30px] md:mx-[80px] w-[872px] h-auto p-6 bg-white rounded-2xl shadow flex-col justify-center items-center gap-3 inline-flex">
          <div class="w-full flex flex-col lg:flex-row md:justify-between">
              <span class="text-black text-lg md:text-xl lg:text-2xl font-medium font-['Roboto'] leading-loose">Jawablah Pertanyaan Dibawah Ini</span>
          </div>
  
          <div class="self-start w-full">
              <div class="flex flex-col mb-[30px]">
                  <div class="text-black text-base font-normal font-['Roboto'] leading-normal text-justify">
                      <span class="w-full text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                          Tuliskan di bawah ini tiga (3) macam pekerjaan yang paling ingin Kamu lakukan atau paling Kamu sukai (tidak harus pekerjaan yang tercantum dalam daftar yang sebelumnya ada)
                      </span>
                  </div>
              </div>
              
              <div v-if="timerStarted" class="flex items-center justify-end w-full gap-1 text-right">
                  <h1 class="font-roboto text-sm md:text-md lg:text-md font-normal">Waktu berjalan:</h1>
                  <span class="font-roboto text-sm md:text-md lg:text-md font-normal">{{ formatTime }}</span>
              </div>
              
              <div class="w-full flex flex-col gap-5">
                  <div class="flex items-center">
                      <span class="text-black text-base font-normal">1.</span>
                      <input type="text" v-model="answers[0]" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
                  </div>
                  <div class="flex items-center">
                      <span class="text-black text-base font-normal">2.</span>
                      <input type="text" v-model="answers[1]" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
                  </div>
                  <div class="flex items-center">
                      <span class="text-black text-base font-normal">3.</span>
                      <input type="text" v-model="answers[2]" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
                  </div>
              </div>
          </div>
  
          <div class="flex flex-col items-center">
              <button @click="submitAnswers" class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                  <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Kirim Jawaban</div>
                  <div class="w-6 h-6 relative">
                      <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon"/>
                  </div>
              </button>
          </div>
      </div>
  </div>
</template>