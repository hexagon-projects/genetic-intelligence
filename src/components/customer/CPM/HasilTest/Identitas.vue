<template>
    <div class="h-52 flex-col justify-start items-start inline-flex">
        <div class="px-9 py-4 bg-gradient-to-b from-[#aa67ff] to-[#5959f9] rounded-tl-3xl rounded-tr-3xl border border-black flex-col justify-start items-center gap-3 flex">
            <div class="w-[302px] text-white text-xl font-medium font-roboto leading-7">Identitas</div>
        </div>
        <div class="px-9 py-6 rounded-bl-3xl rounded-br-3xl border-l border-r border-b border-black flex-col justify-start items-center gap-3 flex">
            <div class="flex flex-col gap-2 w-[302px] text-[#667084] text-sm font-normal font-roboto leading-tight">
                <!-- Nama -->
                <div class="flex items-center gap-2">
                    <span>Nama: </span>
                    <span v-if="!loading">{{ props.userInfo.nama }}</span>
                    <div v-else class="skeleton w-[120px] h-[16px] bg-gray-300 rounded-md"></div>
                </div>
                
                <!-- Jenis Kelamin -->
                <div class="flex items-center gap-2">
                    <span>Jenis Kelamin: </span>
                    <span v-if="!loading">{{ props.userInfo.jenis_kelamin }}</span>
                    <div v-else class="skeleton w-[90px] h-[16px] bg-gray-300 rounded-md"></div>
                </div>
                
                <!-- Tanggal Lahir -->
                <div class="flex items-center gap-2">
                    <span>Tanggal Lahir: </span>
                    <span v-if="!loading">{{ props.userInfo.tanggal_lahir }}</span>
                    <div v-else class="skeleton w-[110px] h-[16px] bg-gray-300 rounded-md"></div>
                </div>
                
                <!-- Tanggal tes -->
                <div class="flex items-center gap-2">
                    <span>Tanggal tes: </span>
                    <span v-if="!loading">{{ props.userInfo.tanggal_tes }}</span>
                    <div v-else class="skeleton w-[100px] h-[16px] bg-gray-300 rounded-md"></div>
                </div>
                
                <!-- Usia -->
                <div class="flex items-center gap-2">
                    <span>Usia: </span>
                    <span v-if="!loading">{{ props.userInfo.usia }}</span>
                    <div v-else class="skeleton w-[130px] h-[16px] bg-gray-300 rounded-md"></div>
                </div>

                <!-- Durasi Test -->
                <div class="flex items-center gap-2">
                    <span>Durasi Test: </span>
                    <span v-if="!loading">{{ props.userInfo.durasi_tes }}</span>
                    <div v-else class="skeleton w-[130px] h-[16px] bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const loading = ref(null)

const props = defineProps({
    userInfo: Object,
    cpmInfo: Object,
    isLoading: Boolean
})

watch(() => props.isLoading, (newValue) => {
    loading.value = newValue
})
</script>

<style scoped>
.skeleton {
  background: linear-gradient(100deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>