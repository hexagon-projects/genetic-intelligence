<template>
  <div v-if="props.siswaDatas.customer_stres !== null" class="w-full px-4 pb-3 flex flex-col gap-[16px]">
    <div class="text-[#0c141c] text-xl font-bold font-['Roboto'] leading-7">
      Hasil Tes Jatidiri Kendali Stres
    </div>
    <div class="mt-4 mb-5">
      <div class="p-5 bg-[#3030f8] text-white rounded-lg flex flex-col gap-3">
          <p class="font-semibold text-2xl">{{ siswaDatas.customer_stres.stres.name }}</p>
          <div class="[&_a]:text-blue-600 [&_a]:underline [&_a]:font-medium [&_a:hover]:text-blue-800
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4
        [&_li]:my-2" v-html="siswaDatas.customer_stres.stres.description"></div>
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