<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('anak');
const emit = defineEmits(['tabChange']);

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  emit('tabChange', tab);
};
</script>

<template>
  <div class="flex flex-wrap items-center border-b border-gray-200">
    <div 
      class="px-4 md:px-8 py-2 group rounded-t-xl transition-all duration-500 cursor-pointer"
      :class="activeTab === 'anak' ? 'bg-gray-100 font-medium border-b-2 border-primary' : 'hover:bg-gray-100 hover:font-medium'"
      @click="setActiveTab('anak')"
    >
      Data Anak
    </div>
    <div 
      class="px-4 md:px-8 py-2 group rounded-t-xl transition-all duration-500 cursor-pointer"
      :class="activeTab === 'orangtua' ? 'bg-gray-100 font-medium border-b-2 border-primary' : 'hover:bg-gray-100 hover:font-medium'"
      @click="setActiveTab('orangtua')"
    >
      Data Orang Tua
    </div>
    <div 
      class="px-4 md:px-8 py-2 group rounded-t-xl transition-all duration-500 cursor-pointer"
      :class="activeTab === 'saudara' ? 'bg-gray-100 font-medium border-b-2 border-primary' : 'hover:bg-gray-100 hover:font-medium'"
      @click="setActiveTab('saudara')"
    >
      Data Saudara
    </div>
  </div>
</template>