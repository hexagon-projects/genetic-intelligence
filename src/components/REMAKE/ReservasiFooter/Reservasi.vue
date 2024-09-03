<template>
    <div class="lg:hidden grid grid-cols-1 mx-9">
        <div class="md:w-full sm:px-[61px] sm:py-[63px] bg-gradient-to-br from-[#3030f8] to-[#43b0ff] rounded-3xl">
            <div class="my-6 mx-8 md:my-0 md:mx-0 flex flex-col md:flex-row justify-between items-center gap-[24px]">
                <div class="flex flex-col">
                    <img src="@/assets/icons/dashboard-reservasi.svg" alt="reservasi">
                </div>

                <div class="w-full items-center md:items-start flex flex-col">
                    <h1 class="text-white text-xl font-semibold font-sora">
                        Tertarik mengenal diri kamu lebih dalam? yuk cek langsung ke ahlinya!
                    </h1>
                    <button class="max-w-[86%] md:w-[42%] mt-8 h-11 pl-5 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-4 inline-flex">
                        <div class="text-[#3030f8] text-xs font-normal font-roboto">Reservasi Sekarang!</div>
                        <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                            <div class="w-3 h-3 relative">
                                <img src="@/assets/icons/arrow-go.svg" alt="go">
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="lg:hidden flex flex-col items-center justify-center mx-[60px]">
        <div class="w-[42vh] px-[61px] py-[63px] bg-gradient-to-br from-[#3030f8] to-[#43b0ff] rounded-3xl">
            <div class="flex flex-col justify-between">
                <div class="flex flex-col gap-[38px]">
                    <img src="@/assets/icons/dashboard-reservasi.svg" alt="reservasi">
                    <h1 class="text-white text-xl font-semibold font-sora">
                        Tertarik mengenal diri kamu lebih dalam? yuk cek langsung ke ahlinya!
                    </h1>
                </div>

                <button class="mt-[56px] h-11 pl-5 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-4 inline-flex">
                    <div class="text-[#3030f8] text-xs font-normal font-roboto">Reservasi Sekarang!</div>
                    <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                        <div class="w-3 h-3 relative">
                            <img src="@/assets/icons/arrow-go.svg" alt="go">
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div> -->

    <div class="hidden lg:flex items-center justify-center mx-[60px]">
      <div class="w-[1215px] h-[168.21px] px-[68px] py-6 flex-col justify-center items-center gap-2.5 inline-flex">
          <div class="flex justify-center items-center w-[1215px] h-[168.21px] bg-gradient-to-br from-[#3030f8] to-[#43b0ff] rounded-3xl">
            <div class="w-[1078px] h-[206.60px] justify-center items-center gap-[38px] inline-flex">
              <div class="w-[220.17px] h-[206.60px] relative">
                  <img src="@/assets/icons/dashboard-reservasi.svg" alt="reservasi">
              </div>
              <div class="grow shrink basis-0 h-[84px] justify-between items-center flex">
                  <div class="h-[84px] pb-5 justify-center items-center flex">
                      <div class="w-[498px] text-white text-2xl font-semibold font-sora leading-loose">Tertarik mengenal diri kamu lebih dalam? yuk cek langsung ke ahlinya!</div>
                  </div>

                  <button class="pl-6 pr-2 py-1.5 bg-white rounded-full justify-center items-center gap-3 flex">
                      <div class="text-[#3030f8] text-base font-normal font-roboto leading-normal">Reservasi Sekarang!</div>
                      <div class="p-2.5 bg-[#3030f8] rounded-3xl justify-start items-center gap-2.5 flex">
                          <div class="w-3 h-3 relative">
                            <img src="@/assets/icons/arrow-go.svg" alt="go">
                          </div>
                      </div>
                    </button>
              </div>
          </div>
          </div>
      </div>
    </div>
</template>