<template>
    <div class="mx-7 flex justify-center items-center">
        <div class="w-[375px] md:w-full h-11 flex-col justify-start items-start gap-4 inline-flex">
            <div class="self-stretch justify-between items-center inline-flex">
                <div class="w-[124px] md:w-full flex-col justify-start items-start gap-1 inline-flex">
                    <div class="self-stretch h-1 bg-[#667084] rounded-[100px]"></div>
                </div>
                <div class="w-[124px] md:w-full flex-col justify-start items-start gap-1 inline-flex">
                    <div class="self-stretch h-1 bg-[#3030f8] rounded-[100px]"></div>
                </div>
                <div class="w-[124px] md:w-full flex-col justify-start items-start gap-1 inline-flex">
                    <div class="self-stretch h-1 bg-[#e4e6eb] rounded-[100px]"></div>
                </div>
            </div>

            <div class="self-stretch justify-between items-center inline-flex">
                <div class="text-[#667084] text-sm font-normal font-roboto leading-tight">SET-AB</div>
                <div class="px-1 py-0.5 bg-[#f0f7fd] rounded-full justify-start items-center flex">
                    <div class="self-stretch justify-start items-center flex gap-2">
                        <div class="w-5 h-5 relative">
                            <img src="@/assets/img/cpm/timer.svg">
                        </div>
                        <div class="flex-col justify-start items-start inline-flex">
                            <div class="text-[#3030f8] text-xs font-medium font-roboto leading-none">07:10</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col lg:flex-row justify-center mx-7 pt-5 gap-4">
        <div class="w-full lg:w-1/2 bg-white shadow-md rounded-3xl p-[24px]">
            <div class="w-full border-black border-b-[1px]">
                <h1 class="mb-3 text-black text-base font-medium font-roboto leading-normal">
                    Bentuk manakah yang hilang?
                </h1>
            </div>

            <img class="mx-auto" src="@/assets/img/cpm/soal.svg" alt="soal">
        </div>

        <div class="w-full lg:w-1/2 bg-white shadow-md rounded-3xl p-[24px]">
            <div class="w-full border-black border-b-[1px]">
                <h1 class="mb-3 text-black text-base font-medium font-roboto leading-normal">
                    Pilih jawaban :
                </h1>
            </div>

            <div class="mt-5 grid grid-cols-3 gap-4">
                <div class="min-w-[94px] max-w-[334px] p-2 border border-b-[#3030f8] border-b-4 border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
            </div>
        </div>

        <div class="block lg:hidden text-center text-[#667084] text-base font-normal font-roboto leading-normal">
            2/12
        </div>

        <button class="lg:hidden hover:-translate-y-2 transition-all cursor-pointer self-stretch min-h-[42px] max-h-[62px] px-[60px] py-[18px] md:px-[90px] md:py-[18px] bg-[#3030f8] rounded-2xl border-l hover:border-l-[6px] hover:border-r-0 border-r hover:border-t-0 border-t border-b-4 hover:border-b-8 border-black justify-center items-center gap-2.5 inline-flex">
            <div class="text-white text-base font-medium font-roboto leading-normal">
                Selanjutnya
            </div>
            <div class="w-4 h-4 relative">
                <img src="@/assets/img/cpm/icon-row-up.svg">
            </div>
        </button>
    </div>

    <div class="hidden mt-8 lg:flex flex-col justify-center items-center gap-3 mx-7">
        <div class="text-center text-[#667084] text-base font-normal font-roboto leading-normal">
            2/12
        </div>

        <button class="w-1/2 mx-auto hover:-translate-y-2 transition-all cursor-pointer self-stretch min-h-[42px] max-h-[62px] px-[60px] py-[18px] md:px-[90px] md:py-[18px] bg-[#3030f8] rounded-2xl border-l hover:border-l-[6px] hover:border-r-0 border-r hover:border-t-0 border-t border-b-4 hover:border-b-8 border-black justify-center items-center gap-2.5 inline-flex">
            <div class="text-white text-base font-medium font-roboto leading-normal">
                Selanjutnya
            </div>
            <div class="w-4 h-4 relative">
                <img src="@/assets/img/cpm/icon-row-up.svg">
            </div>
        </button>
    </div>
</template>