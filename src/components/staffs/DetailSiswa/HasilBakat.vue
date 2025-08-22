<template>
  <div v-if="props.siswaDatas.customer_rmib !== null" class="w-full px-4 pb-3 flex flex-col gap-[16px]">
    <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
      Hasil Tes Bakat
    </div>
    <div class="mt-4 mb-5">
      <h2 class="font-semibold mb-2">Kata Kunci</h2>
      <div class="flex space-x-2">
        <button
          v-if="siswaDatas.customer_rmib.rmib1"
          class="bg-[#3030f8] text-white px-3 py-2 rounded-lg"
        >
          {{ siswaDatas.customer_rmib.rmib1.name }}
          {{ siswaDatas.customer_rmib.rmib1.slug }}
        </button>
        <button
          v-if="siswaDatas.customer_rmib.rmib2"
          class="bg-[#3030f8] text-white px-3 py-2 rounded-lg"
        >
          {{ siswaDatas.customer_rmib.rmib2.name }}
          {{ siswaDatas.customer_rmib.rmib2.slug }}
        </button>
        <button
          v-if="siswaDatas.customer_rmib.rmib3"
          class="bg-[#3030f8] text-white px-3 py-2 rounded-lg"
        >
          {{ siswaDatas.customer_rmib.rmib3.name }}
          {{ siswaDatas.customer_rmib.rmib3.slug }}
        </button>
      </div>
    </div>

    <h2 class="font-semibold mb-2">Detail Hasil</h2>
    <div class="flex flex-wrap w-full lg:w-[107%] mx-0 gap-6 px-6">
      <div
        class="px-5 py-4 bg-white rounded-2xl border border-[#667084] mb-5 w-full lg:w-[30%]"
      >
        <div class="flex items-center mb-3">
          <div class="w-12 h-12 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/Grade(1).svg"
              alt="Outdoor Icon"
              class="w-10 h-10"
            />
          </div>
          <h2 class="text-[#3030f8] text-xl font-medium font-roboto font-bold">
            {{ siswaDatas.customer_rmib.rmib1?.name }} ({{
              siswaDatas.customer_rmib.rmib1?.slug
            }})
          </h2>
        </div>
        <hr class="border-t border-[#667084] mb-3" />
        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/ReadCvLogo.svg"
              alt="Interpretation Icon"
              class="w-6 h-6"
            />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Interpretasi</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm mb-3 text-justify">
          {{ siswaDatas.customer_rmib.rmib1?.desc }}
        </p>

        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/IdentificationBadge.svg"
              alt="Job Recommendation Icon"
              class="w-6 h-6"
            />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Contoh Pekerjaan</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm mb-3 text-justify">
          {{ siswaDatas.customer_rmib.rmib1?.job_recommendation }}
        </p>

        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img src="@/assets/img/rmib/Mailbox.svg" alt="Advice Icon" class="w-6 h-6" />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Saran</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm text-justify">
          {{ siswaDatas.customer_rmib.rmib1?.advice }}
        </p>
      </div>

      <div
        class="px-5 py-4 bg-white rounded-2xl border border-[#667084] mb-5 w-full lg:w-[30%]"
      >
        <div class="flex items-center mb-3">
          <div class="w-12 h-12 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/Grade (2).svg"
              alt="Outdoor Icon"
              class="w-10 h-10"
            />
          </div>
          <h2 class="text-[#3030f8] text-xl font-medium font-roboto font-bold">
            {{ siswaDatas.customer_rmib.rmib2?.name }} ({{
              siswaDatas.customer_rmib.rmib2?.slug
            }})
          </h2>
        </div>
        <hr class="border-t border-[#667084] mb-3" />
        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/ReadCvLogo.svg"
              alt="Interpretation Icon"
              class="w-6 h-6"
            />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Interpretasi</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm mb-3 text-justify">
          {{ siswaDatas.customer_rmib.rmib2?.desc }}
        </p>

        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/IdentificationBadge.svg"
              alt="Job Recommendation Icon"
              class="w-6 h-6"
            />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Contoh Pekerjaan</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm mb-3 text-justify">
          {{ siswaDatas.customer_rmib.rmib2?.job_recommendation }}
        </p>

        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img src="@/assets/img/rmib/Mailbox.svg" alt="Advice Icon" class="w-6 h-6" />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Saran</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm text-justify">
          {{ siswaDatas.customer_rmib.rmib2?.advice }}
        </p>
      </div>

      <div
        class="px-5 py-4 bg-white rounded-2xl border border-[#667084] mb-5 w-full lg:w-[30%]"
      >
        <div class="flex items-center mb-3">
          <div class="w-12 h-12 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/Grade (3).svg"
              alt="Outdoor Icon"
              class="w-10 h-10"
            />
          </div>
          <h2 class="text-[#3030f8] text-xl font-medium font-roboto font-bold">
            {{ siswaDatas.customer_rmib.rmib3?.name }} ({{
              siswaDatas.customer_rmib.rmib3?.slug
            }})
          </h2>
        </div>
        <hr class="border-t border-[#667084] mb-3" />
        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/ReadCvLogo.svg"
              alt="Interpretation Icon"
              class="w-6 h-6"
            />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Interpretasi</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm mb-3 text-justify">
          {{ siswaDatas.customer_rmib.rmib3?.desc }}
        </p>

        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img
              src="@/assets/img/rmib/IdentificationBadge.svg"
              alt="Job Recommendation Icon"
              class="w-6 h-6"
            />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Contoh Pekerjaan</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm mb-3 text-justify">
          {{ siswaDatas.customer_rmib.rmib3?.job_recommendation }}
        </p>

        <div class="flex items-start mb-3">
          <div class="w-6 h-6 flex justify-center items-center mr-3">
            <img src="@/assets/img/rmib/Mailbox.svg" alt="Advice Icon" class="w-6 h-6" />
          </div>
          <div class="text-[#3030f8] text-sm font-medium">
            <strong>Saran</strong>
          </div>
        </div>
        <p class="text-[#667084] text-sm text-justify">
          {{ siswaDatas.customer_rmib.rmib3?.advice }}
        </p>
      </div>
    </div>
  </div>

  <NotFound v-else/>
</template>

<script setup>
import NotFound from "./NotFound.vue";
const props = defineProps(["siswaDatas"]);

console.log(`props`, props.siswaDatas);
</script>
