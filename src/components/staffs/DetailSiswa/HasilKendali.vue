<template>
  <div v-if="props.siswaDatas.customer_iaa !== null" class="w-full px-4 pb-3 flex flex-col gap-[16px]">
    <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
      Hasil Tes Jatidiri Kendali (Internet Addiction Assessment)
    </div>
    <div class="mt-4 mb-5">
        <div class="p-5 bg-[#3030f8] text-white rounded-lg flex flex-col gap-3">
            <h2 class="font-semibold mb-2">Kategori</h2>
            <p>{{ siswaDatas.customer_iaa.iaa.desc }}</p>
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
