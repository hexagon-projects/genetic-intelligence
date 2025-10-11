<template>
  <div v-if="props.siswaKarirData !== null" class="w-full px-4 pt-5 pb-3 flex flex-col gap-[16px]">
    <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
      Hasil Tes Jatidiri Karir
    </div>

    <div class="flex flex-col">
      <h1 class="text-[#111416] text-base font-semibold font-sora leading-normal">
        Karir
      </h1>
      <span class="text-[#111416] text-base font-normal font-roboto leading-normal">
        {{ props.siswaKarirData.karier.name }}
      </span>
    </div>

    <!-- <div class="w-full max-w-[200px] h-[150px] mx-auto">
      <img src="@/assets/icons/karir-hasil.webp" alt="Ilustrasi Karir" class="w-full h-full object-contain">
    </div> -->

    <div class="mt-[9px] mb-4 flex flex-col gap-[12px]">
      <h1 class="text-[#111416] text-lg font-bold font-['Roboto']">
        Deskripsi
      </h1>
      <span class="text-[#111416] text-base font-normal font-['Roboto'] leading-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-2" 
            v-html="extractMainDescription(props.siswaKarirData.karier.description)">
      </span>
    </div>

    <div class="flex flex-col gap-[16px]">
      <div class="flex items-center justify-between cursor-pointer" @click="toggleDropdown('recommendation')">
        <h1 class="text-[#111416] text-base font-semibold font-sora leading-normal">Rekomendasi Karir</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
             :class="{ 'rotate-180': activeDropdown === 'recommendation' }"
             class="transition-transform duration-300">
          <path d="M4 6L8 10L12 6" stroke="#4B5563" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
      </div>

      <div class="transition-all duration-300 overflow-hidden"
           :class="activeDropdown === 'recommendation' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
        <span class="text-[#111416] text-base font-normal font-['Roboto'] leading-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2" 
              v-html="extractCareerSuggestions(props.siswaKarirData.karier.description)">
        </span>
      </div>
    </div>

    <div class="flex flex-col mb-4">
      <h1 class="text-[#111416] text-base font-semibold font-sora leading-normal">
        Tanggal Tes
      </h1>
      <span class="text-[#111416] text-base font-normal font-roboto leading-normal">
        {{ formatDate(props.siswaKarirData.created_at) }}
      </span>
    </div>

  </div>

  <NotFound v-else/>
</template>

<script setup>
import { ref } from 'vue';
import NotFound from "./NotFound.vue";

const props = defineProps(["siswaKarirData"]);
console.log(props.siswaKarirData)
const activeDropdown = ref(null);

const toggleDropdown = (type) => {
  activeDropdown.value = activeDropdown.value === type ? null : type;
};

const extractMainDescription = (html) => {
  if (!html) return 'Data tidak tersedia';
  const saranIndex = html.indexOf('Saran Jalur Karier:');
  if (saranIndex !== -1) {
    return html.substring(0, saranIndex);
  }
  return html;
};

const extractCareerSuggestions = (html) => {
  if (!html) return 'Data tidak tersedia';
  
  const saranIndex = html.indexOf('Saran Jalur Karier:');
  if (saranIndex !== -1) {
    const startIndex = saranIndex + 'Saran Jalur Karier:'.length;
    return html.substring(startIndex).trim();
  }
  
  return 'Data tidak tersedia';
};

const formatArrayData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    return data.join(', ');
  } catch (error) {
    return jsonString;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}
</style>